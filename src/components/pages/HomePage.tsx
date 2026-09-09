import React from 'react';
import type { PageId } from '../../types';
import { ArrowRightIcon, ZapIcon, AwardIcon, ShieldIcon, UsersIcon, TrendingUpIcon } from '../Icons';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="page-wrapper fade-in">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="badge-pill">
            <span className="badge-sparkle">✨</span>
            <span>Mockup Halaman 1 dari 4 — Beranda Utama</span>
          </div>
          <h1 className="hero-heading">
            Akselerasi Masa Depan dengan <span className="gradient-text">Ekosistem GTNIC</span>
          </h1>
          <p className="hero-description">
            Selamat datang di mockup portal terpadu GTNIC 2026. Platform cerdas yang menghubungkan
            analitik komprehensif, katalog solusi inovasi, serta manajemen sistem terintegrasi dalam satu antarmuka modern.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate('dashboard')}
            >
              <span>Buka Dashboard Analitik</span>
              <ArrowRightIcon size={18} />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onNavigate('features')}
            >
              <span>Katalog Inovasi</span>
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onNavigate('profile')}
            >
              <span>Pengaturan Akun</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Card Mockup Preview */}
        <div className="hero-card-preview">
          <div className="floating-stat-card card-top">
            <div className="stat-icon-circle green">
              <TrendingUpIcon size={20} />
            </div>
            <div>
              <div className="stat-sm-title">Pertumbuhan Data</div>
              <div className="stat-sm-val">+34.8% Kuartal Ini</div>
            </div>
          </div>

          <div className="floating-main-card">
            <div className="main-card-header">
              <span className="status-indicator-dot online" />
              <span className="main-card-title">GTNIC Live Telemetry</span>
              <span className="chip-tag">Aktif</span>
            </div>
            <div className="main-card-chart-mock">
              <div className="bar-col" style={{ height: '45%' }}><span>Sen</span></div>
              <div className="bar-col" style={{ height: '70%' }}><span>Sel</span></div>
              <div className="bar-col" style={{ height: '60%' }}><span>Rab</span></div>
              <div className="bar-col highlight" style={{ height: '90%' }}><span>Kam</span></div>
              <div className="bar-col" style={{ height: '75%' }}><span>Jum</span></div>
              <div className="bar-col" style={{ height: '85%' }}><span>Sab</span></div>
              <div className="bar-col" style={{ height: '95%' }}><span>Min</span></div>
            </div>
            <div className="main-card-footer">
              <div>
                <small>Throughput Rata-rata</small>
                <strong>4.82 Gbps / sec</strong>
              </div>
              <button
                type="button"
                className="btn-text-action"
                onClick={() => onNavigate('dashboard')}
              >
                Detail →
              </button>
            </div>
          </div>

          <div className="floating-stat-card card-bottom">
            <div className="stat-icon-circle purple">
              <ZapIcon size={20} />
            </div>
            <div>
              <div className="stat-sm-title">Efisiensi Cloud</div>
              <div className="stat-sm-val">99.98% Stabil</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metric Stats Grid */}
      <section className="section-block">
        <div className="section-header">
          <h2 className="section-title">Ringkasan Capaian Platform</h2>
          <p className="section-subtitle">Data performa utama ekosistem digital sepanjang tahun 2026</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box blue">
              <UsersIcon size={22} />
            </div>
            <div className="metric-body">
              <div className="metric-label">Peserta & Pengguna Aktif</div>
              <div className="metric-number">48.950+</div>
              <div className="metric-trend positive">↑ +18.4% dari bulan lalu</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box purple">
              <ZapIcon size={22} />
            </div>
            <div className="metric-body">
              <div className="metric-label">Proyek & Modul Inovasi</div>
              <div className="metric-number">142 Solusi</div>
              <div className="metric-trend positive">↑ 24 modul baru</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box green">
              <ShieldIcon size={22} />
            </div>
            <div className="metric-body">
              <div className="metric-label">Tingkat Keandalan Sistem</div>
              <div className="metric-number">99.98%</div>
              <div className="metric-trend positive">Zero incident recorded</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box amber">
              <AwardIcon size={22} />
            </div>
            <div className="metric-body">
              <div className="metric-label">Indeks Kepuasan Pengguna</div>
              <div className="metric-number">4.92 / 5.0</div>
              <div className="metric-trend positive">Berdasarkan 3.2K review</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pages Quick Navigation Cards */}
      <section className="section-block">
        <div className="section-header">
          <h2 className="section-title">Eksplorasi 4 Halaman Mockup</h2>
          <p className="section-subtitle">Gunakan tombol di atas atau kartu di bawah ini untuk berpindah halaman</p>
        </div>

        <div className="pages-showcase-grid">
          <div className="page-showcase-card current">
            <div className="page-card-num">Page 01</div>
            <div className="page-card-icon">🏠</div>
            <h3 className="page-card-title">Beranda Utama</h3>
            <p className="page-card-desc">Tampilan hero, ikhtisar capaian, dan pengantar umum ekosistem teknologi.</p>
            <span className="page-status-badge current">Sedang Dibuka</span>
          </div>

          <div className="page-showcase-card" onClick={() => onNavigate('dashboard')} role="button" tabIndex={0}>
            <div className="page-card-num">Page 02</div>
            <div className="page-card-icon">📊</div>
            <h3 className="page-card-title">Dashboard Analitik</h3>
            <p className="page-card-desc">Visualisasi metrik KPI, grafik performa SVG, dan feed aktivitas real-time.</p>
            <button type="button" className="page-link-btn">Buka Halaman →</button>
          </div>

          <div className="page-showcase-card" onClick={() => onNavigate('features')} role="button" tabIndex={0}>
            <div className="page-card-num">Page 03</div>
            <div className="page-card-icon">🚀</div>
            <h3 className="page-card-title">Katalog Inovasi</h3>
            <p className="page-card-desc">Daftar produk inovasi dengan sistem filter kategori dan status pengujian.</p>
            <button type="button" className="page-link-btn">Buka Halaman →</button>
          </div>

          <div className="page-showcase-card" onClick={() => onNavigate('profile')} role="button" tabIndex={0}>
            <div className="page-card-num">Page 04</div>
            <div className="page-card-icon">👤</div>
            <h3 className="page-card-title">Profil & Pengaturan</h3>
            <p className="page-card-desc">Konfigurasi akun, preferensi notifikasi, dan pengaturan keamanan.</p>
            <button type="button" className="page-link-btn">Buka Halaman →</button>
          </div>
        </div>
      </section>
    </div>
  );
};
