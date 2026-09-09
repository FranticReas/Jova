import { useState, useEffect } from 'react';
import type { PageId } from './types';
import { Navbar, navItems } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { DashboardPage } from './components/pages/DashboardPage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { VoiceController } from './components/VoiceController';
import { HomeIcon, DashboardIcon, FeaturesIcon, ProfileIcon } from './components/Icons';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Update document title based on active page
    const pageTitles: Record<PageId, string> = {
      home: 'Beranda | GTNIC 2026',
      dashboard: 'Dashboard Analitik | GTNIC 2026',
      features: 'Katalog Inovasi & Layanan | GTNIC 2026',
      profile: 'Profil & Pengaturan | GTNIC 2026',
    };
    document.title = pageTitles[currentPage] || 'GTNIC Mockup Platform';
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'features':
        return <FeaturesPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const getDockIcon = (id: PageId, active: boolean) => {
    const props = { size: 16, className: active ? 'active' : '' };
    switch (id) {
      case 'home':
        return <HomeIcon {...props} />;
      case 'dashboard':
        return <DashboardIcon {...props} />;
      case 'features':
        return <FeaturesIcon {...props} />;
      case 'profile':
        return <ProfileIcon {...props} />;
    }
  };

  return (
    <>
      {/* 1. Header with 4 Navigation Buttons */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* 2. Main Content of Currently Active Page Mockup */}
      <main className="main-wrapper">
        {renderPage()}
      </main>

      {/* 3. Voice Controller (Speech Recognition Navigation) */}
      <VoiceController onNavigate={handleNavigate} />

      {/* 4. Floating Quick Switch Dock (Accessible from anywhere) */}
      <div className="quick-dock-bar" role="navigation" aria-label="Quick Page Switcher">
        <span className="dock-label">Navigasi:</span>
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`dock-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigate(item.id)}
              title={item.label}
            >
              {getDockIcon(item.id, isActive)}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Footer with Sitemap Links */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-info">
            <div className="footer-logo">GTNIC 2026 — Smart Innovation Platform</div>
            <p className="footer-text">
              Mockup 4 halaman interaktif terintegrasi dengan 4 tombol navigasi utama.
            </p>
          </div>

          <div className="footer-links">
            <button type="button" className="footer-link-btn" onClick={() => handleNavigate('home')}>
              1. Beranda
            </button>
            <button type="button" className="footer-link-btn" onClick={() => handleNavigate('dashboard')}>
              2. Dashboard
            </button>
            <button type="button" className="footer-link-btn" onClick={() => handleNavigate('features')}>
              3. Inovasi
            </button>
            <button type="button" className="footer-link-btn" onClick={() => handleNavigate('profile')}>
              4. Profil & Akun
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
