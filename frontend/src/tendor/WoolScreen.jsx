import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const WoolScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ fromDate: '', toDate: '', batchId: '' });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // In a real app, query params would go here
      const response = await api.get('/materials/wool');
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch wool history", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Wool Issued History</h2>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Batch ID</label>
            <input
              type="text"
              placeholder="Search batch..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFilters({ ...filters, batchId: e.target.value })}
            />
          </div>
        </div>
        <button
          onClick={fetchHistory}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Issued To</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Wool Qty (kg)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Batch ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4">No records found</td></tr>
              ) : (
                transactions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.issuedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.issuedTo}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.qty} kg</td>
                    <td className="px-6 py-4 text-sm font-medium text-indigo-600">{item.batchId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.remarks || '-'}</td>
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

export default WoolScreen;