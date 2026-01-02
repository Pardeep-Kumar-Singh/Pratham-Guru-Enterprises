import React from 'react'

import { Download } from 'lucide-react';
const InvoicesScreen = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Invoice Management</h2>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Invoice No.</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Month</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Total Products</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Total Weight</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Invoice Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Payment Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { no: 'INV-2024-001', month: 'December 2024', products: 980, weight: '450 kg', amount: '₹2,45,000', status: 'Pending' },
                { no: 'INV-2024-002', month: 'November 2024', products: 1120, weight: '520 kg', amount: '₹2,80,000', status: 'Paid' },
                { no: 'INV-2024-003', month: 'October 2024', products: 950, weight: '430 kg', amount: '₹2,35,000', status: 'Paid' }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">{item.no}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.month}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{item.products}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.weight}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
                      <Download size={16} />
                      <span className="text-sm font-semibold">PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details Example */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Invoice Details - INV-2024-001</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Woolen Sweater - Medium</span>
            <span className="font-semibold">120 units × ₹250 = ₹30,000</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Woolen Shawl - Standard</span>
            <span className="font-semibold">85 units × ₹450 = ₹38,250</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Woolen Cap - Small</span>
            <span className="font-semibold">200 units × ₹150 = ₹30,000</span>
          </div>
          <div className="flex justify-between py-3 bg-gray-50 px-4 rounded-lg font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-indigo-600">₹2,45,000</span>
          </div>
        </div>
      </div>
    </div>
  );
export default InvoicesScreen;