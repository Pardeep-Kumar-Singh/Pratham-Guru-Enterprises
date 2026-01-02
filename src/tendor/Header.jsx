import React from 'react';
import { Bell, Menu, User, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  notificationOpen,
  setNotificationOpen,
  profileOpen,
  setProfileOpen,
  setActiveScreen
}) => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, message: 'New wool issued: 50 kg', time: '2 hours ago' },
    { id: 2, message: 'Product dispatched: Batch #1234', time: '5 hours ago' },
    { id: 3, message: 'Invoice generated: INV-2024-001', time: '1 day ago' }
  ];

  const handleLogout = () => {
    // 🔐 Optional: clear auth/session data
    // localStorage.removeItem('token');
    // sessionStorage.clear();

    setProfileOpen(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Tendor Dashboard</h1>
            <p className="text-xs text-gray-600">Pratham Guru Enterprises</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border">
                <div className="p-4 border-b font-bold">Notifications</div>
                {notifications.map(n => (
                  <div key={n.id} className="p-4 border-b text-sm">
                    <div>{n.message}</div>
                    <div className="text-xs text-gray-500">{n.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              <User size={18} />
              <ChevronDown size={16} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border">
                <button
                  onClick={() => {
                    setActiveScreen('profile');
                    setProfileOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                >
                  View Profile
                </button>

                <button className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
