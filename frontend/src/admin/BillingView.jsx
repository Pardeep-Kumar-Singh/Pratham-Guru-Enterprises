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
  const [billingType, setBillingType] = useState("standard"); // standard | wool

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBillingData();
  }, [startDate, endDate, category, billingType]);

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
        params: { startDate, endDate, category, type: billingType }
      });
      setBillingData(response.data);
    } catch (error) {
      console.error('Error fetching billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SELECTION LOGIC ================= */
  // Store selected items as a map of "category-item": boolean or entry object
  const [selectedItems, setSelectedItems] = useState({});

  // Initialize selection when data loads
  useEffect(() => {
    if (billingData.summarizedEntries && billingData.summarizedEntries.length > 0) {
      const initialSelection = {};
      billingData.summarizedEntries.forEach(e => {
        initialSelection[`${e.category}-${e.item}`] = e;
      });
      setSelectedItems(initialSelection);
    } else {
      setSelectedItems({});
    }
  }, [billingData.summarizedEntries]);

  const toggleItem = (entry) => {
    const key = `${entry.category}-${entry.item}`;
    setSelectedItems(prev => {
      const newSelection = { ...prev };
      if (newSelection[key]) {
        delete newSelection[key];
      } else {
        newSelection[key] = entry;
      }
      return newSelection;
    });
  };

  const toggleAll = () => {
    if (Object.keys(selectedItems).length === billingData.summarizedEntries.length) {
      setSelectedItems({});
    } else {
      const allSelected = {};
      billingData.summarizedEntries.forEach(e => {
        allSelected[`${e.category}-${e.item}`] = e;
      });
      setSelectedItems(allSelected);
    }
  };

  // Calculate totals based on selection
  const selectedTotalAmount = Object.values(selectedItems).reduce((sum, item) => sum + (item.amount || 0), 0);

  const invoiceData = {
    invoiceNo: `INV-${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}`,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
    buyerName: "Ajooba, Zillivate Ventures Pvt. Ltd. A/c", // Mock buyer as requested to keep design
    buyerCity: "Sonipat, Haryana",
    amountInWords: "Rupees " + (Math.round(selectedTotalAmount)).toLocaleString() + " Only", // Basic, could be improved with a library
    remarks: category === "All" ? "Combined monthly production" : `${category} specific production billing`,
  };

  // Map only selected entries to the format expected by InvoiceTemplate
  const inventoryEntries = Object.values(selectedItems).map(e => ({
    category: e.category,
    item: e.item,
    quantity: e.quantity,
    baseRate: e.baseRate
  }));

  /* ================= INVOICE VIEW ================= */
  if (showInvoice) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between mb-4 print:hidden">
          <button
            onClick={() => setShowInvoice(false)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Billing Center
          </button>
          <div className="text-sm text-gray-500 font-medium">
            Previewing Invoice for {startDate} to {endDate}
          </div>
        </div>

        <React.Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Generating real-time invoice...</p>
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Billing Center</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage invoices and track {billingType === 'wool' ? 'Wool' : 'Production'} billing</p>
          </div>

          {/* Type Toggle */}
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex transition-colors">
            <button
              onClick={() => setBillingType("standard")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${billingType === "standard" ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              Standard
            </button>
            <button
              onClick={() => setBillingType("wool")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${billingType === "wool" ? "bg-white dark:bg-gray-600 text-amber-600 dark:text-amber-400 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              Wool
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 transition-colors">
              <Calendar size={18} className="text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
              />
              <span className="text-gray-300 dark:text-gray-500 mx-1">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => { setStartDate(''); setEndDate(''); }}
              className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition-colors whitespace-nowrap"
            >
              Show All History
            </button>

            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 transition-colors">
              <Filter size={18} className="text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
              >
                <option value="All" className="dark:bg-gray-700">All Sections</option>
                {categories.map(cat => <option key={cat} value={cat} className="dark:bg-gray-700">{cat}</option>)}
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
            <div className="text-3xl font-black">₹{selectedTotalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs opacity-70 mt-2 font-medium">
              {Object.keys(selectedItems).length === billingData.summarizedEntries.length
                ? "For all items in selected period"
                : `For ${Object.keys(selectedItems).length} selected items`}
            </p>
          </div>

          <button
            onClick={() => setShowInvoice(true)}
            disabled={Object.keys(selectedItems).length === 0}
            className="mt-6 w-full bg-white text-blue-700 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            <Printer size={18} />
            Generate PDF Invoice
          </button>
        </div>

        {/* Breakdown Card */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="p-5 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Production Breakdown</h3>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full font-bold">
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
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-[10px] uppercase tracking-wider text-gray-400 font-black">
                  <tr>
                    <th className="px-6 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={Object.keys(selectedItems).length === billingData.summarizedEntries.length && billingData.summarizedEntries.length > 0}
                        onChange={toggleAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3">Section</th>
                    <th className="px-6 py-3">Item Name</th>
                    <th className="px-6 py-3 text-right">Quantity</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700 text-sm">
                  {billingData.summarizedEntries.map((entry, idx) => {
                    const uniqueKey = `${entry.category}-${entry.item}`;
                    const isSelected = !!selectedItems[uniqueKey];

                    return (
                      <tr key={idx} className={`transition-colors ${isSelected ? 'bg-blue-50/10' : 'opacity-60 grayscale'}`}>
                        <td className="px-6 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleItem(entry)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-3">
                          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold">
                            {entry.category}
                          </span>
                        </td>
                        <td className="px-6 py-3 font-bold text-gray-700 dark:text-gray-300">{entry.item}</td>
                        <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-400 font-medium">{Number(entry.quantity).toLocaleString('en-IN', { maximumFractionDigits: 3 })}</td>
                        <td className="px-6 py-3 text-right font-black text-gray-800 dark:text-gray-200">₹{(entry.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Recent Billing Activity (Real-time) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
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
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 cursor-pointer transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-white dark:bg-gray-600/50 rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    <Download size={18} />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${activity.status === "Processed" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 animation-pulse"
                    }`}>
                    {activity.status}
                  </span>
                </div>
                <div className="font-black text-gray-800 dark:text-gray-100">{activity.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{activity.date}</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-black text-blue-600 dark:text-blue-400">₹{(activity.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <button className="text-[10px] font-bold text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400">Select & Generate</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-400 dark:text-gray-500 italic bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              No recent billing history found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingView;
