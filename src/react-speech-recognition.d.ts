declare module 'react-speech-recognition' {
  export interface Command {
    command: string | string[] | RegExp;
    callback: (...args: any[]) => void;
    matchInterim?: boolean;
    isFuzzyMatch?: boolean;
    fuzzyMatchingThreshold?: number;
    bestMatchOnly?: boolean;
  }

  export interface SpeechRecognitionOptions {
    commands?: Command[];
    transcribing?: boolean;
    clearTranscriptOnListen?: boolean;
  }

  export interface SpeechRecognitionResult {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  }

  export interface ListeningOptions {
    continuous?: boolean;
    language?: string;
    interimResults?: boolean;
  }

  export interface SpeechRecognitionStatic {
    startListening: (options?: ListeningOptions) => Promise<void>;
    stopListening: () => Promise<void>;
    abortListening: () => Promise<void>;
    browserSupportsSpeechRecognition: () => boolean;
    applyPolyfill: (polyfill: any) => void;
    getRecognition: () => any;
  }

  export function useSpeechRecognition(
    options?: SpeechRecognitionOptions
  ): SpeechRecognitionResult;

  const SpeechRecognition: SpeechRecognitionStatic;
  export default SpeechRecognition;
}
