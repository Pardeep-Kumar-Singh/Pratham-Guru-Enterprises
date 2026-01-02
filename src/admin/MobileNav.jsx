import React from 'react'

const MobileNav = ({
  menuItems,
  activeTab,
  setActiveTab,
  setMobileMenuOpen
}) => {
  return (
    <div className="lg:hidden border-t border-gray-200 px-4 py-2 space-y-1 bg-white">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileNav;
