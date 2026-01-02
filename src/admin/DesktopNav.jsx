import React from 'react'
const DesktopNav = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <div className="hidden lg:flex border-t border-gray-200 bg-white">
      {/* Center wrapper */}
      <div className="flex mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                activeTab === item.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopNav;

