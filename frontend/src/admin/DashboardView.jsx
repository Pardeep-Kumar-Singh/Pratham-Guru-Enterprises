import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCcw, UserPlus, Package, FileText, BarChart3, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const DashboardView = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading Dashboard Analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header with Refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Operational Overview</h2>
          <p className="text-sm text-gray-500">Real-time metrics for your enterprise</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-xl shadow-indigo-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <UserPlus size={20} />
            </div>
          </div>
          <div className="text-xs opacity-80 font-bold uppercase tracking-wider mb-1">Total Tendors</div>
          <div className="text-3xl font-black">{stats?.stats?.tendors || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-xl shadow-emerald-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Package size={20} />
            </div>
          </div>
          <div className="text-xs opacity-80 font-bold uppercase tracking-wider mb-1">Gola Makers</div>
          <div className="text-3xl font-black">{stats?.stats?.workers || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-2xl p-5 text-white shadow-xl shadow-purple-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <UserPlus size={20} />
            </div>
          </div>
          <div className="text-xs opacity-80 font-bold uppercase tracking-wider mb-1">Artisans</div>
          <div className="text-3xl font-black">{stats?.stats?.artisans || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white shadow-xl shadow-orange-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Clock size={20} />
            </div>
          </div>
          <div className="text-xs opacity-80 font-bold uppercase tracking-wider mb-1">Active Zones</div>
          <div className="text-3xl font-black">{stats?.stats?.coordinators || 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Production Performance</h3>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-xs text-gray-500 font-bold mb-1 uppercase">Today</div>
              <div className="text-xl font-black text-gray-800">{stats?.production?.today || 0} <span className="text-xs font-normal">units</span></div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-xs text-gray-500 font-bold mb-1 uppercase">Month</div>
              <div className="text-xl font-black text-gray-800">{(stats?.production?.total || 0).toLocaleString()} <span className="text-xs font-normal">units</span></div>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-xs text-blue-600 font-bold mb-1 uppercase">Value</div>
              <div className="text-xl font-black text-blue-700">₹{(stats?.production?.totalAmount / 1000 || 0).toFixed(1)}K</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-600">Goal Progress (9,000 Units)</span>
              <span className="text-blue-600">{((stats?.production?.total || 0) / 9000 * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-1000"
                style={{ width: `${Math.min(((stats?.production?.total || 0) / 9000 * 100), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            Quick Access
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin?tab=users')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-2xl transition-all group border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <UserPlus size={18} />
                </div>
                <span className="font-bold text-sm text-gray-700 transition-colors">Manage Users</span>
              </div>
              <Package size={14} className="text-gray-300 group-hover:text-blue-500" />
            </button>

            <button
              onClick={() => navigate('/admin?tab=inventory')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50 rounded-2xl transition-all group border border-gray-100 hover:border-emerald-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Package size={18} />
                </div>
                <span className="font-bold text-sm text-gray-700 transition-colors">Track Stock</span>
              </div>
              <Package size={14} className="text-gray-300 group-hover:text-emerald-500" />
            </button>

            <button
              onClick={() => navigate('/admin?tab=billing')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-amber-50 rounded-2xl transition-all group border border-gray-100 hover:border-amber-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <FileText size={18} />
                </div>
                <span className="font-bold text-sm text-gray-700 transition-colors">Billing Center</span>
              </div>
              <Package size={14} className="text-gray-300 group-hover:text-amber-500" />
            </button>
          </div>

          <p className="text-[10px] text-gray-400 font-medium text-center mt-6 uppercase tracking-widest">
            Pratham Guru Enterprises v1.0
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 bg-gray-100 rounded-md w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-50 rounded-md w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
          <h3 className="font-bold text-lg text-gray-800 mb-6">Database Health</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-black text-emerald-500">Online</div>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Status</p>
            </div>
            <div className="text-center p-4 border-l">
              <div className="text-3xl font-black text-blue-500">42ms</div>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1">Latency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
