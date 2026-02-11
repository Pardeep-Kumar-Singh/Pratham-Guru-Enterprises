import React from 'react'
const DesktopNav = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <div className="desktop-nav print-hidden">
      <div className="hidden lg:flex border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
        {/* Center wrapper */}
        <div className="flex mx-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${activeTab === item.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;

