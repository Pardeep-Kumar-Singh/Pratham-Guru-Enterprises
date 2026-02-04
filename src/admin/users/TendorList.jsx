import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, Users, Mail, Loader2, ArrowLeft, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const TendorList = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});
  const [tendors, setTendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTendors();
  }, []);

  const fetchTendors = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/role/tendor');
      setTendors(response.data);
    } catch (error) {
      console.error('Error fetching tendors:', error);
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

  const handleSaveTendor = async () => {
    if (!formData.username || (!editingItem && !formData.password)) {
      alert('Please fill all required fields!');
      return;
    }

    setLoading(true);
    try {
      if (editingItem) {
        alert("Update functionality coming soon");
      } else {
        await api.post('/users/with-role', {
          ...formData,
          role: 'tendor'
        });
        fetchTendors();
      }
      resetForm();
    } catch (error) {
      console.error('Error saving tendor:', error);
      alert(error.response?.data?.detail || 'Error saving tendor');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTendor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tendor account?")) return;
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      fetchTendors();
    } catch (error) {
      console.error('Error deleting tendor:', error);
      alert(error.response?.data?.detail || 'Error deleting tendor');
    } finally {
      setLoading(false);
    }
  };

  const filteredTendors = tendors.filter(tendor =>
    tendor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tendor.email && tendor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tendor.mobile && tendor.mobile.includes(searchTerm)) ||
    (tendor.area && tendor.area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Tendor Management</h1>
              <p className="text-sm text-gray-600 font-medium">Manage tendor accounts and information</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={20} />
            Add Tendor
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by username, email, mobile or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-100 animate-in slide-in-from-top duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Plus className="text-blue-600" size={24} />
              {editingItem ? 'Edit Tendor' : 'Create New Tendor Account'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Username <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.username || ''}
                  onChange={(e) => handleFormChange('username', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="john_doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={formData.mobile || ''}
                    onChange={(e) => handleFormChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Area / Territory</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => handleFormChange('area', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. North Zone"
                  />
                </div>
              </div>

              {!editingItem && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Password <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => handleFormChange('password', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end border-t pt-6">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTendor}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {editingItem ? 'Update Tendor' : 'Create Tendor'}
              </button>
            </div>
          </div>
        )}

        {/* Tendors Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Username</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Area</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && tendors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-blue-500" size={32} />
                      <p className="mt-2 text-gray-400 font-medium">Fetching accounts...</p>
                    </td>
                  </tr>
                ) : filteredTendors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                      No tendor accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredTendors.map((tendor) => (
                    <tr key={tendor.id} className="hover:bg-blue-50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-gray-800">{tendor.username}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-700">{tendor.mobile || 'No Mobile'}</div>
                        <div className="text-xs text-gray-400">{tendor.email || 'No Email'}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{tendor.area || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(tendor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleDeleteTendor(tendor.id)}
                            className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg"
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
      </div>
    </div>
  );
};

export default TendorList;