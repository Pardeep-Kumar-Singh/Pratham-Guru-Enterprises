
import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import api from '../api/axios';

const InvoicesScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/invoices');
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices", error);
      setLoading(false);
    }
  };

  return (
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
              {loading ? (
                <tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-4">No invoices found</td></tr>
              ) : (
                invoices.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-indigo-600">{item.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.month} {item.year}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.totalProducts}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.totalWeight} kg</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">₹{item.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Paid'
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoicesScreen;