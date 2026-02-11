import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, Receipt, TrendingUp, History, Loader2, UserCircle } from 'lucide-react';
import api from '../api/axios';

const UsersView = () => {
  const navigate = useNavigate();
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecentUsers();
  }, []);

  const fetchRecentUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/recent');
      setRecentUsers(response.data);
    } catch (error) {
      console.error('Error fetching recent users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* User Management */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
          <Users className="text-blue-600 dark:text-blue-400" size={24} />
          User Management
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Tendor Accounts', path: '/admin/users/tendors', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800' },
            { label: 'Coordinator Accounts', path: '/admin/users/coordinators', color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800' },
            { label: 'Gola Maker Accounts', path: '/admin/users/gola-makers', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-800' },
            { label: 'Artisan Registration', path: '/admin/users/artisans', color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-800' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 ${item.color}`}
            >
              <div className="font-bold text-sm">
                {item.label}
              </div>
              <div className="text-xs opacity-70 mt-1 font-medium">
                Manage {item.label.toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
          <Package className="text-purple-600 dark:text-purple-400" size={24} />
          Master Configuration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Product Master', path: '/admin/masters/products', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800' },
            { label: 'Variant Master', path: '/admin/masters/variants', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800' },
            { label: 'Rate Configuration', path: '/admin/masters/rates', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 ${item.color}`}
            >
              <div className="font-bold text-sm">
                {item.label}
              </div>
              <div className="text-xs opacity-70 mt-1 font-medium">
                Setup {item.label.toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <History className="text-gray-600 dark:text-gray-400" size={24} />
            Recent Users
          </h3>
          <button
            onClick={fetchRecentUsers}
            disabled={loading}
            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <div className="text-sm font-bold">Refresh</div>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && recentUsers.length === 0 ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-gray-50 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))
          ) : recentUsers.length === 0 ? (
            <div className="col-span-full py-10 text-center text-gray-400 font-medium italic">
              No recent users found. Create your first Tendor or Coordinator!
            </div>
          ) : (
            recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 group hover:border-blue-200 dark:hover:border-blue-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700">
                  <UserCircle size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {user.username}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${user.role === 'tendor' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                      }`}>
                      {user.role}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default UsersView;
