import React from 'react'
const ProductsScreen = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Products Received</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">Total Quantity Received</div>
          <div className="text-3xl font-bold">3,450 units</div>
        </div>
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">Total Weight Received</div>
          <div className="text-3xl font-bold">1,250 kg</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Receipt Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Product Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Variant</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Weight</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Batch</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { date: '2024-12-27', category: 'Sweater', variant: 'Medium - Red', qty: 120, weight: '45 kg', batch: 'PR-1234', status: 'Received' },
                { date: '2024-12-25', category: 'Shawl', variant: 'Standard - Brown', qty: 85, weight: '32 kg', batch: 'PR-1235', status: 'Received' },
                { date: '2024-12-20', category: 'Cap', variant: 'Small - Black', qty: 200, weight: '25 kg', batch: 'PR-1236', status: 'Pending' },
                { date: '2024-12-18', category: 'Scarf', variant: 'Long - White', qty: 150, weight: '40 kg', batch: 'PR-1237', status: 'Received' }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.variant}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.qty}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.weight}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">{item.batch}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Received' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
export default ProductsScreen;