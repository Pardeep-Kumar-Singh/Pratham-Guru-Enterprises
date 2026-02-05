import React, { useState, useEffect } from 'react';
import { TrendingUp, Download, Calendar, Package, DollarSign, Activity, BarChart3, Loader2 } from 'lucide-react';
import api from '../api/axios';

const ReportsSection = () => {
  const [activeReport, setActiveReport] = useState('production');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // Start of year
    to: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [workerStats, setWorkerStats] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, [activeReport, dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      if (activeReport === 'production') endpoint = '/reports/production';
      else if (activeReport === 'product') endpoint = '/reports/products';
      else if (activeReport === 'worker' || activeReport === 'tendor') endpoint = '/reports/workers';

      const response = await api.get(endpoint, {
        params: { startDate: dateRange.from, endDate: dateRange.to }
      });

      if (activeReport === 'worker' || activeReport === 'tendor') {
        setWorkerStats(response.data);
      } else {
        setReportData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reportTypes = [
    { id: 'production', name: 'Monthly Production', icon: BarChart3, color: 'from-pink-500 to-rose-600' },
    { id: 'product', name: 'Product-wise Report', icon: Package, color: 'from-purple-500 to-indigo-600' },
    { id: 'tendor', name: 'User Distribution', icon: DollarSign, color: 'from-blue-500 to-cyan-600' },
    { id: 'worker', name: 'Worker Overview', icon: Activity, color: 'from-orange-500 to-amber-600' },
  ];

  const handleExport = () => {
    if (!reportData && !workerStats) return;

    const escapeCSV = (val) => {
      const stringVal = String(val);
      if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    };

    let csvRows = [];
    let fileName = `report_${activeReport}_${new Date().toISOString().split('T')[0]}.csv`;

    if (activeReport === 'production') {
      const categories = new Set();
      reportData.forEach(row => {
        Object.keys(row).forEach(key => {
          if (key !== 'month' && key !== 'total') categories.add(key);
        });
      });
      const categoryList = Array.from(categories);
      csvRows.push(["Month", ...categoryList, "Total"].map(escapeCSV).join(","));

      reportData.forEach(row => {
        const line = [row.month, ...categoryList.map(cat => row[cat] || 0), row.total];
        csvRows.push(line.map(escapeCSV).join(","));
      });
    }
    else if (activeReport === 'product') {
      csvRows.push(["Product", "Category", "Quantity", "Avg Rate", "Revenue", "Share (%)"].map(escapeCSV).join(","));

      reportData.forEach(p => {
        const line = [p.product, p.category, p.quantity, (p.avgRate || 0).toFixed(2), p.revenue, p.percentage + "%"];
        csvRows.push(line.map(escapeCSV).join(","));
      });
    }
    else if (activeReport === 'worker' || activeReport === 'tendor') {
      if (!workerStats) return;
      csvRows.push(["Username", "Role", "Join Date"].map(escapeCSV).join(","));

      workerStats.recentWorkers.forEach(u => {
        const line = [u.username, u.role, new Date(u.createdAt).toLocaleDateString()];
        csvRows.push(line.map(escapeCSV).join(","));
      });
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Production Report View
  const ProductionReport = () => {
    if (loading) return <LoadingPlaceholder />;

    // Get all categories present in the data for columns
    const categories = new Set();
    reportData?.forEach(row => {
      if (row) {
        Object.keys(row).forEach(key => {
          if (key !== 'month' && key !== 'total') categories.add(key);
        });
      }
    });
    const categoryList = Array.from(categories);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="text-pink-500" />
            Monthly Production Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Month</th>
                  {categoryList.map(cat => (
                    <th key={cat} className="px-6 py-4 text-right">{cat}</th>
                  ))}
                  <th className="px-6 py-4 text-right text-pink-600 font-black">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reportData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-pink-50/30 transition">
                    <td className="px-6 py-4 font-bold text-gray-800">{row.month}</td>
                    {categoryList.map(cat => (
                      <td key={cat} className="px-6 py-4 text-right text-gray-600">{row[cat] || 0}</td>
                    ))}
                    <td className="px-6 py-4 text-right font-black text-pink-600">{row.total}</td>
                  </tr>
                ))}
                {reportData.length === 0 && (
                  <tr>
                    <td colSpan={categoryList.length + 2} className="px-6 py-20 text-center text-gray-400 italic">
                      No production data found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Production Heatmap</h3>
          <div className="space-y-4">
            {reportData.map((row, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">{row.month}</span>
                  <span className="text-sm font-black text-pink-600">{row.total} units</span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full transition-all duration-1000 group-hover:brightness-110"
                    style={{ width: `${Math.min((row.total / (Math.max(...reportData.map(r => r.total)) || 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Product-wise Report View
  const ProductReport = () => {
    if (loading) return <LoadingPlaceholder />;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportData?.slice(0, 4).map((product, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-100 animate-in zoom-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <Package size={24} className="opacity-60" />
                <span className="text-2xl font-black">{product?.percentage || 0}%</span>
              </div>
              <h3 className="text-lg font-bold mb-1 truncate">{product?.product || 'Unknown'}</h3>
              <div className="text-xs font-medium opacity-80 uppercase tracking-tighter">
                Qty: {product?.quantity || 0} • ₹{(product?.revenue || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Inventory Share Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Product / Section</th>
                  <th className="px-6 py-4 text-right">Quantity</th>
                  <th className="px-6 py-4 text-right">Avg Rate</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                  <th className="px-6 py-4 text-right">Share (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reportData?.map((product, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{product?.product || 'Unknown'}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">{product?.category || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 font-medium">{product?.quantity || 0}</td>
                    <td className="px-6 py-4 text-right text-gray-600">₹{(product?.avgRate || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-black text-purple-600">₹{(product?.revenue || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${product?.percentage || 0}%` }}></div>
                        </div>
                        <span className="font-black text-indigo-600 text-[10px]">{product?.percentage || 0}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // User distribution view (formerly Tendor)
  const TendorReport = () => {
    if (loading) return <LoadingPlaceholder />;
    if (!workerStats) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <DollarSign size={80} />
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Tendors</div>
            <div className="text-5xl font-black text-blue-600">{workerStats.summary.tendors}</div>
            <p className="text-xs text-gray-500 mt-4 font-bold flex items-center gap-1">
              Active accounts across zones
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <Package size={80} />
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Gola Makers</div>
            <div className="text-5xl font-black text-indigo-600">{workerStats.summary.golaMakers}</div>
            <p className="text-xs text-gray-500 mt-4 font-bold">Production floor staff</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <Activity size={80} />
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Artisans</div>
            <div className="text-5xl font-black text-cyan-600">{workerStats.summary.artisans}</div>
            <p className="text-xs text-gray-500 mt-4 font-bold">Final finishing experts</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Staff Registrations</h3>
          <div className="space-y-3">
            {workerStats?.recentWorkers?.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-blue-600">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{user.username}</div>
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{user.role}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-400">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LoadingPlaceholder = () => (
    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm animate-pulse">
      <Loader2 className="animate-spin text-gray-200 mb-4" size={48} />
      <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Fetching Real-time Analytics...</p>
    </div>
  );

  const renderReport = () => {
    switch (activeReport) {
      case 'production': return <ProductionReport />;
      case 'product': return <ProductReport />;
      case 'tendor': return <TendorReport />;
      case 'worker': return <TendorReport />; // Using same view for both user stats for now
      default: return <ProductionReport />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center shadow-xl text-white">
              <TrendingUp size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Reports & Analytics</h1>
              <p className="text-sm text-gray-500 font-medium">Real-time business insights for Pratham Guru</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleExport()}
              className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-black text-gray-600 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
            >
              <Download size={18} />
              Export Data
            </button>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const isActive = activeReport === report.id;
            return (
              <button
                key={report.id}
                onClick={() => setActiveReport(report.id)}
                className={`p-6 rounded-3xl shadow-sm transition-all relative overflow-hidden group ${isActive
                  ? `bg-gradient-to-br ${report.color} text-white shadow-xl shadow-indigo-100 scale-105 z-10`
                  : 'bg-white hover:bg-gray-50'
                  }`}
              >
                {!isActive && <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${report.color} opacity-0 group-hover:opacity-100 transition-opacity`} />}
                <Icon size={32} className={isActive ? 'text-white' : 'text-gray-400'} />
                <h3 className={`mt-4 font-black text-sm uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-700'}`}>
                  {report.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5">
                <Calendar size={18} className="text-gray-400" />
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
                />
                <span className="text-gray-300 font-black">TO</span>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
                />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:block">Select Date Range for Analytics</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => fetchReportData()}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-black transition-all active:scale-95"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderReport()}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
