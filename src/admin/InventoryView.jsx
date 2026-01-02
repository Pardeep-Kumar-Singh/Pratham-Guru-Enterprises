import React from 'react'

const InventoryView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Wool Inventory</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <div className="font-semibold text-sm">Raw Wool</div>
              <div className="text-xs text-gray-600">In stock</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-green-700">850 kg</div>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Good</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <div className="font-semibold text-sm">Processed Wool</div>
              <div className="text-xs text-gray-600">In stock</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-yellow-700">400 kg</div>
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Low</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-md p-5 text-white">
          <h3 className="font-bold text-sm mb-3 opacity-90">Gola Production</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Today</span>
              <span className="font-bold">85 units</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">This Week</span>
              <span className="font-bold">520 units</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">This Month</span>
              <span className="font-bold">2,150 units</span>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-pink-500 to-pink-600 rounded-xl shadow-md p-5 text-white">
          <h3 className="font-bold text-sm mb-3 opacity-90">Artisan Work</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Active Today</span>
              <span className="font-bold">16 artisans</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Completed</span>
              <span className="font-bold">42 tasks</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Collections</span>
              <span className="font-bold">28 items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default InventoryView;