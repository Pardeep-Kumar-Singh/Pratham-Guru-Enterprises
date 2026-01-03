import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  XCircle,
  Search,
  Package,
} from "lucide-react";
import { productMasterData } from "../productMasterData";

const ProductMaster = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState(productMasterData);

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.category || !formData.baseRate) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingItem) {
      // Update existing product - REAL-TIME UPDATE
      setProducts(
        products.map((p) =>
          p.id === editingItem.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Add new product - REAL-TIME ADD
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...formData,
        status: "Active",
      };
      setProducts([...products, newProduct]);
    }
    resetForm();
  };

  const handleEditProduct = (product) => {
    setEditingItem(product);
    setFormData({
      name: product.name,
      category: product.category,
      baseRate: product.baseRate,
    });
    setShowAddForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Delete product - REAL-TIME DELETE
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    // Toggle status - REAL-TIME UPDATE
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Category-wise count (derived, safe)

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Product Master
              </h1>
              <p className="text-sm text-gray-600">
                Manage your product catalog
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Total Products</div>
            <div className="text-2xl font-bold text-gray-800">
              {products.length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {products.filter((p) => p.status === "Active").length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Inactive</div>
            <div className="text-2xl font-bold text-red-600">
              {products.filter((p) => p.status === "Inactive").length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Categories</div>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(products.map((p) => p.category)).size}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-indigo-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={24} className="text-indigo-600" />
              {editingItem ? "Edit Product" : "Add New Product"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Sweater"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category || ""}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Winter Wear"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Base Rate (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.baseRate || ""}
                  onChange={(e) => handleFormChange("baseRate", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 250"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveProduct}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md"
              >
                <Save size={18} />
                {editingItem ? "Update" : "Save"}
              </button>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md"
              >
                <XCircle size={18} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table - REAL-TIME UPDATES */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-indigo-500 to-purple-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                    Base Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-indigo-50 transition"
                    >
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        #{product.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-4 py-3 font-semibold text-indigo-600">
                        ₹{product.baseRate}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                            product.status === "Active"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {product.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              Showing{" "}
              <span className="font-bold">{filteredProducts.length}</span> of{" "}
              <span className="font-bold">{products.length}</span> products
            </div>
            <div className="text-sm font-semibold">
              Total Categories: {new Set(products.map((p) => p.category)).size}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMaster;
