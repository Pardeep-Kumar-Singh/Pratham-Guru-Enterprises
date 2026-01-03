import React, { useEffect, useRef } from 'react';
import { Home, Package, FileText, Clipboard, User } from 'lucide-react';

const Sidebar = ({ activeScreen, setActiveScreen, sidebarOpen, setSidebarOpen }) => {
  const sidebarRef = useRef(null);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'designs', name: 'Designs & Product Types', icon: Clipboard },
    { id: 'wool', name: 'Wool Issued', icon: Package },
    { id: 'products', name: 'Products Received', icon: Package },
    { id: 'invoices', name: 'Invoices', icon: FileText },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  /* 📱 Close sidebar on outside click (mobile only) */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        window.innerWidth < 1024 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [sidebarOpen, setSidebarOpen]);

  /* 📱 Menu click handler with 1s auto-close */
  const handleMenuClick = (id) => {
    setActiveScreen(id);

    if (window.innerWidth < 1024) {
      setTimeout(() => {
        setSidebarOpen(false);
      }, 500); // 1 second delay
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`
        ${sidebarOpen ? 'w-64' : 'w-0 lg:w-20'}
        bg-gray-900 text-white
        fixed top-0 left-0
        h-screen
        z-40
        overflow-hidden
        transition-all duration-300 ease-in-out
        will-change-[width]
      `}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Package size={24} />
          </div>
          {sidebarOpen && (
            <div>
              <div className="font-bold text-sm">Pratham Guru</div>
              <div className="text-xs text-gray-400">Enterprises</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`
                w-full flex items-center gap-3
                px-4 py-3 rounded-lg transition
                ${
                  activeScreen === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }
              `}
            >
              <Icon size={20} />
              {sidebarOpen && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
