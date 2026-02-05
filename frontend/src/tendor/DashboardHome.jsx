import React from 'react'

import { Package, FileText } from 'lucide-react';
const DashboardHome = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">Total Wool Issued</div>
          <div className="text-3xl font-bold">1,250 kg</div>
          <div className="text-xs opacity-75 mt-2">This month: 450 kg</div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">Total Products Received</div>
          <div className="text-3xl font-bold">3,450</div>
          <div className="text-xs opacity-75 mt-2">This month: 980 units</div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">Current Month Production</div>
          <div className="text-3xl font-bold">980 units</div>
          <div className="text-xs opacity-75 mt-2">Target: 1,200 units</div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">Current Month Bill</div>
          <div className="text-3xl font-bold">₹2,45,000</div>
          <div className="text-xs opacity-75 mt-2">Pending: ₹45,000</div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Pending Receipts</h3>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">8 Items</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Batch #1234</span>
              <span className="font-semibold">120 units</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Batch #1235</span>
              <span className="font-semibold">85 units</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Completed Dispatches</h3>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">24</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">85% completion rate</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Pending Invoices</h3>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">3</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">December 2024</span>
              <span className="font-semibold text-red-600">₹45,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Package className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Wool Issued</div>
              <div className="text-sm text-gray-600">50 kg issued on Dec 28, 2024</div>
              <div className="text-xs text-gray-500 mt-1">Batch ID: WL-2024-456</div>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <Package className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Products Received</div>
              <div className="text-sm text-gray-600">120 units received on Dec 27, 2024</div>
              <div className="text-xs text-gray-500 mt-1">Product: Woolen Sweater - Medium</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
              <FileText className="text-purple-600" size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Invoice Generated</div>
              <div className="text-sm text-gray-600">INV-2024-001 for ₹2,00,000</div>
              <div className="text-xs text-gray-500 mt-1">Generated on Dec 25, 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default DashboardHome;