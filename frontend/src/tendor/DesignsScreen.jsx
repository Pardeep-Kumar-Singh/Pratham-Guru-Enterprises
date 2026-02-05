
import React, { useState, useEffect } from "react";
import api from "../api/axios";

const DesignsScreen = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    category: "",
    name: "",
    baseRate: "",
    status: "Active",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/inventory/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  /* ===============================
     ADD / UPDATE PRODUCT
  =============================== */
  const handleSave = async () => {
    if (!form.category || !form.name || !form.baseRate) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        // ✅ UPDATE
        await api.put(`/products/${editId}`, form);
        setProducts(products.map((p) => (p.id === editId ? { ...p, ...form } : p)));
      } else {
        // ✅ ADD
        const response = await api.post('/inventory/products', form);
        setProducts([response.data, ...products]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product", error);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setForm({
      category: product.category,
      name: product.name,
      baseRate: product.baseRate,
      status: product.status
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      category: "",
      name: "",
      baseRate: "",
      status: "Active",
    });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Designs & Product Types
        </h2>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Base Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase">
                  Action
                </th>
              </tr>

              {/* ✅ ADD / EDIT FORM ROW */}
              {showForm && (
                <tr className="bg-blue-50">
                  <th className="px-6 py-2">
                    <input
                      value={form.id}
                      disabled={!!editId}
                      onChange={(e) => handleChange("id", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                      placeholder="ID"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input
                      value={form.category}
                      onChange={(e) =>
                        handleChange("category", e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full text-sm"
                      placeholder="Category"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="border rounded px-2 py-1 w-full text-sm"
                      placeholder="Product Name"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input
                      type="number"
                      value={form.baseRate}
                      onChange={(e) =>
                        handleChange("baseRate", e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full text-sm"
                      placeholder="Rate"
                    />
                  </th>
                  <th className="px-6 py-2">
                    <select
                      value={form.status}
                      onChange={(e) =>
                        handleChange("status", e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </th>
                  <th className="px-6 py-2 text-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold"
                    >
                      {editId ? "Update" : "Save"}
                    </button>
                    <button
                      onClick={resetForm}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </th>
                </tr>
              )}
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                    ₹{item.baseRate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default DesignsScreen;
