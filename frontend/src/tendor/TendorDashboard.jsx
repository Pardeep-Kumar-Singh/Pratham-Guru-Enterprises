import React, { useState, lazy, Suspense } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

/* Lazy-loaded screens */
const DashboardHome = lazy(() => import('./DashboardHome'));
const DesignsScreen = lazy(() => import('./DesignsScreen'));
const WoolScreen = lazy(() => import('./WoolScreen'));
const ProductsScreen = lazy(() => import('./ProductsScreen'));
const InvoicesScreen = lazy(() => import('./InvoicesScreen'));
const ProfileScreen = lazy(() => import('./ProfileScreen'));

const TendorDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <DashboardHome />;
      case 'designs': return <DesignsScreen />;
      case 'wool': return <WoolScreen />;
      case 'products': return <ProductsScreen />;
      case 'invoices': return <InvoicesScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <DashboardHome />;
    }
  };

  return (
    /* 🔒 Lock page scroll */
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      {/* Sidebar (fixed) */}
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area (offset from sidebar, never jumps) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
      >
        {/* Header (sticky) */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          setActiveScreen={setActiveScreen}
        />

        {/* ✅ ONLY this area scrolls */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64 text-gray-600 font-semibold">
                Loading dashboard…
              </div>
            }
          >
            {renderScreen()}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default TendorDashboard;
