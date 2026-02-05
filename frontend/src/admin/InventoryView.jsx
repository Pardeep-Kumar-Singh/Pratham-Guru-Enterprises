
import React, { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import api from "../api/axios";

const InventoryView = () => {
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [entries, setEntries] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0); // Added state for manual total weight
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
        if (response.data) {
          setTotalWeight(response.data.totalWeight || 0); // Set total weight
          if (response.data.entries.length > 0) {
            setEntries(response.data.entries.map(e => ({
              ...e,
              tempId: Math.random().toString(36).substr(2, 9)
            })));
          } else {
            setEntries([createNewEntry()]);
          }
        } else {
          setEntries([createNewEntry()]);
          setTotalWeight(0);
        }
      } catch (error) {
        console.error("Error fetching production:", error);
        setEntries([createNewEntry()]);
        setTotalWeight(0);
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
    weight: 0, // Kept for schema compatibility but hidden in UI
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

  // derived totals
  const totalQty = entries.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0);
  const totalAmount = entries.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const handleSave = async () => {
    const validEntries = entries.filter(e => e.itemName && e.qty > 0);

    // If no valid entries, we should essentially perform a "Clear Day" or save empty list
    // This allows the user to delete the last row and save changes.
    if (validEntries.length === 0) {
      if (confirm("No valid entries found. Do you want to clear all production data for this day?")) {
        // Proceed to save with empty list (which clears entries in backend)
      } else {
        return;
      }
    }

    setLoading(true);
    try {
      await api.post("/inventory/production", {
        date,
        totalQty: totalQty,
        totalWeight: Number(totalWeight),
        totalAmount: totalAmount,
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

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Production Entry</h2>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <input
              type="number"
              value={totalWeight}
              onChange={(e) => setTotalWeight(e.target.value)}
              placeholder="Total Production Weight"
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-56 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></span>
            {/* Added a placeholder-like label if needed, but placeholder matches image */}
          </div>

          <button
            onClick={addRow}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Add Row
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-center w-1/5">Category</th>
                <th className="px-4 py-3 text-sm font-semibold text-center w-1/5">Item</th>
                <th className="px-4 py-3 text-sm font-semibold text-center w-24">UOM</th>
                <th className="px-4 py-3 text-sm font-semibold text-center w-32">Rate</th>
                <th className="px-4 py-3 text-sm font-semibold text-center w-1/3">Quantity</th>
                <th className="px-4 py-3 text-sm font-semibold text-center w-32">Amount</th>
                <th className="px-4 py-3 text-sm font-semibold text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map((entry) => (
                <tr key={entry.tempId} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <select
                      value={entry.category}
                      onChange={(e) => handleEntryChange(entry.tempId, 'category', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                    >
                      <option value="">Select</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={entry.itemName}
                      onChange={(e) => handleEntryChange(entry.tempId, 'itemName', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-indigo-500"
                    >
                      <option value="">Select</option>
                      {products
                        .filter(p => !entry.category || p.category === entry.category)
                        .map(p => <option key={p.id} value={p.name}>{p.name}</option>)
                      }
                    </select>
                  </td>
                  <td className="px-4 py-2 text-center text-sm font-medium">{entry.uom || 'PCS'}</td>
                  <td className="px-4 py-2 text-center text-sm font-medium">₹{entry.rate}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={entry.qty}
                      onChange={(e) => handleEntryChange(entry.tempId, 'qty', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-right outline-none focus:border-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-center text-sm font-bold">₹{entry.amount}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => removeRow(entry.tempId)}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded transition-colors"
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

      {/* Totals & Save */}
      <div className="flex flex-col items-end gap-6">
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Quantity: {totalQty} PCS</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Weight: {Number(totalWeight).toFixed(2)} kg</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Amount: ₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-medium shadow-md transition-colors"
        >
          Save Daily Production
        </button>
      </div>
    </div>
  );
};

export default InventoryView;
