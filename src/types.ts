export type PageId = 'home' | 'dashboard' | 'features' | 'profile';

export interface NavItem {
  id: PageId;
  label: string;
  badge?: string;
  iconName: 'home' | 'dashboard' | 'features' | 'profile';
  description: string;
}

export interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

export interface InnovationItem {
  id: string;
  title: string;
  category: 'AI & Data' | 'IoT & Hardware' | 'Smart Automation' | 'Web Platform';
  description: string;
  status: 'Aktif' | 'Pengujian' | 'Pembaruan';
  rating: number;
  users: number;
  tags: string[];
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning';
}
