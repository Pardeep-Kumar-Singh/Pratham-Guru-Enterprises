import React, { useState } from 'react';
import { TrendingUp, Download, Calendar, Filter, Package, Users, DollarSign, Activity, FileText, BarChart3, PieChart } from 'lucide-react';

const ReportsSection = () => {
  const [activeReport, setActiveReport] = useState('production');
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-12-31' });
  // const [selectedProduct, setSelectedProduct] = useState('all');
  // const [selectedTendor, setSelectedTendor] = useState('all');

  // Sample data for reports
  const productionData = [
    { month: 'Jan', sweater: 450, shawl: 320, cap: 280, scarf: 190, total: 1240 },
    { month: 'Feb', sweater: 480, shawl: 350, cap: 300, scarf: 210, total: 1340 },
    { month: 'Mar', sweater: 520, shawl: 380, cap: 320, scarf: 230, total: 1450 },
    { month: 'Apr', sweater: 490, shawl: 340, cap: 290, scarf: 200, total: 1320 },
    { month: 'May', sweater: 510, shawl: 360, cap: 310, scarf: 220, total: 1400 },
    { month: 'Jun', sweater: 530, shawl: 390, cap: 330, scarf: 240, total: 1490 },
  ];

  const productWiseData = [
    { product: 'Sweater', quantity: 2980, revenue: 745000, avgRate: 250, percentage: 35 },
    { product: 'Shawl', quantity: 2140, revenue: 963000, avgRate: 450, percentage: 25 },
    { product: 'Cap', quantity: 1830, revenue: 274500, avgRate: 150, percentage: 22 },
    { product: 'Scarf', quantity: 1290, revenue: 258000, avgRate: 200, percentage: 18 },
  ];

  const tendorRevenueData = [
    { tendor: 'Rajesh Kumar', orders: 45, quantity: 1250, revenue: 312500, performance: 92 },
    { tendor: 'Amit Shah', orders: 38, quantity: 980, revenue: 245000, performance: 88 },
    { tendor: 'Priya Singh', orders: 42, quantity: 1180, revenue: 295000, performance: 90 },
    { tendor: 'Vikram Patel', orders: 35, quantity: 850, revenue: 212500, performance: 85 },
    { tendor: 'Sunita Devi', orders: 40, quantity: 1100, revenue: 275000, performance: 89 },
  ];

  const workerProductivityData = [
    { worker: 'Suresh Kumar', role: 'Gola Maker', output: 850, target: 900, efficiency: 94, quality: 98 },
    { worker: 'Ramesh Yadav', role: 'Gola Maker', output: 780, target: 900, efficiency: 87, quality: 96 },
    { worker: 'Sunita Devi', role: 'Artisan', output: 320, target: 350, efficiency: 91, quality: 99 },
    { worker: 'Geeta Sharma', role: 'Artisan', output: 290, target: 350, efficiency: 83, quality: 97 },
    { worker: 'Mohan Singh', role: 'Artisan', output: 310, target: 350, efficiency: 89, quality: 98 },
  ];

  const reportTypes = [
    { id: 'production', name: 'Monthly Production', icon: BarChart3, color: 'from-pink-500 to-rose-600' },
    { id: 'product', name: 'Product-wise Report', icon: Package, color: 'from-purple-500 to-indigo-600' },
    { id: 'tendor', name: 'Tendor Revenue', icon: DollarSign, color: 'from-blue-500 to-cyan-600' },
    { id: 'worker', name: 'Worker Productivity', icon: Activity, color: 'from-orange-500 to-amber-600' },
  ];

  const handleExport = (format) => {
    alert(`Exporting ${activeReport} report as ${format.toUpperCase()}...`);
  };

  // Production Report View
  const ProductionReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Production Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Month</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Sweater</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Shawl</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Cap</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Scarf</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productionData.map((row, idx) => (
                <tr key={idx} className="hover:bg-pink-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-800">{row.month}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.sweater}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.shawl}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.cap}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.scarf}</td>
                  <td className="px-4 py-3 text-right font-bold text-pink-600">{row.total}</td>
                </tr>
              ))}
              <tr className="bg-pink-50 font-bold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">{productionData.reduce((sum, row) => sum + row.sweater, 0)}</td>
                <td className="px-4 py-3 text-right">{productionData.reduce((sum, row) => sum + row.shawl, 0)}</td>
                <td className="px-4 py-3 text-right">{productionData.reduce((sum, row) => sum + row.cap, 0)}</td>
                <td className="px-4 py-3 text-right">{productionData.reduce((sum, row) => sum + row.scarf, 0)}</td>
                <td className="px-4 py-3 text-right text-pink-600">{productionData.reduce((sum, row) => sum + row.total, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Production Trend</h3>
        <div className="space-y-3">
          {productionData.map((row, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{row.month}</span>
                <span className="text-sm font-bold text-pink-600">{row.total} units</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full transition-all duration-500"
                  style={{ width: `${(row.total / 1500) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Product-wise Report View
  const ProductReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productWiseData.map((product, idx) => (
          <div key={idx} className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Package size={24} />
              <span className="text-2xl font-bold">{product.percentage}%</span>
            </div>
            <h3 className="text-lg font-bold mb-1">{product.product}</h3>
            <div className="text-sm opacity-90">
              <div>Qty: {product.quantity} units</div>
              <div>Revenue: ₹{product.revenue.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Product Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Product</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Avg Rate</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Market Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productWiseData.map((product, idx) => (
                <tr key={idx} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-800">{product.product}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{product.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-600">₹{product.avgRate}</td>
                  <td className="px-4 py-3 text-right font-bold text-purple-600">₹{product.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {product.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-purple-50 font-bold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">{productWiseData.reduce((sum, p) => sum + p.quantity, 0)}</td>
                <td className="px-4 py-3 text-right">-</td>
                <td className="px-4 py-3 text-right text-purple-600">₹{productWiseData.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Tendor Revenue Report View
  const TendorReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-blue-600">
            ₹{tendorRevenueData.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Total Orders</div>
          <div className="text-2xl font-bold text-green-600">
            {tendorRevenueData.reduce((sum, t) => sum + t.orders, 0)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Avg Performance</div>
          <div className="text-2xl font-bold text-orange-600">
            {(tendorRevenueData.reduce((sum, t) => sum + t.performance, 0) / tendorRevenueData.length).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tendor Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Tendor Name</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Orders</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tendorRevenueData.map((tendor, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-800">{tendor.tendor}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{tendor.orders}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{tendor.quantity}</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">₹{tendor.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
                          style={{ width: `${tendor.performance}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-blue-600">{tendor.performance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Distribution</h3>
        <div className="space-y-3">
          {tendorRevenueData.map((tendor, idx) => {
            const totalRevenue = tendorRevenueData.reduce((sum, t) => sum + t.revenue, 0);
            const percentage = ((tendor.revenue / totalRevenue) * 100).toFixed(1);
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{tendor.tendor}</span>
                  <span className="text-sm font-bold text-blue-600">₹{tendor.revenue.toLocaleString()} ({percentage}%)</span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Worker Productivity Report View
  const WorkerReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Total Workers</div>
          <div className="text-2xl font-bold text-gray-800">{workerProductivityData.length}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Avg Efficiency</div>
          <div className="text-2xl font-bold text-green-600">
            {(workerProductivityData.reduce((sum, w) => sum + w.efficiency, 0) / workerProductivityData.length).toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Avg Quality</div>
          <div className="text-2xl font-bold text-blue-600">
            {(workerProductivityData.reduce((sum, w) => sum + w.quality, 0) / workerProductivityData.length).toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="text-xs text-gray-600 mb-1">Total Output</div>
          <div className="text-2xl font-bold text-orange-600">
            {workerProductivityData.reduce((sum, w) => sum + w.output, 0)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Worker Performance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Worker Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Role</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Output</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Target</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Efficiency</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase">Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workerProductivityData.map((worker, idx) => (
                <tr key={idx} className="hover:bg-orange-50 transition">
                  <td className="px-4 py-3 font-semibold text-gray-800">{worker.worker}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                      {worker.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-orange-600">{worker.output}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{worker.target}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      worker.efficiency >= 90 ? 'bg-green-100 text-green-700' :
                      worker.efficiency >= 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {worker.efficiency}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      {worker.quality}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Efficiency vs Target</h3>
          <div className="space-y-3">
            {workerProductivityData.map((worker, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{worker.worker}</span>
                  <span className="text-sm font-bold text-orange-600">{worker.output}/{worker.target}</span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-500"
                    style={{ width: `${worker.efficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quality Ratings</h3>
          <div className="space-y-3">
            {workerProductivityData.map((worker, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{worker.worker}</span>
                  <span className="text-sm font-bold text-blue-600">{worker.quality}%</span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-500"
                    style={{ width: `${worker.quality}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (activeReport) {
      case 'production': return <ProductionReport />;
      case 'product': return <ProductReport />;
      case 'tendor': return <TendorReport />;
      case 'worker': return <WorkerReport />;
      default: return <ProductionReport />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-sm text-gray-600">Comprehensive business insights and data analysis</p>
            </div>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setActiveReport(report.id)}
                className={`p-5 rounded-xl shadow-md transition-all ${
                  activeReport === report.id
                    ? `bg-gradient-to-br ${report.color} text-white shadow-lg scale-105`
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <Icon size={32} className={activeReport === report.id ? 'text-white' : 'text-gray-600'} />
                <h3 className={`mt-3 font-bold ${activeReport === report.id ? 'text-white' : 'text-gray-800'}`}>
                  {report.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-3 flex-1 w-full">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => handleExport('pdf')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                <Download size={16} />
                PDF
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
              >
                <Download size={16} />
                Excel
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {renderReport()}
      </div>
    </div>
  );
};

export default ReportsSection;