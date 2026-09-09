import React from 'react';
import type { PageId, NavItem } from '../types';
import { HomeIcon, DashboardIcon, FeaturesIcon, ProfileIcon, BellIcon } from './Icons';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Beranda',
    badge: 'Utama',
    iconName: 'home',
    description: 'Ringkasan & Informasi Utama',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    badge: 'Live',
    iconName: 'dashboard',
    description: 'Metrik & Analitik Real-time',
  },
  {
    id: 'features',
    label: 'Inovasi',
    badge: '6 Solusi',
    iconName: 'features',
    description: 'Katalog Fitur & Solusi Cerdas',
  },
  {
    id: 'profile',
    label: 'Profil',
    badge: 'Akun',
    iconName: 'profile',
    description: 'Pengaturan & Preferensi Sistem',
  },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const renderIcon = (name: NavItem['iconName'], active: boolean) => {
    const props = { size: 19, className: active ? 'nav-icon active' : 'nav-icon' };
    switch (name) {
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

  const currentIndex = navItems.findIndex((item) => item.id === currentPage);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="brand-wrapper" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
          <div className="brand-logo-badge">
            <span className="logo-symbol">⚡</span>
          </div>
          <div className="brand-text">
            <div className="brand-title">GTNIC <span className="brand-badge">2026</span></div>
            <div className="brand-subtitle">Smart Innovation Hub</div>
          </div>
        </div>

        {/* 4 Navigation Buttons */}
        <nav className="nav-buttons-container" aria-label="Navigasi Mockup 4 Halaman">
          {navItems.map((item, index) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                title={`Beralih ke halaman ${item.label}`}
              >
                <div className="nav-btn-icon-box">
                  {renderIcon(item.iconName, isActive)}
                </div>
                <div className="nav-btn-content">
                  <span className="nav-btn-num">0{index + 1}</span>
                  <span className="nav-btn-title">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`nav-pill-badge ${isActive ? 'active' : ''}`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <div className="nav-active-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Header Right Action & Status */}
        <div className="header-actions">
          <div className="page-step-indicator">
            <span className="current-step">Halaman {currentIndex + 1}</span>
            <span className="total-step">/ 4</span>
          </div>
          <button className="icon-action-btn" title="Notifikasi Sistem" type="button">
            <BellIcon size={18} />
            <span className="notification-dot" />
          </button>
          <div className="user-avatar-pill" onClick={() => onNavigate('profile')}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="User Avatar"
              className="user-avatar-img"
            />
            <span className="user-online-status" />
          </div>
        </div>
      </div>
    </header>
  );
};
