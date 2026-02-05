import React from 'react'
const WoolScreen = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Wool Issued History</h2>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Batch ID</label>
            <input type="text" placeholder="Search batch..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition">
          Apply Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Issue Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Issued By</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Wool Qty (kg)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Batch ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { date: '2024-12-28', by: 'Admin', qty: 50, batch: 'WL-2024-456', remarks: 'Regular supply' },
                { date: '2024-12-20', by: 'Coordinator', qty: 100, batch: 'WL-2024-455', remarks: 'Bulk order' },
                { date: '2024-12-15', by: 'Admin', qty: 75, batch: 'WL-2024-454', remarks: 'Premium wool' },
                { date: '2024-12-10', by: 'Admin', qty: 125, batch: 'WL-2024-453', remarks: 'Regular supply' }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.by}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.qty} kg</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">{item.batch}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  export default WoolScreen;