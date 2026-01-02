import React from 'react'
const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-xs opacity-90 mb-1">Total Tendors</div>
          <div className="text-2xl lg:text-3xl font-bold">24</div>
          <div className="text-xs mt-2 opacity-75">+3 this month</div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-xs opacity-90 mb-1">Workers</div>
          <div className="text-2xl lg:text-3xl font-bold">45</div>
          <div className="text-xs mt-2 opacity-75">Active today</div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-xs opacity-90 mb-1">Artisans</div>
          <div className="text-2xl lg:text-3xl font-bold">18</div>
          <div className="text-xs mt-2 opacity-75">All registered</div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-xs opacity-90 mb-1">Wool Stock</div>
          <div className="text-2xl lg:text-3xl font-bold">1.2K</div>
          <div className="text-xs mt-2 opacity-75">kg remaining</div>
        </div>
      </div>

      {/* Production & Pending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">Production</h3>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Live</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Today</span>
              <span className="font-bold text-gray-800">125 units</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="font-bold text-gray-800">3,450 units</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Target Progress</span>
              <span className="font-bold text-green-600">86%</span>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{width: '86%'}}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">Pending Items</h3>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">8 Items</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Collections</span>
              <span className="font-bold text-orange-600">8 items</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Unpaid Bills</span>
              <span className="font-bold text-red-600">₹45,000</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Dispatches</span>
              <span className="font-bold text-yellow-600">12 orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-center">
            <div className="text-xs text-blue-700 font-semibold">Add User</div>
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition text-center">
            <div className="text-xs text-green-700 font-semibold">Track Stock</div>
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-center">
            <div className="text-xs text-purple-700 font-semibold">New Invoice</div>
          </button>
          <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition text-center">
            <div className="text-xs text-orange-700 font-semibold">View Reports</div>
          </button>
        </div>
      </div>
    </div>
  );
export default DashboardView;