import React from 'react'
const DesignsScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Designs & Product Types</h2>
        <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">Reference Only</span>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Design ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Product Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Variant Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Rate Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: 'D-001', category: 'Sweater', variant: 'Medium - Red', rateType: 'Per Piece', status: 'Active' },
                { id: 'D-002', category: 'Sweater', variant: 'Large - Blue', rateType: 'Per Piece', status: 'Active' },
                { id: 'D-003', category: 'Shawl', variant: 'Standard - Brown', rateType: 'Per Kg', status: 'Active' },
                { id: 'D-004', category: 'Cap', variant: 'Small - Black', rateType: 'Per Piece', status: 'Active' },
                { id: 'D-005', category: 'Scarf', variant: 'Long - White', rateType: 'Per Kg', status: 'Active' }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.variant}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.rateType}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
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
export default DesignsScreen;