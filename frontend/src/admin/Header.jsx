import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="print-hidden">
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between px-4 py-3">

          {/* Left: Menu + Logo / Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo / Title */}
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h1>
          </div>

          {/* Right: Notifications + Logout */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
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
    </div>
  );
};

export default Header;