import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, DollarSign, Calculator } from 'lucide-react';

const RateConfiguration = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});

  // Sample products and variants for dropdowns
  const products = ['Sweater', 'Shawl', 'Cap', 'Scarf', 'Gloves'];
  
  const variantsByProduct = {
    'Sweater': ['Medium - Red', 'Large - Blue', 'Small - Green'],
    'Shawl': ['Standard - Brown', 'Large - Black'],
    'Cap': ['Small - Black', 'Medium - Grey'],
    'Scarf': ['Long - White', 'Short - Red'],
    'Gloves': ['Medium - Black', 'Large - Brown']
  };

  const [rates, setRates] = useState([
    { 
      id: 1, 
      product: 'Sweater', 
      variant: 'Medium - Red', 
      woolCost: '150', 
      golaMaking: '50', 
      artisanRate: '120', 
      sellingPrice: '350',
      status: 'Active' 
    },
    { 
      id: 2, 
      product: 'Sweater', 
      variant: 'Large - Blue', 
      woolCost: '180', 
      golaMaking: '60', 
      artisanRate: '140', 
      sellingPrice: '420',
      status: 'Active' 
    },
    { 
      id: 3, 
      product: 'Shawl', 
      variant: 'Standard - Brown', 
      woolCost: '200', 
      golaMaking: '80', 
      artisanRate: '200', 
      sellingPrice: '550',
      status: 'Active' 
    },
    { 
      id: 4, 
      product: 'Cap', 
      variant: 'Small - Black', 
      woolCost: '80', 
      golaMaking: '30', 
      artisanRate: '60', 
      sellingPrice: '200',
      status: 'Active' 
    },
  ]);

  const handleFormChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    
    // Auto-calculate profit margin when rates change
    if (['woolCost', 'golaMaking', 'artisanRate', 'sellingPrice'].includes(field)) {
      const wool = parseFloat(newFormData.woolCost || 0);
      const gola = parseFloat(newFormData.golaMaking || 0);
      const artisan = parseFloat(newFormData.artisanRate || 0);
      const selling = parseFloat(newFormData.sellingPrice || 0);
      
      const totalCost = wool + gola + artisan;
      const profit = selling - totalCost;
      const margin = selling > 0 ? ((profit / selling) * 100).toFixed(2) : 0;
      
      newFormData.totalCost = totalCost;
      newFormData.profit = profit;
      newFormData.profitMargin = margin;
    }
    
    setFormData(newFormData);
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveRate = () => {
    if (!formData.product || !formData.variant || !formData.woolCost || !formData.golaMaking || !formData.artisanRate || !formData.sellingPrice) {
      alert('Please fill all required fields!');
      return;
    }

    const selling = parseFloat(formData.sellingPrice);
    const totalCost = parseFloat(formData.woolCost) + parseFloat(formData.golaMaking) + parseFloat(formData.artisanRate);
    
    if (selling < totalCost) {
      if (!window.confirm('Warning: Selling price is less than total cost. This will result in a loss. Continue?')) {
        return;
      }
    }

    if (editingItem) {
      // Update existing rate
      setRates(rates.map(r => 
        r.id === editingItem.id 
          ? { ...r, ...formData }
          : r
      ));
    } else {
      // Add new rate
      const newRate = {
        id: Math.max(...rates.map(r => r.id), 0) + 1,
        ...formData,
        status: 'Active'
      };
      setRates([...rates, newRate]);
    }
    resetForm();
  };

  const handleEditRate = (rate) => {
    setEditingItem(rate);
    const wool = parseFloat(rate.woolCost);
    const gola = parseFloat(rate.golaMaking);
    const artisan = parseFloat(rate.artisanRate);
    const selling = parseFloat(rate.sellingPrice);
    const totalCost = wool + gola + artisan;
    const profit = selling - totalCost;
    const margin = ((profit / selling) * 100).toFixed(2);
    
    setFormData({
      product: rate.product,
      variant: rate.variant,
      woolCost: rate.woolCost,
      golaMaking: rate.golaMaking,
      artisanRate: rate.artisanRate,
      sellingPrice: rate.sellingPrice,
      totalCost: totalCost,
      profit: profit,
      profitMargin: margin
    });
    setShowAddForm(true);
  };

  const handleDeleteRate = (id) => {
    if (window.confirm('Are you sure you want to delete this rate configuration?')) {
      setRates(rates.filter(r => r.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setRates(rates.map(r => 
      r.id === id 
        ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' }
        : r
    ));
  };

  const calculateTotals = (rate) => {
    const wool = parseFloat(rate.woolCost);
    const gola = parseFloat(rate.golaMaking);
    const artisan = parseFloat(rate.artisanRate);
    const selling = parseFloat(rate.sellingPrice);
    const totalCost = wool + gola + artisan;
    const profit = selling - totalCost;
    const margin = ((profit / selling) * 100).toFixed(2);
    
    return { totalCost, profit, margin };
  };

  const filteredRates = rates.filter(rate =>
    rate.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.variant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = rates.reduce((sum, r) => sum + parseFloat(r.sellingPrice), 0);
  const averageMargin = rates.length > 0 
    ? (rates.reduce((sum, r) => {
        const { margin } = calculateTotals(r);
        return sum + parseFloat(margin);
      }, 0) / rates.length).toFixed(2)
    : 0;

  const getVariantsForProduct = (product) => {
    return variantsByProduct[product] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Rate Configuration</h1>
              <p className="text-sm text-gray-600">Configure pricing and cost structure</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Total Rates</div>
            <div className="text-2xl font-bold text-gray-800">{rates.length}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {rates.filter(r => r.status === 'Active').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Avg Margin</div>
            <div className="text-2xl font-bold text-blue-600">{averageMargin}%</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-orange-600">₹{totalRevenue}</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search rates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-linera-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
            >
              <Plus size={20} />
              Add Rate
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator size={24} className="text-orange-600" />
              {editingItem ? 'Edit Rate Configuration' : 'Add New Rate Configuration'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.product || ''}
                  onChange={(e) => {
                    handleFormChange('product', e.target.value);
                    handleFormChange('variant', ''); // Reset variant when product changes
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Product</option>
                  {products.map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Variant <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.variant || ''}
                  onChange={(e) => handleFormChange('variant', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={!formData.product}
                >
                  <option value="">Select Variant</option>
                  {formData.product && getVariantsForProduct(formData.product).map((variant, idx) => (
                    <option key={idx} value={variant}>{variant}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wool Cost (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.woolCost || ''}
                  onChange={(e) => handleFormChange('woolCost', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 150"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gola Making (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.golaMaking || ''}
                  onChange={(e) => handleFormChange('golaMaking', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Artisan Rate (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.artisanRate || ''}
                  onChange={(e) => handleFormChange('artisanRate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 120"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selling Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.sellingPrice || ''}
                  onChange={(e) => handleFormChange('sellingPrice', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 350"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            {formData.woolCost && formData.golaMaking && formData.artisanRate && formData.sellingPrice && (
              <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-6 border border-orange-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Calculator size={18} />
                  Calculation Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-600">Total Cost</div>
                    <div className="text-lg font-bold text-gray-800">₹{formData.totalCost || 0}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Profit</div>
                    <div className={`text-lg font-bold ${(formData.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{formData.profit || 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Profit Margin</div>
                    <div className={`text-lg font-bold ${(formData.profitMargin || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formData.profitMargin || 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Status</div>
                    <div className={`text-sm font-bold ${(formData.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(formData.profit || 0) >= 0 ? '✓ Profitable' : '✗ Loss'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSaveRate}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md"
              >
                <Save size={18} />
                {editingItem ? 'Update' : 'Save'}
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

        {/* Rates Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-linear-to-r from-orange-500 to-amber-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Variant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Wool</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Gola</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Artisan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Total Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Selling</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Profit</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Margin</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRates.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="px-4 py-8 text-center text-gray-500">
                      No rate configurations found. Add your first rate!
                    </td>
                  </tr>
                ) : (
                  filteredRates.map((rate) => {
                    const { totalCost, profit, margin } = calculateTotals(rate);
                    return (
                      <tr key={rate.id} className="hover:bg-orange-50 transition">
                        <td className="px-4 py-3 font-semibold text-gray-800">#{rate.id}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{rate.product}</td>
                        <td className="px-4 py-3 text-gray-600">{rate.variant}</td>
                        <td className="px-4 py-3 text-gray-600">₹{rate.woolCost}</td>
                        <td className="px-4 py-3 text-gray-600">₹{rate.golaMaking}</td>
                        <td className="px-4 py-3 text-gray-600">₹{rate.artisanRate}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">₹{totalCost}</td>
                        <td className="px-4 py-3 font-bold text-orange-600">₹{rate.sellingPrice}</td>
                        <td className={`px-4 py-3 font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{profit}
                        </td>
                        <td className={`px-4 py-3 font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {margin}%
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleStatus(rate.id)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                              rate.status === 'Active'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {rate.status}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditRate(rate)}
                              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteRate(rate.id)}
                              className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-linear-to-r from-orange-500 to-amber-600 rounded-xl shadow-md p-4 text-white">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm">
              Showing <span className="font-bold">{filteredRates.length}</span> of <span className="font-bold">{rates.length}</span> rate configurations
            </div>
            <div className="text-sm font-semibold">
              Average Margin: {averageMargin}% | Total Revenue: ₹{totalRevenue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateConfiguration;