import React, { useState } from 'react';
import type { PageId } from '../../types';
import { ShieldIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../Icons';

interface ProfilePageProps {
  onNavigate: (page: PageId) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('Rayhan Pratama');
  const [role, setRole] = useState('Lead Innovation Researcher');
  const [institution, setInstitution] = useState('Pusat Riset Teknologi GTNIC');
  const [email, setEmail] = useState('rayhan.pratama@gtnic-tech.id');

  // Toggle states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkModeSim, setDarkModeSim] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Toast Saved Message */}
      {savedSuccess && (
        <div className="toast-notification success">
          <div className="toast-icon">✓</div>
          <div className="toast-text">Perubahan profil dan pengaturan sistem berhasil disimpan!</div>
          <button className="toast-close" onClick={() => setSavedSuccess(false)}>×</button>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div className="badge-pill">
            <span className="badge-sparkle">👤</span>
            <span>Mockup Halaman 4 dari 4 — Profil & Pengaturan</span>
          </div>
          <h1 className="page-main-title">Manajemen Akun & Konfigurasi</h1>
          <p className="page-subtitle">Kelola identitas peneliti, preferensi sistem, dan parameter keamanan akun Anda</p>
        </div>

        <div className="account-verified-chip">
          <ShieldIcon size={16} />
          <span>Akun Terverifikasi GTNIC</span>
        </div>
      </div>

      <div className="profile-layout-grid">
        {/* Left Column: User Summary Card */}
        <div className="profile-sidebar-card">
          <div className="avatar-large-wrapper">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80"
              alt="Profile"
              className="avatar-large-img"
            />
            <span className="avatar-status-badge">Aktif</span>
          </div>

          <h2 className="profile-user-name">{name}</h2>
          <div className="profile-user-role">{role}</div>
          <div className="profile-user-org">{institution}</div>

          <div className="profile-stats-divider" />

          <div className="profile-mini-stats">
            <div className="mini-stat-item">
              <span className="mini-stat-num">14</span>
              <span className="mini-stat-label">Proyek Aktif</span>
            </div>
            <div className="mini-stat-item">
              <span className="mini-stat-num">99.8%</span>
              <span className="mini-stat-label">Keandalan</span>
            </div>
            <div className="mini-stat-item">
              <span className="mini-stat-num">1.2K</span>
              <span className="mini-stat-label">Kontribusi</span>
            </div>
          </div>

          <div className="profile-stats-divider" />

          <div className="profile-action-links">
            <div className="profile-info-row">
              <span className="label">ID Delegasi:</span>
              <span className="val-mono">GTNIC-2026-X89</span>
            </div>
            <div className="profile-info-row">
              <span className="label">Tingkat Akses:</span>
              <span className="val-chip green">Super Architect</span>
            </div>
            <div className="profile-info-row">
              <span className="label">Zona Waktu:</span>
              <span className="val">WIB (UTC+7)</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => onNavigate('home')}
          >
            ← Kembali ke Beranda
          </button>
        </div>

        {/* Right Column: Settings Form & Toggles */}
        <div className="profile-main-card">
          <form onSubmit={handleSave}>
            <div className="form-section-title">
              <h3 className="section-title">Informasi Pribadi</h3>
              <p className="section-subtitle">Data ini digunakan untuk sertifikasi proyek dan identitas tim GTNIC</p>
            </div>

            <div className="form-two-cols">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Jabatan / Peran Tim</label>
                <input
                  type="text"
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Afiliasi Institusi / Universitas</label>
                <input
                  type="text"
                  className="form-input"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Email Resmi</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-divider" />

            <div className="form-section-title">
              <h3 className="section-title">Preferensi & Keamanan Sistem</h3>
              <p className="section-subtitle">Atur interaksi telemetri, privasi, dan alur notifikasi otomatis</p>
            </div>

            <div className="toggle-list">
              <div className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Notifikasi Insiden & Peringatan Otomatis</span>
                  <span className="toggle-desc">Kirim email instan saat terjadi spike latensi atau anomali jaringan.</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                  />
                  <span className="slider round" />
                </label>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Sinkronisasi Telemetri Cloud 24/7</span>
                  <span className="toggle-desc">Hubungkan data sensor lokal secara real-time dengan server cloud GTNIC.</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                  />
                  <span className="slider round" />
                </label>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Autentikasi Dua Faktor (2FA Token)</span>
                  <span className="toggle-desc">Wajibkan konfirmasi kode OTP setiap kali masuk ke dashboard monitoring.</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                  />
                  <span className="slider round" />
                </label>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Mode Tampilan Kontras Tinggi (Aksen Neon)</span>
                  <span className="toggle-desc">Optimalisasi visualisasi data untuk ruang kendali (Command Center).</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkModeSim}
                    onChange={(e) => setDarkModeSim(e.target.checked)}
                  />
                  <span className="slider round" />
                </label>
              </div>
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn btn-primary">
                <CheckIcon size={18} />
                <span>Simpan Perubahan Pengaturan</span>
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => onNavigate('home')}
              >
                Selesai & Ke Beranda
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Next/Prev Navigation Footer Bar */}
      <div className="page-nav-footer">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onNavigate('features')}
        >
          <ArrowLeftIcon size={18} />
          <span>Kembali ke Halaman 3 (Katalog Inovasi)</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('home')}
        >
          <span>Kembali ke Halaman 1 (Beranda)</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
};
