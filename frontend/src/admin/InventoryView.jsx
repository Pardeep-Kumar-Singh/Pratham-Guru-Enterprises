import React, { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import api from "../api/axios";

// Reusable Table Component
const EntryTable = ({ entries, setEntries, products, categories, title }) => {
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

  const removeRow = (tempId) => {
    if (entries.length === 1) {
      // If clearing the last row, reset it instead of removing
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
      setEntries([createNewEntry()]);
    } else {
      setEntries(entries.filter(e => e.tempId !== tempId));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
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
                <td className="px-4 py-2 text-center text-sm font-bold">₹{Number(entry.amount || 0).toFixed(2)}</td>
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
  );
};

const InventoryView = () => {
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Production State
  const [productionEntries, setProductionEntries] = useState([]);
  const [productionWeight, setProductionWeight] = useState(0);

  // Alter State
  const [alterEntries, setAlterEntries] = useState([]);
  const [alterWeight, setAlterWeight] = useState(0);

  const [loading, setLoading] = useState(false);

  // Helpers
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

  // Fetch Data (Production + Alter)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Production
        const prodRes = await api.get(`/inventory/production/${date}`);
        if (prodRes.data && prodRes.data.entries.length > 0) {
          setProductionEntries(prodRes.data.entries.map(e => ({ ...e, tempId: Math.random().toString(36).substr(2, 9) })));
          setProductionWeight(prodRes.data.totalWeight || 0);
        } else {
          setProductionEntries([createNewEntry()]);
          setProductionWeight(0);
        }

        // Fetch Alter
        const alterRes = await api.get(`/inventory/alter/${date}`);
        if (alterRes.data && alterRes.data.entries.length > 0) {
          setAlterEntries(alterRes.data.entries.map(e => ({ ...e, tempId: Math.random().toString(36).substr(2, 9) })));
          setAlterWeight(alterRes.data.totalWeight || 0);
        } else {
          setAlterEntries([createNewEntry()]);
          setAlterWeight(0);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        setProductionEntries([createNewEntry()]);
        setAlterEntries([createNewEntry()]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);


  const addRow = (setter, currentEntries) => {
    setter([...currentEntries, createNewEntry()]);
  };

  // derived production totals
  const totalProdQty = productionEntries.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0);
  const totalProdAmount = productionEntries.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // derived alter totals
  const totalAlterQty = alterEntries.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0);
  const totalAlterAmount = alterEntries.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // NET TOTALS
  const netQty = totalProdQty - totalAlterQty;
  const netWeight = (Number(productionWeight) || 0) - (Number(alterWeight) || 0);
  const netAmount = totalProdAmount - totalAlterAmount;

  const handleSaveProduction = async () => {
    const validEntries = productionEntries.filter(e => e.itemName && e.qty > 0);
    if (validEntries.length === 0) {
      if (!confirm("No valid production entries. Clear production data for this day?")) return;
    }

    setLoading(true);
    try {
      await api.post("/inventory/production", {
        date,
        totalQty: totalProdQty,
        totalWeight: Number(productionWeight),
        totalAmount: totalProdAmount,
        entries: validEntries
      });
      alert("Production saved!");
    } catch (error) {
      console.error("Error saving production:", error);
      alert("Error saving production.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAlter = async () => {
    const validEntries = alterEntries.filter(e => e.itemName && e.qty > 0);
    if (validEntries.length === 0) {
      if (!confirm("No valid alter entries. Clear alter data for this day?")) return;
    }

    setLoading(true);
    try {
      await api.post("/inventory/alter", {
        date,
        totalQty: totalAlterQty,
        totalWeight: Number(alterWeight),
        totalAmount: totalAlterAmount,
        entries: validEntries
      });
      alert("Alter entry saved!");
    } catch (error) {
      console.error("Error saving alter:", error);
      alert("Error saving alter.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 pb-20">

      {/* Date Picker Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* --- PRODUCTION SECTION --- */}
      <section className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
              Daily Production Entry
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Addition (+)</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="number"
                value={productionWeight}
                onChange={(e) => setProductionWeight(e.target.value)}
                placeholder="Total Weight"
                className="border border-indigo-200 rounded-lg px-3 py-2 w-40 text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-400">kg</span>
            </div>
            <button
              onClick={() => addRow(setProductionEntries, productionEntries)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> Add Row
            </button>
            <button
              onClick={handleSaveProduction}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Save size={16} /> Save Production
            </button>
          </div>
        </div>

        <EntryTable
          entries={productionEntries}
          setEntries={setProductionEntries}
          products={products}
          categories={categories}
          title="Production Items"
        />
      </section>

      {/* --- ALTER SECTION --- */}
      <section className="bg-white rounded-xl shadow-lg border border-red-100 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
              Daily Alter Entry
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Deduction (-)</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="number"
                value={alterWeight}
                onChange={(e) => setAlterWeight(e.target.value)}
                placeholder="Total Weight"
                className="border border-red-200 rounded-lg px-3 py-2 w-40 text-sm focus:ring-2 focus:ring-red-500"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-400">kg</span>
            </div>
            <button
              onClick={() => addRow(setAlterEntries, alterEntries)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> Add Row
            </button>
            <button
              onClick={handleSaveAlter}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Save size={16} /> Save Alter
            </button>
          </div>
        </div>

        <EntryTable
          entries={alterEntries}
          setEntries={setAlterEntries}
          products={products}
          categories={categories}
          title="Alter / Defective Items"
        />
      </section>

      {/* --- SUMMARY FOOTER --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 font-medium text-sm uppercase">Net Daily Summary</h3>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-xs text-gray-400">Net Quantity</p>
              <p className="text-xl font-bold text-gray-800">{Number(netQty).toLocaleString('en-IN', { maximumFractionDigits: 3 })} <span className="text-sm font-normal text-gray-500">PCS</span></p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Net Weight</p>
              <p className="text-xl font-bold text-gray-800">{netWeight.toFixed(2)} <span className="text-sm font-normal text-gray-500">kg</span></p>
            </div>
            <div className="text-center border-l border-gray-200 pl-8">
              <p className="text-xs text-gray-400">Net Value</p>
              <p className="text-2xl font-bold text-indigo-600">₹{netAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InventoryView;
