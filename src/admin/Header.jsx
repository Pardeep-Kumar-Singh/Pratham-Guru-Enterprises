import React from 'react';
import { Menu, X, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear auth data
    // localStorage.removeItem('token');
    // sessionStorage.clear();
    localStorage.removeItem('isAuthenticated');
    navigate('/'); // ✅ redirect to login screen
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Left: Menu + Logo / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo / Title */}
          <h1 className="text-xl font-bold text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* Right: Notifications + Logout */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Header;
