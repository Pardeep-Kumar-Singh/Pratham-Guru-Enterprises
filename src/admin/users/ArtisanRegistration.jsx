import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, Users, Phone, MapPin, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const ArtisanRegistration = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    setLoading(true);
    try {
      const response = await api.get('/artisans');
      setArtisans(response.data);
    } catch (error) {
      console.error('Error fetching artisans:', error);
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

  const handleSaveArtisan = async () => {
    if (!formData.name || !formData.mobile) {
      alert('Please fill all required fields!');
      return;
    }

    setLoading(true);
    try {
      if (editingItem) {
        await api.put(`/artisans/${editingItem.id}`, formData);
      } else {
        await api.post('/artisans', formData);
      }
      fetchArtisans();
      resetForm();
    } catch (error) {
      console.error('Error saving artisan:', error);
      alert(error.response?.data?.detail || 'Error saving artisan');
    } finally {
      setLoading(false);
    }
  };

  const handleEditArtisan = (artisan) => {
    setEditingItem(artisan);
    setFormData({
      name: artisan.name,
      mobile: artisan.mobile,
      email: artisan.email,
      area: artisan.area,
    });
    setShowAddForm(true);
  };

  const handleDeleteArtisan = async (id) => {
    if (!window.confirm("Delete this artisan?")) return;
    try {
      await api.delete(`/artisans/${id}`);
      fetchArtisans();
    } catch (error) {
      console.error('Error deleting artisan:', error);
    }
  };

  const filteredArtisans = artisans.filter(artisan =>
    artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artisan.mobile.includes(searchTerm) ||
    (artisan.area && artisan.area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin?tab=users')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors mr-2 text-gray-600"
              title="Back to Dashboard"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg text-white">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Artisan Master</h1>
              <p className="text-sm text-gray-600 font-medium">Register and manage artisan profiles</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-pink-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={20} />
            Register Artisan
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, mobile, or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-pink-100 animate-in slide-in-from-top duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Plus className="text-pink-600" size={24} />
              {editingItem ? 'Edit Artisan Profile' : 'Register New Artisan'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Artisan Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={formData.mobile || ''}
                    onChange={(e) => handleFormChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                    placeholder="10-digit mobile"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Area/Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => handleFormChange('area', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                    placeholder="Panipat"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Experience</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
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
                onClick={handleSaveArtisan}
                disabled={loading}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-pink-100 transition-all disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {editingItem ? 'Update Artisan' : 'Register Artisan'}
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-pink-600 text-white">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Artisan Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Area</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && artisans.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-pink-500" size={32} />
                      <p className="mt-2 text-gray-400 font-medium">Loading artisans...</p>
                    </td>
                  </tr>
                ) : filteredArtisans.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-medium italic">
                      No artisans registered.
                    </td>
                  </tr>
                ) : (
                  filteredArtisans.map((artisan) => (
                    <tr key={artisan.id} className="hover:bg-pink-50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-gray-800">{artisan.name}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{artisan.mobile}</td>
                      <td className="px-6 py-4 text-gray-500 font-medium">{artisan.area || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleEditArtisan(artisan)}
                            className="p-2 text-gray-400 hover:text-pink-600 bg-gray-50 hover:bg-pink-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteArtisan(artisan.id)}
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

export default ArtisanRegistration;
