import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, Layers, Loader2, Package, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const VariantMaster = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/inventory/products');
      setProducts(response.data);
      if (response.data.length > 0) {
        handleProductSelect(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductSelect = async (product) => {
    setSelectedProduct(product);
    setLoading(true);
    try {
      const response = await api.get(`/products/${product.id}/variants`);
      setVariants(response.data);
    } catch (error) {
      console.error('Error fetching variants:', error);
      setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveVariant = async () => {
    if (!formData.name || !formData.baseRate) {
      alert('Please fill all required fields!');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        productId: selectedProduct.id,
        baseRate: parseFloat(formData.baseRate)
      };

      if (editingItem) {
        // Update logic (to be added to controller if needed)
        alert("Update functionality coming soon");
      } else {
        await api.post('/variants', payload);
      }
      handleProductSelect(selectedProduct);
      resetForm();
    } catch (error) {
      console.error('Error saving variant:', error);
      alert(error.response?.data?.detail || 'Error saving variant');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVariant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this variant?")) return;
    setLoading(true);
    try {
      await api.delete(`/variants/${id}`);
      handleProductSelect(selectedProduct);
    } catch (error) {
      console.error('Error deleting variant:', error);
      alert(error.response?.data?.detail || 'Error deleting variant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin?tab=users')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors mr-2"
              title="Back to Dashboard"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Variant Master</h1>
              <p className="text-sm text-gray-600 font-medium">Manage product-specific variants and attributes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 px-2">
              <Package size={18} className="text-purple-600" />
              Select Product
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProductSelect(p)}
                  className={`w-full text-left px-6 py-4 transition-all hover:bg-purple-50 flex items-center justify-between group ${selectedProduct?.id === p.id ? 'bg-purple-50 border-r-4 border-purple-600' : ''
                    }`}
                >
                  <div>
                    <div className={`font-bold ${selectedProduct?.id === p.id ? 'text-purple-700' : 'text-gray-800'}`}>
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{p.category}</div>
                  </div>
                  <Layers className={`opacity-0 group-hover:opacity-100 transition-all ${selectedProduct?.id === p.id ? 'opacity-100 text-purple-600' : 'text-gray-300'}`} size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Variants Content */}
          <div className="lg:col-span-2">
            {!selectedProduct ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
                <Package size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-medium italic">Please select a product from the sidebar to view variants</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    Variants for <span className="text-purple-600">{selectedProduct.name}</span>
                  </h2>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-purple-100 transition-all active:scale-95"
                  >
                    <Plus size={18} />
                    Add Variant
                  </button>
                </div>

                {showAddForm && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 animate-in slide-in-from-top duration-300">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                      New Variant Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Variant Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => handleFormChange('name', e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                          placeholder="e.g., Red / LG"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Base Rate (₹) <span className="text-red-500">*</span></label>
                        <input
                          type="number"
                          value={formData.baseRate || ''}
                          onChange={(e) => handleFormChange('baseRate', e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end border-t pt-6">
                      <button onClick={resetForm} className="px-6 py-2.5 text-gray-500 font-bold">Cancel</button>
                      <button
                        onClick={handleSaveVariant}
                        className="bg-purple-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg active:scale-95 disabled:bg-gray-300"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Save Variant'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-purple-600 text-white">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Variant Name</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Base Rate</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="3" className="px-6 py-12 text-center">
                            <Loader2 className="animate-spin mx-auto text-purple-500" size={32} />
                          </td>
                        </tr>
                      ) : variants.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                            No variants found for this product.
                          </td>
                        </tr>
                      ) : (
                        variants.map((v) => (
                          <tr key={v.id} className="hover:bg-purple-50 transition-colors group">
                            <td className="px-6 py-4 font-bold text-gray-800">{v.name}</td>
                            <td className="px-6 py-4 font-bold text-purple-600">₹{v.baseRate}</td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button className="p-2 text-gray-400 hover:text-purple-600 rounded-lg"><Edit2 size={16} /></button>
                                <button
                                  onClick={() => handleDeleteVariant(v.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantMaster;
