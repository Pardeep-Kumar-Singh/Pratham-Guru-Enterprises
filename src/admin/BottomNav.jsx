import React from 'react'

const BottomNav = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">
                {item.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
