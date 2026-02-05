import React, { useState, useEffect, lazy, Suspense } from "react";
import { Calendar, Filter, FileText, ArrowLeft, Loader2, Download, Printer } from "lucide-react";
import api from "../api/axios";

const InvoiceTemplate = lazy(() => import("./InvoiceTemplate"));

const BillingView = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billingData, setBillingData] = useState({ entries: [], summarizedEntries: [], totals: { qty: 0, amount: 0 } });
  const [categories, setCategories] = useState([]);

  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBillingData();
  }, [startDate, endDate, category]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/inventory/products');
      const cats = [...new Set(response.data.map(p => p.category))];
      setCategories(cats);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBillingData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/billing', {
        params: { startDate, endDate, category }
      });
      setBillingData(response.data);
    } catch (error) {
      console.error('Error fetching billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to generate YYYYMM invoice number
  const getInvoiceNo = () => {
    const targetDate = endDate ? new Date(endDate) : new Date();
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    return `INV/${yyyy}${mm}`;
  };

  const invoiceData = {
    invoiceNo: getInvoiceNo(),
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
    buyerName: "Ajooba, Zillivate Ventures Pvt. Ltd. A/c", // Mock buyer as requested to keep design
    buyerCity: "Sonipat, Haryana",
    amountInWords: "Rupees " + (billingData.totals.amount || 0).toLocaleString() + " Only", // Basic, could be improved with a library
    remarks: category === "All" ? "Combined monthly production" : `${category} specific production billing`,
  };

  // Map billingData.summarizedEntries to the format expected by InvoiceTemplate
  const inventoryEntries = billingData.summarizedEntries.map(e => ({
    category: e.category,
    item: e.item,
    quantity: e.quantity,
    baseRate: e.baseRate
  }));

  /* ================= INVOICE VIEW ================= */
  if (showInvoice) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowInvoice(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Billing Center
          </button>
          <div className="text-sm text-gray-500 font-medium">
            Previewing Invoice for {startDate} to {endDate}
          </div>
        </div>

        <React.Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <p className="text-gray-500 font-medium">Generating real-time invoice...</p>
          </div>
        }>
          <InvoiceTemplate
            invoice={invoiceData}
            inventoryEntries={inventoryEntries}
          />
        </React.Suspense>
      </div>
    );
  }

  /* ================= BILLING DASHBOARD ================= */
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">Billing Center</h2>
            <p className="text-sm text-gray-500">Manage invoices and track production billing</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Calendar size={18} className="text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
              />
              <span className="text-gray-300 mx-1">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => { setStartDate(''); setEndDate(''); }}
              className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
            >
              Show All History
            </button>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
              >
                <option value="All">All Sections</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Real-time Summary Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold opacity-80 mb-1">Production Value</h3>
            <div className="text-3xl font-black">₹{(billingData.totals.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs opacity-70 mt-2 font-medium">For the selected period & section</p>
          </div>

          <button
            onClick={() => setShowInvoice(true)}
            disabled={billingData.entries.length === 0}
            className="mt-6 w-full bg-white text-blue-700 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            <Printer size={18} />
            Generate PDF Invoice
          </button>
        </div>

        {/* Breakdown Card */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Production Breakdown</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold">
              {billingData.entries.length} Records Found
            </span>
          </div>

          <div className="overflow-y-auto overflow-x-auto max-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <p className="text-sm text-gray-400 mt-2">Updating data...</p>
              </div>
            ) : billingData.summarizedEntries.length === 0 ? (
              <div className="text-center py-12 text-gray-400 italic">
                No production data found for this period.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-black">
                  <tr>
                    <th className="px-6 py-3">Section</th>
                    <th className="px-6 py-3">Item Name</th>
                    <th className="px-6 py-3 text-right">Quantity</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {billingData.summarizedEntries.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {entry.category}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-bold text-gray-700">{entry.item}</td>
                      <td className="px-6 py-3 text-right text-gray-600 font-medium">{Number(entry.quantity).toLocaleString('en-IN', { maximumFractionDigits: 3 })}</td>
                      <td className="px-6 py-3 text-right font-black text-gray-800">₹{(entry.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Recent Billing Activity (Real-time) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
          Recurring Billing Activity (All History)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {billingData.recentActivity && billingData.recentActivity.length > 0 ? (
            billingData.recentActivity.map((activity, idx) => (
              <div
                key={idx}
                onClick={() => {
                  // Parse "September 2024" to startDate/endDate
                  // activity.date is "Month Year" string from backend
                  const [month, year] = activity.date.split(' ');
                  const monthIndex = new Date(`${month} 1, 2000`).getMonth();
                  const y = parseInt(year);

                  const start = new Date(Date.UTC(y, monthIndex, 1)).toISOString().split('T')[0];
                  const end = new Date(Date.UTC(y, monthIndex + 1, 0)).toISOString().split('T')[0];

                  setStartDate(start);
                  setEndDate(end);
                  setCategory("All"); // Reset category or keep? Usually Invoice is "All"
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to see the updated data
                }}
                className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                    <Download size={18} />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${activity.status === "Processed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700 animation-pulse"
                    }`}>
                    {activity.status}
                  </span>
                </div>
                <div className="font-black text-gray-800">{activity.name}</div>
                <div className="text-xs text-gray-500 mb-2">{activity.date}</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-black text-blue-600">₹{(activity.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <button className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest group-hover:text-blue-600">Select & Generate</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-400 italic bg-gray-50 rounded-2xl border border-dashed">
              No recent billing history found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingView;
