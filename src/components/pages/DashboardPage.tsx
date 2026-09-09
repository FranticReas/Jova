import React, { useState } from 'react';
import type { PageId } from '../../types';
import { TrendingUpIcon, ZapIcon, ShieldIcon, UsersIcon, ArrowRightIcon, ArrowLeftIcon } from '../Icons';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [activeTab, setActiveTab] = useState<'traffic' | 'resources'>('traffic');

  const activityLogs = [
    { id: '1', time: '10:42:15', event: 'Inisialisasi Model AI Generatif V3', user: 'Admin Sistem', status: 'Sukses', tag: 'AI Engine' },
    { id: '2', time: '10:38:00', event: 'Sinkronisasi Node IoT Lapangan #04', user: 'Gateway #12', status: 'Sukses', tag: 'IoT Node' },
    { id: '3', time: '10:15:22', event: 'Pemberitahuan Beban Trafik Puncak', user: 'Load Balancer', status: 'Info', tag: 'Infra' },
    { id: '4', time: '09:54:10', event: 'Pembaruan Firmware Sensor Telemetri', user: 'DevOps GTNIC', status: 'Sukses', tag: 'Firmware' },
    { id: '5', time: '09:20:44', event: 'Cadangan Basis Data Terenkripsi', user: 'Automated Cron', status: 'Sukses', tag: 'Database' },
  ];

  return (
    <div className="page-wrapper fade-in">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div className="badge-pill">
            <span className="badge-sparkle">📊</span>
            <span>Mockup Halaman 2 dari 4 — Dashboard Analitik</span>
          </div>
          <h1 className="page-main-title">Monitoring & Telemetri Real-Time</h1>
          <p className="page-subtitle">Pantau kesehatan ekosistem sistem dan tren trafik data secara langsung</p>
        </div>

        {/* Time Filter Controls */}
        <div className="time-filter-controls">
          <button
            type="button"
            className={`filter-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7 Hari
          </button>
          <button
            type="button"
            className={`filter-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30 Hari
          </button>
          <button
            type="button"
            className={`filter-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            3 Bulan
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box blue">
            <TrendingUpIcon size={22} />
          </div>
          <div className="metric-body">
            <div className="metric-label">Total Permintaan API</div>
            <div className="metric-number">2.418.900</div>
            <div className="metric-trend positive">↑ +21.5% {timeRange === '7d' ? 'minggu ini' : 'periode ini'}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box green">
            <ZapIcon size={22} />
          </div>
          <div className="metric-body">
            <div className="metric-label">Latensi Respon Rata-rata</div>
            <div className="metric-number">24.6 ms</div>
            <div className="metric-trend positive">↓ 4.2ms lebih cepat</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box purple">
            <UsersIcon size={22} />
          </div>
          <div className="metric-body">
            <div className="metric-label">Sesi Pengguna Serentak</div>
            <div className="metric-number">3.842 Online</div>
            <div className="metric-trend positive">Kapasitas server 42%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box amber">
            <ShieldIcon size={22} />
          </div>
          <div className="metric-body">
            <div className="metric-label">Tingkat Keberhasilan</div>
            <div className="metric-number">99.97%</div>
            <div className="metric-trend positive">0 paket anomali</div>
          </div>
        </div>
      </div>

      {/* Main Analytics Chart Mockup */}
      <div className="analytics-chart-card">
        <div className="chart-header">
          <div>
            <h3 className="chart-title">Visualisasi Tren Trafik & Beban Sistem</h3>
            <p className="chart-subtitle">Menampilkan perbandingan trafik transmisi data (Gbps) dan beban komputasi (%)</p>
          </div>
          <div className="chart-tab-group">
            <button
              type="button"
              className={`chart-tab ${activeTab === 'traffic' ? 'active' : ''}`}
              onClick={() => setActiveTab('traffic')}
            >
              Trafik Jaringan
            </button>
            <button
              type="button"
              className={`chart-tab ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Beban Komputasi
            </button>
          </div>
        </div>

        {/* Crisp SVG Visual Chart */}
        <div className="svg-chart-container">
          <svg className="svg-chart" viewBox="0 0 800 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradientBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="chartGradientPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" />
            <line x1="0" y1="190" x2="800" y2="190" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="4 4" />

            {/* Primary Area & Line */}
            {activeTab === 'traffic' ? (
              <>
                <path
                  d="M 0,170 C 100,160 160,80 250,95 C 340,110 420,40 520,65 C 620,90 700,30 800,45 L 800,220 L 0,220 Z"
                  fill="url(#chartGradientBlue)"
                />
                <path
                  d="M 0,170 C 100,160 160,80 250,95 C 340,110 420,40 520,65 C 620,90 700,30 800,45"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3.5"
                />
                <circle cx="250" cy="95" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                <circle cx="520" cy="65" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                <circle cx="800" cy="45" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
              </>
            ) : (
              <>
                <path
                  d="M 0,140 C 120,130 200,170 300,110 C 400,50 500,120 600,80 C 700,40 750,70 800,60 L 800,220 L 0,220 Z"
                  fill="url(#chartGradientPurple)"
                />
                <path
                  d="M 0,140 C 120,130 200,170 300,110 C 400,50 500,120 600,80 C 700,40 750,70 800,60"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                />
                <circle cx="300" cy="110" r="5" fill="#a855f7" stroke="#fff" strokeWidth="2" />
                <circle cx="600" cy="80" r="5" fill="#a855f7" stroke="#fff" strokeWidth="2" />
              </>
            )}
          </svg>

          <div className="chart-x-labels">
            <span>Senin</span>
            <span>Selasa</span>
            <span>Rabu</span>
            <span>Kamis</span>
            <span>Jumat</span>
            <span>Sabtu</span>
            <span>Minggu</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="activity-card">
        <div className="activity-header">
          <h3 className="chart-title">Log Aktivitas Sistem Terbaru</h3>
          <span className="live-status-pill">● Realtime Sync</span>
        </div>
        <div className="table-responsive">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Deskripsi Aktivitas</th>
                <th>Inisiator / Aktor</th>
                <th>Modul</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map((log) => (
                <tr key={log.id}>
                  <td className="mono">{log.time}</td>
                  <td className="font-semibold">{log.event}</td>
                  <td>{log.user}</td>
                  <td><span className="chip-tag">{log.tag}</span></td>
                  <td><span className="badge-status-green">✓ {log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next/Prev Navigation Footer Bar */}
      <div className="page-nav-footer">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeftIcon size={18} />
          <span>Kembali ke Halaman 1 (Beranda)</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('features')}
        >
          <span>Lanjut ke Halaman 3 (Katalog Inovasi)</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
};
