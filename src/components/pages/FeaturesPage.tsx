import React, { useState } from 'react';
import type { PageId, InnovationItem } from '../../types';
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from '../Icons';

interface FeaturesPageProps {
  onNavigate: (page: PageId) => void;
}

const initialInnovations: InnovationItem[] = [
  {
    id: '1',
    title: 'GTNIC Vision AI 2.0',
    category: 'AI & Data',
    description: 'Sistem deteksi objek & anomali visual berkecepatan tinggi dengan akurasi 99.4% untuk pengawasan cerdas.',
    status: 'Aktif',
    rating: 4.9,
    users: 1240,
    tags: ['Deep Learning', 'Computer Vision', 'Edge AI'],
  },
  {
    id: '2',
    title: 'Smart Telemetry IoT Node',
    category: 'IoT & Hardware',
    description: 'Modul sensor nirkabel ultra-low power berbasis LoRaWAN & MQTT untuk monitoring lingkungan real-time.',
    status: 'Aktif',
    rating: 4.8,
    users: 890,
    tags: ['LoRaWAN', 'Telemetry', 'Microcontroller'],
  },
  {
    id: '3',
    title: 'Automated Workflow Orchestrator',
    category: 'Smart Automation',
    description: 'Mesin otomatisasi tugas nir-kode (no-code) dengan dukungan webhook, event-driven triggers, dan analitik pipeline.',
    status: 'Pembaruan',
    rating: 4.9,
    users: 2150,
    tags: ['Pipelines', 'Event-Driven', 'DevOps'],
  },
  {
    id: '4',
    title: 'Secure Decentralized Vault',
    category: 'Web Platform',
    description: 'Penyimpanan terdistribusi dengan enkripsi AES-256 dan verifikasi integritas data berbasis cryptographic audit trail.',
    status: 'Aktif',
    rating: 5.0,
    users: 630,
    tags: ['Zero-Knowledge', 'Security', 'Cloud Storage'],
  },
  {
    id: '5',
    title: 'Speech Intelligence Engine',
    category: 'AI & Data',
    description: 'Pemrosesan bahasa alami (NLP) & transkripsi suara dwibahasa secara instan dengan deteksi intonasi emosi.',
    status: 'Pengujian',
    rating: 4.7,
    users: 410,
    tags: ['NLP', 'Speech Recognition', 'Whisper'],
  },
  {
    id: '6',
    title: 'Smart Grid Energy Optimizer',
    category: 'Smart Automation',
    description: 'Algoritma prediktif penyeimbang beban konsumsi energi listrik yang menghemat konsumsi daya operasional hingga 32%.',
    status: 'Aktif',
    rating: 4.8,
    users: 780,
    tags: ['Green Tech', 'Predictive', 'Power Save'],
  },
];

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const categories = ['Semua', 'AI & Data', 'IoT & Hardware', 'Smart Automation', 'Web Platform'];

  const filteredItems = initialInnovations.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAction = (title: string) => {
    setAlertMessage(`Modul "${title}" berhasil diuji coba dalam mode simulasi!`);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3500);
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Toast Alert */}
      {alertMessage && (
        <div className="toast-notification">
          <div className="toast-icon">⚡</div>
          <div className="toast-text">{alertMessage}</div>
          <button className="toast-close" onClick={() => setAlertMessage(null)}>×</button>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div className="badge-pill">
            <span className="badge-sparkle">🚀</span>
            <span>Mockup Halaman 3 dari 4 — Katalog Inovasi</span>
          </div>
          <h1 className="page-main-title">Katalog Solusi & Modul Cerdas</h1>
          <p className="page-subtitle">Daftar teknologi inovatif yang siap diintegrasikan ke dalam ekosistem GTNIC</p>
        </div>

        {/* Quick Stats Pill */}
        <div className="katalog-stat-pill">
          <span className="bold-num">{filteredItems.length}</span>
          <span className="muted-text">Solusi Ditampilkan</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="filter-search-container">
        <div className="search-input-wrapper">
          <SearchIcon size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari inovasi berdasarkan nama, tag, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        <div className="category-pills-list">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Innovation Cards */}
      <div className="features-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="feature-card">
            <div className="feature-card-header">
              <span className="feature-category-badge">{item.category}</span>
              <span className={`feature-status-badge ${item.status === 'Aktif' ? 'active' : item.status === 'Pengujian' ? 'testing' : 'updated'}`}>
                {item.status}
              </span>
            </div>

            <h3 className="feature-card-title">{item.title}</h3>
            <p className="feature-card-desc">{item.description}</p>

            <div className="feature-tags-list">
              {item.tags.map((tag) => (
                <span key={tag} className="tag-item">#{tag}</span>
              ))}
            </div>

            <div className="feature-card-footer">
              <div className="feature-meta">
                <span className="meta-item">⭐ {item.rating}</span>
                <span className="meta-separator">•</span>
                <span className="meta-item">👥 {item.users} pengguna</span>
              </div>
              <button
                type="button"
                className="btn-feature-action"
                onClick={() => handleAction(item.title)}
              >
                Uji Demo ↗
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Tidak ada inovasi yang sesuai</h3>
          <p>Coba kata kunci pencarian lain atau ubah pilihan kategori.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Next/Prev Navigation Footer Bar */}
      <div className="page-nav-footer">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => onNavigate('dashboard')}
        >
          <ArrowLeftIcon size={18} />
          <span>Kembali ke Halaman 2 (Dashboard)</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('profile')}
        >
          <span>Lanjut ke Halaman 4 (Profil & Pengaturan)</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
};
