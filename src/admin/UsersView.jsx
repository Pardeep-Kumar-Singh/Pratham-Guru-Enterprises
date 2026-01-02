import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsersView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">User Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Tendor Accounts', path: '/admin/users/tendors' },
            { label: 'Coordinator Accounts', path: '/admin/users/coordinators' },
            { label: 'Gola Maker Accounts', path: '/admin/users/gola-makers' },
            { label: 'Artisan Registration', path: '/admin/users/artisans' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="p-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition cursor-pointer"
            >
              <div className="font-semibold text-gray-800 text-sm">
                {item.label}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Manage {item.label.toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Configuration */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Master Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'Product Master', path: '/admin/masters/products' },
            { label: 'Variant Master', path: '/admin/masters/variants' },
            { label: 'Rate Configuration', path: '/admin/masters/rates' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="p-4 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition cursor-pointer"
            >
              <div className="font-semibold text-gray-800 text-sm">
                {item.label}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Setup {item.label.toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-3">Recent Users</h3>
        <div className="space-y-2">
          {[
            { name: 'Rajesh Kumar', role: 'Tendor', status: 'Active' },
            { name: 'Priya Singh', role: 'Coordinator', status: 'Active' },
            { name: 'Amit Shah', role: 'Artisan', status: 'Inactive' }
          ].map((user, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-semibold text-sm text-gray-800">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500">
                  {user.role}
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {user.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UsersView;
