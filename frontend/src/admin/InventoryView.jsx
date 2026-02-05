import React, { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import api from "../api/axios";

const InventoryView = () => {
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/inventory/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch daily production when date changes
  useEffect(() => {
    const fetchProduction = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/inventory/production/${date}`);
        if (response.data && response.data.entries.length > 0) {
          setEntries(response.data.entries.map(e => ({
            ...e,
            tempId: Math.random().toString(36).substr(2, 9)
          })));
        } else {
          // Initial empty row if no data for the date
          setEntries([createNewEntry()]);
        }
      } catch (error) {
        console.error("Error fetching production:", error);
        setEntries([createNewEntry()]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduction();
  }, [date]);

  const createNewEntry = () => ({
    tempId: Math.random().toString(36).substr(2, 9),
    category: "",
    itemName: "",
    uom: "pcs",
    rate: 0,
    qty: 0,
    weight: 0,
    amount: 0
  });

  const addRow = () => {
    setEntries([...entries, createNewEntry()]);
  };

  const removeRow = (tempId) => {
    if (entries.length === 1) {
      setEntries([createNewEntry()]);
    } else {
      setEntries(entries.filter(e => e.tempId !== tempId));
    }
  };

  const handleEntryChange = (tempId, field, value) => {
    const updatedEntries = entries.map(entry => {
      if (entry.tempId === tempId) {
        const updatedEntry = { ...entry, [field]: value };

        // Auto-fill logic when item is selected
        if (field === "itemName") {
          const product = products.find(p => p.name === value);
          if (product) {
            updatedEntry.category = product.category;
            updatedEntry.uom = product.uom;
            updatedEntry.rate = product.baseRate;
            updatedEntry.productId = product.id;
          }
        }

        // Auto-calculate amount
        if (field === "qty" || field === "rate" || field === "itemName") {
          updatedEntry.amount = (updatedEntry.qty || 0) * (updatedEntry.rate || 0);
        }

        return updatedEntry;
      }
      return entry;
    });
    setEntries(updatedEntries);
  };

  const totals = entries.reduce((acc, current) => ({
    qty: acc.qty + (Number(current.qty) || 0),
    weight: acc.weight + (Number(current.weight) || 0),
    amount: acc.amount + (Number(current.amount) || 0)
  }), { qty: 0, weight: 0, amount: 0 });

  const handleSave = async () => {
    const validEntries = entries.filter(e => e.itemName && e.qty > 0);
    if (validEntries.length === 0) {
      alert("No valid entries to save.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/inventory/production", {
        date,
        totalQty: totals.qty,
        totalWeight: totals.weight,
        totalAmount: totals.amount,
        entries: validEntries
      });
      alert("Daily production saved successfully!");
    } catch (error) {
      console.error("Error saving production:", error);
      alert("Error saving production data.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearDay = async () => {
    if (!window.confirm("Are you sure you want to completely clear all production data for this day? This cannot be undone.")) return;

    setLoading(true);
    try {
      await api.delete(`/inventory/production/${date}`);
      setEntries([createNewEntry()]);
      alert("Daily production cleared successfully!");
    } catch (error) {
      console.error("Error clearing production:", error);
      alert("Error clearing production data.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">Daily Production Entry</h2>
          <p className="text-sm text-gray-500 font-medium">Manage and track your daily production efficiently</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
            />
          </div>
          <button
            onClick={handleClearDay}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl font-bold transition-all active:scale-[0.98]"
          >
            <Trash2 size={18} />
            Clear Day
          </button>
          <button
            onClick={addRow}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} />
            Add Row
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center">Category</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center">Item</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center w-24">UOM</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center w-28">Rate</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center w-32">Qty</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center w-32">Weight (kg)</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center w-32">Amount</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-5 py-20 text-center text-gray-400 font-medium italic">
                    Loading production data...
                  </td>
                </tr>
              ) : entries.map((entry) => (
                <tr key={entry.tempId} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-3 py-3">
                    <select
                      value={entry.category}
                      onChange={(e) => handleEntryChange(entry.tempId, 'category', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-3 font-medium">
                    <select
                      value={entry.itemName}
                      onChange={(e) => handleEntryChange(entry.tempId, 'itemName', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    >
                      <option value="">Select Item</option>
                      {products
                        .filter(p => !entry.category || p.category === entry.category)
                        .map(p => <option key={p.id} value={p.name}>{p.name}</option>)
                      }
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={entry.uom}
                      disabled
                      className="w-full bg-gray-50 border border-transparent rounded-lg px-3 py-2 text-sm text-gray-500 text-center"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        value={entry.rate}
                        onChange={(e) => handleEntryChange(entry.tempId, 'rate', Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-right focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      value={entry.qty}
                      onChange={(e) => handleEntryChange(entry.tempId, 'qty', Number(e.target.value))}
                      placeholder="0"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-right focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      step="0.001"
                      value={entry.weight}
                      onChange={(e) => handleEntryChange(entry.tempId, 'weight', Number(e.target.value))}
                      placeholder="0.000"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-right focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className="text-sm font-bold text-indigo-600 pr-2">₹{entry.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => removeRow(entry.tempId)}
                      className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-around gap-6 text-center">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Quantity</p>
          <p className="text-2xl font-black text-gray-800">{totals.qty}</p>
        </div>
        <div className="h-10 w-px bg-gray-100 hidden sm:block"></div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Weight</p>
          <p className="text-2xl font-black text-gray-800">{totals.weight.toFixed(3)} kg</p>
        </div>
        <div className="h-10 w-px bg-gray-100 hidden sm:block"></div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
          <p className="text-2xl font-black text-indigo-600">₹{totals.amount.toLocaleString()}</p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3.5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Save size={20} />
          {loading ? "Saving..." : "Save Daily Production"}
        </button>
      </div>
    </div>
  );
};

export default InventoryView;
