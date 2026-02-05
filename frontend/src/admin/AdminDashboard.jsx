import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Home,
  Users,
  Package,
  Receipt,
  TrendingUp
} from 'lucide-react';

import { useLocation } from 'react-router-dom';

/* Layout Components */
import Header from './Header';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import BottomNav from './BottomNav';

/* Lazy Loaded Views (same folder) */
const DashboardView = lazy(() => import('./DashboardView'));
const UsersView = lazy(() => import('./UsersView'));
const InventoryView = lazy(() => import('./InventoryView'));
const BillingView = lazy(() => import('./BillingView'));
const ReportsView = lazy(() => import('./ReportsView'));

/* Menu Configuration */
const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'users', name: 'Users & Master', icon: Users },
  { id: 'inventory', name: 'Inventory', icon: Package },
  { id: 'billing', name: 'Billing', icon: Receipt },
  { id: 'reports', name: 'Reports', icon: TrendingUp }
];

const AdminDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'dashboard';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update tab if URL changes (optional but good for back/forward)
  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (tab) setActiveTab(tab);
  }, [location.search]);

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersView />;
      case 'inventory':
        return <InventoryView />;
      case 'billing':
        return <BillingView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Desktop Navigation */}
      <DesktopNav
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <MobileNav
          menuItems={menuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      {/* Main Content */}
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 max-w-7xl mx-auto">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          {renderContent()}
        </Suspense>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default AdminDashboard;
