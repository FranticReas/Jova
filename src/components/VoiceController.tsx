import React, { useEffect, useState, useRef, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import type { PageId } from '../types';

interface VoiceControllerProps {
  onNavigate: (page: PageId) => void;
}

// Global AudioContext singleton to preserve audio unlock across user gestures
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!sharedAudioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        sharedAudioCtx = new AudioCtxClass();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export const VoiceController: React.FC<VoiceControllerProps> = ({ onNavigate }) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isAwake, setIsAwake] = useState<boolean>(false);
  const [autoRestart, setAutoRestart] = useState<boolean>(true);
  const [lastDetectedText, setLastDetectedText] = useState<string>('');
  const awakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSpeakingRef = useRef<boolean>(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Play pleasant, unmistakable multi-tone chime (Ding-Dong)
  const playWakeChime = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // High bright notification chime: E5 (659Hz) -> A5 (880Hz) -> C#6 (1108Hz)
      const notes = [
        { freq: 659.25, start: 0, dur: 0.12 },
        { freq: 880.00, start: 0.1, dur: 0.14 },
        { freq: 1108.73, start: 0.22, dur: 0.28 },
      ];

      notes.forEach(({ freq, start, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + start);

        gain.gain.setValueAtTime(0.25, now + start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + start);
        osc.stop(now + start + dur);
      });
    } catch {
      // ignore
    }
  }, []);

  // Text-to-Speech vocal feedback in Indonesian (suppressing mic while speaking to prevent loop)
  const speakVoice = useCallback((text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();
        isSpeakingRef.current = true;

        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'id-ID';
          utterance.rate = 1.05;
          utterance.pitch = 1.15;
          utterance.volume = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const idVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
          if (idVoice) {
            utterance.voice = idVoice;
          }

          utterance.onend = () => {
            // Buffer delay after speech finishes to prevent any microphone echo
            setTimeout(() => {
              isSpeakingRef.current = false;
              resetTranscript();
            }, 450);
          };

          utterance.onerror = () => {
            isSpeakingRef.current = false;
          };

          window.speechSynthesis.speak(utterance);
        }, 60);
      }
    } catch {
      isSpeakingRef.current = false;
    }
  }, [resetTranscript]);

  // Execute navigation with voice feedback
  const executeNavigation = useCallback((page: PageId, label: string) => {
    if (awakeTimeoutRef.current) {
      clearTimeout(awakeTimeoutRef.current);
      awakeTimeoutRef.current = null;
    }

    onNavigate(page);
    setIsAwake(false);
    setFeedback(`Jova: Membuka Halaman ${label}`);
    speakVoice(`Baik, membuka ${label}`);
    resetTranscript();

    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  }, [onNavigate, resetTranscript, speakVoice]);

  // Activate Jova with sound chime ONLY (no spoken "Jova" to prevent acoustic echo loop)
  const wakeUpJova = useCallback(() => {
    setIsAwake(true);
    playWakeChime(); // Crisp pleasant chime sound only, preventing acoustic echo loop!
    setFeedback('⚡ Jova Aktif! Katakan: Beranda, Dashboard, Inovasi, atau Profil');
    resetTranscript();

    if (awakeTimeoutRef.current) {
      clearTimeout(awakeTimeoutRef.current);
    }
    // Stay awake for 10 seconds waiting for command
    awakeTimeoutRef.current = setTimeout(() => {
      setIsAwake(false);
      setFeedback('Jova kembali ke mode siaga.');
      setTimeout(() => setFeedback(null), 2500);
    }, 10000);
  }, [playWakeChime, resetTranscript]);

  // Comprehensive wake word detector handling Google Speech API Indonesian variations
  const matchesWakeWord = (text: string): boolean => {
    const lower = text.toLowerCase();
    // In Indonesian Web Speech API, "Jova" can transcribe as jova, coba, djova, jofa, nova, jovan, yova, etc.
    const wakePatterns = [
      'jova',
      'djova',
      'yova',
      'zova',
      'jofa',
      'joba',
      'jovan',
      'coba', // Very common Indonesian acoustic match for "jova"
      'nova',
      'chova',
      'sofa',
      'dova',
      'johan',
      'juve',
      'jov',
      'jawa',
    ];

    return wakePatterns.some((pattern) => lower.includes(pattern));
  };

  // Continuous speech parser (ignoring input while speaking to prevent echo loop)
  useEffect(() => {
    if (!transcript || isSpeakingRef.current) return;
    const text = transcript.toLowerCase().trim();
    setLastDetectedText(transcript);

    const hasWakeWord = matchesWakeWord(text);

    // Command targets
    const isHome = text.includes('beranda') || text.includes('home') || text.includes('depan');
    const isDashboard = text.includes('dashboard') || text.includes('dasbor') || text.includes('analitik');
    const isFeatures = text.includes('inovasi') || text.includes('fitur') || text.includes('layanan') || text.includes('produk');
    const isProfile = text.includes('profil') || text.includes('profile') || text.includes('pengaturan') || text.includes('akun');

    // 1. One-shot command (e.g. "Jova buka dashboard" or "Jova beranda")
    if (hasWakeWord) {
      if (isHome) {
        executeNavigation('home', 'Beranda');
        return;
      }
      if (isDashboard) {
        executeNavigation('dashboard', 'Dashboard');
        return;
      }
      if (isFeatures) {
        executeNavigation('features', 'Inovasi');
        return;
      }
      if (isProfile) {
        executeNavigation('profile', 'Profil & Pengaturan');
        return;
      }

      // 2. Wake word alone: user called "Jova", "Halo Jova", "Hai Jova", etc.
      wakeUpJova();
      return;
    }

    // 3. If Jova was already awakened, execute on navigation command
    if (isAwake) {
      if (isHome) {
        executeNavigation('home', 'Beranda');
      } else if (isDashboard) {
        executeNavigation('dashboard', 'Dashboard');
      } else if (isFeatures) {
        executeNavigation('features', 'Inovasi');
      } else if (isProfile) {
        executeNavigation('profile', 'Profil & Pengaturan');
      }
    }
  }, [transcript, isAwake, executeNavigation, wakeUpJova]);

  // Pre-unlock audio on user gesture or interaction
  const unlockAudio = useCallback(() => {
    getAudioContext();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }, []);

  // Auto-start Mode Siaga immediately upon loading without needing a click
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    const startListeningAutomatically = () => {
      setAutoRestart(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: 'id-ID',
      }).catch((e) => {
        console.warn('Auto speech listen notice:', e);
      });
    };

    // Attempt microphone access and immediate start
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          startListeningAutomatically();
        })
        .catch(() => {
          startListeningAutomatically();
        });
    } else {
      startListeningAutomatically();
    }

    // Pre-unlock AudioContext on ANY first interaction anywhere on page
    const handleFirstInteraction = () => {
      unlockAudio();
      if (!listening) {
        startListeningAutomatically();
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [browserSupportsSpeechRecognition, listening, unlockAudio]);

  // Keep-alive loop when standby mode is enabled
  useEffect(() => {
    if (autoRestart && !listening) {
      const timer = setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'id-ID',
        }).catch(() => {
          // ignore restart errors
        });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [autoRestart, listening]);

  // Toggle Standby Mode manually if user wants to turn it off
  const toggleListening = () => {
    unlockAudio();

    if (!browserSupportsSpeechRecognition) {
      alert('Browser Anda belum mendukung Web Speech API. Disarankan menggunakan Google Chrome atau Microsoft Edge untuk fitur suara ini.');
      return;
    }

    if (listening) {
      setAutoRestart(false);
      setIsAwake(false);
      SpeechRecognition.stopListening();
      if (awakeTimeoutRef.current) {
        clearTimeout(awakeTimeoutRef.current);
      }
    } else {
      resetTranscript();
      setAutoRestart(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: 'id-ID',
      });
    }
  };

  // Quick test button to test Jova wake & audio response directly
  const handleManualTestWake = () => {
    unlockAudio();
    if (!listening) {
      resetTranscript();
      setAutoRestart(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: 'id-ID',
      });
    }
    wakeUpJova();
  };

  return (
    <aside className="voice-controller-wrapper" aria-label="Kontrol Navigasi Suara Jova">
      {/* Toast Feedback */}
      {feedback && (
        <div className={`voice-feedback-toast ${isAwake ? 'awake' : ''}`}>
          <span className="feedback-sparkle">{isAwake ? '⚡' : '🎙️'}</span>
          <span className="feedback-text">{feedback}</span>
        </div>
      )}

      {/* Floating Jova Assistant Pill */}
      <div className={`voice-dock-pill ${listening ? (isAwake ? 'is-awake' : 'is-listening') : ''}`}>
        <button
          type="button"
          className={`mic-toggle-btn ${listening ? (isAwake ? 'awake-pulse' : 'active pulse') : ''}`}
          onClick={toggleListening}
          title={listening ? 'Klik untuk mematikan mode siaga Jova' : 'Klik untuk mengaktifkan mikrofon (Panggil "Jova")'}
          aria-label="Toggle Asisten Jova"
        >
          <span className="mic-icon">{listening ? (isAwake ? '⚡' : '👂') : '🎙️'}</span>
        </button>

        <div className="voice-text-info" onClick={toggleListening} role="button" tabIndex={0}>
          {listening ? (
            isAwake ? (
              <div className="voice-status-awake">
                <span className="voice-waves awake-waves">
                  <span className="wave-bar awake-bar bar1" />
                  <span className="wave-bar awake-bar bar2" />
                  <span className="wave-bar awake-bar bar3" />
                </span>
                <div className="awake-text-box">
                  <span className="awake-title">⚡ Jova Mendengarkan!</span>
                  <span className="awake-sub">
                    {transcript ? `Terdengar: "${transcript}"` : 'Sebutkan: Beranda / Dashboard / Inovasi / Profil'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="voice-status-active">
                <span className="voice-waves">
                  <span className="wave-bar bar1" />
                  <span className="wave-bar bar2" />
                  <span className="wave-bar bar3" />
                </span>
                <div className="standby-text-box">
                  <span className="standby-title">⚡ Mode Siaga Aktif (Otomatis)</span>
                  <span className="standby-sub">
                    {transcript ? (
                      <>Terdengar: <em className="live-transcript-preview">"{transcript}"</em></>
                    ) : (
                      <>Langsung ucapkan <strong>"Jova"</strong></>
                    )}
                  </span>
                </div>
              </div>
            )
          ) : (
            <div className="voice-status-idle">
              <span className="voice-idle-title">Menghubungkan Jova...</span>
              <span className="voice-idle-sub">Siaga otomatis (klik jika diblokir browser)</span>
            </div>
          )}
        </div>

        {/* Quick Test Wake Button */}
        <button
          type="button"
          className="test-jova-btn"
          onClick={handleManualTestWake}
          title="Uji coba respons suara Jova secara instan"
        >
          Panggil Jova
        </button>

        <button
          type="button"
          className="voice-help-btn"
          onClick={() => setShowTips(!showTips)}
          title="Petunjuk perintah suara Jova"
          aria-label="Petunjuk Jova"
        >
          💡
        </button>
      </div>

      {/* Popover Guide for Voice Commands */}
      {showTips && (
        <div className="voice-tips-card fade-in">
          <div className="voice-tips-header">
            <h4>🤖 Asisten Suara Jova (Panduan Lengkap)</h4>
            <button
              type="button"
              className="tips-close-btn"
              onClick={() => setShowTips(false)}
            >
              ×
            </button>
          </div>

          <p className="voice-tips-desc">
            Klik tombol mikrofon sekali untuk mengaktifkan <strong>Mode Siaga</strong>, lalu:
          </p>

          <div className="voice-flow-box">
            <div className="flow-step">
              <span className="step-num">1</span>
              <span>Panggil <code>"Jova"</code> (atau <em>"Halo Jova"</em>, <em>"Hai Jova"</em>).</span>
            </div>
            <div className="flow-substep">
              🔔 <strong>Respon Suara:</strong> Jova berbunyi nada lonceng <em>chime</em> cerah (siap menerima perintah).
            </div>
            <div className="flow-step">
              <span className="step-num">2</span>
              <span>Ucapkan halaman tujuan Anda:</span>
            </div>
          </div>

          <div className="voice-command-items">
            <div className="voice-command-row" onClick={() => executeNavigation('home', 'Beranda')}>
              <span className="command-badge">"Beranda" / "Home"</span>
              <span className="command-target">→ Ke Halaman 1 (Beranda)</span>
            </div>
            <div className="voice-command-row" onClick={() => executeNavigation('dashboard', 'Dashboard')}>
              <span className="command-badge">"Dashboard"</span>
              <span className="command-target">→ Ke Halaman 2 (Dashboard)</span>
            </div>
            <div className="voice-command-row" onClick={() => executeNavigation('features', 'Inovasi')}>
              <span className="command-badge">"Inovasi" / "Fitur"</span>
              <span className="command-target">→ Ke Halaman 3 (Katalog Inovasi)</span>
            </div>
            <div className="voice-command-row" onClick={() => executeNavigation('profile', 'Profil & Pengaturan')}>
              <span className="command-badge">"Profil" / "Pengaturan"</span>
              <span className="command-target">→ Ke Halaman 4 (Profil & Akun)</span>
            </div>
          </div>

          <div className="voice-debug-monitor">
            <span className="debug-label">Terakhir didengar browser:</span>
            <span className="debug-value">{lastDetectedText ? `"${lastDetectedText}"` : '(belum ada suara terdeteksi)'}</span>
          </div>

          <div className="voice-tip-shortcut">
            💡 <strong>Shortcut Langsung:</strong> Anda juga bisa langsung mengucapkan <code>"Jova buka dashboard"</code> atau <code>"Jova beranda"</code> dalam satu kalimat!
          </div>

          {!browserSupportsSpeechRecognition && (
            <div className="voice-warning">
              ⚠️ Browser saat ini belum mendukung Web Speech API. Disarankan menggunakan Google Chrome atau Microsoft Edge.
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
