import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, Users, Phone, Mail, MapPin, Briefcase, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const CoordinatorList = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/role/coordinator');
      setCoordinators(response.data);
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    } finally {
      setLoading(false);
    }
  };

  const territories = ['North', 'South', 'East', 'West', 'Central'];

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveCoordinator = async () => {
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
          role: 'coordinator'
        });
      }
      fetchCoordinators();
      resetForm();
    } catch (error) {
      console.error('Error saving coordinator:', error);
      alert(error.response?.data?.detail || 'Error saving coordinator');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoordinator = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coordinator?")) return;
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      fetchCoordinators();
    } catch (error) {
      console.error('Error deleting coordinator:', error);
      alert(error.response?.data?.detail || 'Error deleting coordinator');
    } finally {
      setLoading(false);
    }
  };

  const filteredCoordinators = coordinators.filter(coordinator =>
    coordinator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (coordinator.email && coordinator.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (coordinator.mobile && coordinator.mobile.includes(searchTerm)) ||
    (coordinator.area && coordinator.area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate('/admin?tab=users')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors mr-2 text-gray-600"
              title="Back to Dashboard"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Coordinator Management</h1>
              <p className="text-sm text-gray-600 font-medium">Manage coordinator accounts and territories</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by username, email, mobile or territory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              <Plus size={20} />
              Add Coordinator
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-green-100 animate-in slide-in-from-top duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users size={24} className="text-green-600" />
              {editingItem ? 'Edit Coordinator' : 'Add New Coordinator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Username <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.username || ''}
                  onChange={(e) => handleFormChange('username', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  placeholder="e.g., vishal_coordinator"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    placeholder="e.g., vishal@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile || ''}
                  onChange={(e) => handleFormChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  placeholder="10-digit mobile"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Territory / Area</label>
                <select
                  value={formData.area || ''}
                  onChange={(e) => handleFormChange('area', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none"
                >
                  <option value="">Select Territory</option>
                  {territories.map((territory, idx) => (
                    <option key={idx} value={territory}>{territory}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => handleFormChange('password', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t pt-6">
              <button
                onClick={resetForm}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCoordinator}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-green-100 transition-all disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {editingItem ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Coordinator</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Territory</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && coordinators.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-green-500" size={32} />
                      <p className="mt-2 text-gray-400 font-medium">Fetching accounts...</p>
                    </td>
                  </tr>
                ) : filteredCoordinators.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                      No coordinators found.
                    </td>
                  </tr>
                ) : (
                  filteredCoordinators.map((coordinator) => (
                    <tr key={coordinator.id} className="hover:bg-green-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{coordinator.username}</div>
                        <div className="text-xs text-gray-500 font-medium">{coordinator.mobile || 'No Mobile'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                          {coordinator.area || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(coordinator.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleDeleteCoordinator(coordinator.id)}
                            className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg"
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

export default CoordinatorList;