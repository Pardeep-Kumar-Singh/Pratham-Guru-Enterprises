import React, { useState } from "react";
import { productMasterData } from "./productMasterData";
import { Trash2 } from "lucide-react";

const InventoryView = () => {
  /* ✅ Only Active Products */
  const activeProducts = productMasterData.filter((p) => p.status === "Active");

  /* ✅ Unique Categories (count once) */
  const categories = [...new Set(activeProducts.map((p) => p.category))];

  /* 🔹 Inventory State */
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    item: "",
    baseRate: "",
    quantity: "",
  });

  const itemsByCategory = activeProducts.filter(
    (p) => p.category === form.category
  );

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleItemSelect = (itemName) => {
    const selected = activeProducts.find((p) => p.name === itemName);
    setForm({
      ...form,
      item: selected.name,
      baseRate: selected.baseRate,
    });
  };

  const handleAddEntry = () => {
    if (!form.category || !form.item || !form.quantity) {
      alert("Please fill all required fields");
      return;
    }

    setEntries([...entries, { id: entries.length + 1, ...form }]);

    setForm({
      ...form,
      item: "",
      baseRate: "",
      quantity: "",
    });
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Day-wise Inventory Entry */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Day-wise Client Inventory Entry
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={form.item}
            onChange={(e) => handleItemSelect(e.target.value)}
            disabled={!form.category}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Item</option>
            {itemsByCategory.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={form.baseRate}
            disabled
            className="border rounded-lg px-3 py-2 bg-gray-100"
            placeholder="Base Rate"
          />

          <input
            type="number"
            value={form.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="border rounded-lg px-3 py-2"
            placeholder="Quantity"
          />
        </div>

        <button
          onClick={handleAddEntry}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add Entry
        </button>
      </div>

      {/* Entries Table */}
      {entries.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-linear-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                  Item
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                  Base Rate
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                  Quantity
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No inventory entries yet.
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr key={e.id} className="hover:bg-indigo-50 transition">
                    <td className="px-4 py-3 text-center font-semibold text-gray-800">
                      {e.date}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {e.category}
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-gray-800">
                      {e.item}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-indigo-600">
                      ₹{e.baseRate}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-gray-800">
                      {e.quantity}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDeleteEntry(e.id)}
                        className="inline-flex items-center justify-center p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                        title="Delete Entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
