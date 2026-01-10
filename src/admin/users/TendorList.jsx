import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, Users, Phone, Mail, MapPin } from 'lucide-react';

const TendorList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});

  const [tendors, setTendors] = useState([
    { id: 1, name: 'Rajesh Kumar', mobile: '9876543210', email: 'rajesh@email.com', area: 'Panipat', status: 'Active' },
    { id: 2, name: 'Amit Shah', mobile: '9876543211', email: 'amit@email.com', area: 'Karnal', status: 'Active' },
    { id: 3, name: 'Priya Singh', mobile: '9876543212', email: 'priya@email.com', area: 'Sonipat', status: 'Active' },
    { id: 4, name: 'Vikram Patel', mobile: '9876543213', email: 'vikram@email.com', area: 'Rohtak', status: 'Inactive' },
    { id: 5, name: 'Sunita Devi', mobile: '9876543214', email: 'sunita@email.com', area: 'Panipat', status: 'Active' },
  ]);

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveTendor = () => {
    if (!formData.name || !formData.mobile) {
      alert('Please fill all required fields (Name and Mobile)!');
      return;
    }

    // Validate mobile number (10 digits)
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      alert('Please enter a valid 10-digit mobile number!');
      return;
    }

    // Validate email if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if (editingItem) {
      // Update existing tendor - REAL-TIME UPDATE
      setTendors(tendors.map(t => 
        t.id === editingItem.id 
          ? { ...t, ...formData }
          : t
      ));
    } else {
      // Add new tendor - REAL-TIME ADD
      const newTendor = {
        id: Math.max(...tendors.map(t => t.id), 0) + 1,
        ...formData,
        status: 'Active'
      };
      setTendors([...tendors, newTendor]);
    }
    resetForm();
  };

  const handleEditTendor = (tendor) => {
    setEditingItem(tendor);
    setFormData({
      name: tendor.name,
      mobile: tendor.mobile,
      email: tendor.email,
      area: tendor.area
    });
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTendor = (id) => {
    if (window.confirm('Are you sure you want to delete this tendor?')) {
      // Delete tendor - REAL-TIME DELETE
      setTendors(tendors.filter(t => t.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    // Toggle status - REAL-TIME UPDATE
    setTendors(tendors.map(t => 
      t.id === id 
        ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' }
        : t
    ));
  };

  const filteredTendors = tendors.filter(tendor =>
    tendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tendor.mobile.includes(searchTerm) ||
    tendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tendor.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAreaCount = (area) => {
    return tendors.filter(t => t.area === area && t.status === 'Active').length;
  };

  const uniqueAreas = [...new Set(tendors.map(t => t.area))];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Tendor Management</h1>
              <p className="text-sm text-gray-600">Manage tendor accounts and information</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Total Tendors</div>
            <div className="text-2xl font-bold text-gray-800">{tendors.length}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {tendors.filter(t => t.status === 'Active').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Inactive</div>
            <div className="text-2xl font-bold text-red-600">
              {tendors.filter(t => t.status === 'Inactive').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Areas Covered</div>
            <div className="text-2xl font-bold text-blue-600">
              {uniqueAreas.length}
            </div>
          </div>
        </div>

        {/* Area-wise Tendor Distribution */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin size={18} />
            Active Tendors by Area
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {uniqueAreas.map((area, idx) => (
              <div key={idx} className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="text-sm font-semibold text-gray-800">{area}</div>
                <div className="text-xl font-bold text-blue-600">{getAreaCount(area)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, mobile, email or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
            >
              <Plus size={20} />
              Add Tendor
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={24} className="text-blue-600" />
              {editingItem ? 'Edit Tendor' : 'Add New Tendor'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Rajesh Kumar"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={formData.mobile || ''}
                    onChange={(e) => handleFormChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10-digit mobile"
                    maxLength="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., rajesh@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Area/Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => handleFormChange('area', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Panipat"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveTendor}
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

        {/* Tendors Table - Desktop View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Area</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTendors.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No tendors found. Add your first tendor!
                    </td>
                  </tr>
                ) : (
                  filteredTendors.map((tendor) => (
                    <tr key={tendor.id} className="hover:bg-blue-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-800">#{tendor.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{tendor.name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          {tendor.mobile}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" />
                          {tendor.email}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin size={14} className="text-gray-400" />
                          {tendor.area}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleStatus(tendor.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                            tendor.status === 'Active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {tendor.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditTendor(tendor)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTendor(tendor.id)}
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

        {/* Tendors Cards - Mobile/Tablet View */}
        <div className="lg:hidden space-y-4">
          {filteredTendors.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
              No tendors found. Add your first tendor!
            </div>
          ) : (
            filteredTendors.map((tendor) => (
              <div key={tendor.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">#{tendor.id}</span>
                      <button
                        onClick={() => handleToggleStatus(tendor.id)}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tendor.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {tendor.status}
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{tendor.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTendor(tendor)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTendor(tendor.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span>{tendor.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span>{tendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{tendor.area}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-md p-4 text-white">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm">
              Showing <span className="font-bold">{filteredTendors.length}</span> of <span className="font-bold">{tendors.length}</span> tendors
            </div>
            <div className="text-sm font-semibold">
              Active: {tendors.filter(t => t.status === 'Active').length} | Areas: {uniqueAreas.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TendorList;