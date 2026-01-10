import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, XCircle, Search, Users, Phone, Mail, MapPin, Briefcase } from 'lucide-react';

const CoordinatorList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});

  const [coordinators, setCoordinators] = useState([
    { id: 1, name: 'Priya Singh', mobile: '9876543212', email: 'priya@email.com', territory: 'North', experience: '5 years', status: 'Active' },
    { id: 2, name: 'Vikram Patel', mobile: '9876543213', email: 'vikram@email.com', territory: 'South', experience: '3 years', status: 'Active' },
    { id: 3, name: 'Anita Sharma', mobile: '9876543214', email: 'anita@email.com', territory: 'East', experience: '4 years', status: 'Active' },
    { id: 4, name: 'Rohit Gupta', mobile: '9876543215', email: 'rohit@email.com', territory: 'West', experience: '2 years', status: 'Inactive' },
    { id: 5, name: 'Meena Devi', mobile: '9876543216', email: 'meena@email.com', territory: 'North', experience: '6 years', status: 'Active' },
  ]);

  const territories = ['North', 'South', 'East', 'West', 'Central'];

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSaveCoordinator = () => {
    if (!formData.name || !formData.mobile || !formData.territory) {
      alert('Please fill all required fields (Name, Mobile, and Territory)!');
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
      // Update existing coordinator - REAL-TIME UPDATE
      setCoordinators(coordinators.map(c => 
        c.id === editingItem.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Add new coordinator - REAL-TIME ADD
      const newCoordinator = {
        id: Math.max(...coordinators.map(c => c.id), 0) + 1,
        ...formData,
        status: 'Active'
      };
      setCoordinators([...coordinators, newCoordinator]);
    }
    resetForm();
  };

  const handleEditCoordinator = (coordinator) => {
    setEditingItem(coordinator);
    setFormData({
      name: coordinator.name,
      mobile: coordinator.mobile,
      email: coordinator.email,
      territory: coordinator.territory,
      experience: coordinator.experience
    });
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCoordinator = (id) => {
    if (window.confirm('Are you sure you want to delete this coordinator?')) {
      // Delete coordinator - REAL-TIME DELETE
      setCoordinators(coordinators.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    // Toggle status - REAL-TIME UPDATE
    setCoordinators(coordinators.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' }
        : c
    ));
  };

  const filteredCoordinators = coordinators.filter(coordinator =>
    coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coordinator.mobile.includes(searchTerm) ||
    coordinator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coordinator.territory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTerritoryCount = (territory) => {
    return coordinators.filter(c => c.territory === territory && c.status === 'Active').length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Coordinator Management</h1>
              <p className="text-sm text-gray-600">Manage coordinator accounts and territories</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Total Coordinators</div>
            <div className="text-2xl font-bold text-gray-800">{coordinators.length}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">
              {coordinators.filter(c => c.status === 'Active').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Inactive</div>
            <div className="text-2xl font-bold text-red-600">
              {coordinators.filter(c => c.status === 'Inactive').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-xs text-gray-600 mb-1">Territories</div>
            <div className="text-2xl font-bold text-green-600">
              {territories.length}
            </div>
          </div>
        </div>

        {/* Territory-wise Coordinator Distribution */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin size={18} />
            Active Coordinators by Territory
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {territories.map((territory, idx) => (
              <div key={idx} className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-sm font-semibold text-gray-800">{territory}</div>
                <div className="text-xl font-bold text-green-600">{getTerritoryCount(territory)}</div>
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
                placeholder="Search by name, mobile, email or territory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
            >
              <Plus size={20} />
              Add Coordinator
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={24} className="text-green-600" />
              {editingItem ? 'Edit Coordinator' : 'Add New Coordinator'}
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Priya Singh"
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
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., priya@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Territory <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={formData.territory || ''}
                    onChange={(e) => handleFormChange('territory', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select Territory</option>
                    {territories.map((territory, idx) => (
                      <option key={idx} value={territory}>{territory}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.experience || ''}
                    onChange={(e) => handleFormChange('experience', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveCoordinator}
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

        {/* Coordinators Table - Desktop View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Territory</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Experience</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCoordinators.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No coordinators found. Add your first coordinator!
                    </td>
                  </tr>
                ) : (
                  filteredCoordinators.map((coordinator) => (
                    <tr key={coordinator.id} className="hover:bg-green-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-800">#{coordinator.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{coordinator.name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          {coordinator.mobile}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" />
                          {coordinator.email}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin size={14} className="text-gray-400" />
                          {coordinator.territory}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-gray-400" />
                          {coordinator.experience}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleStatus(coordinator.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                            coordinator.status === 'Active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {coordinator.status}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditCoordinator(coordinator)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCoordinator(coordinator.id)}
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

        {/* Coordinators Cards - Mobile/Tablet View */}
        <div className="lg:hidden space-y-4">
          {filteredCoordinators.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
              No coordinators found. Add your first coordinator!
            </div>
          ) : (
            filteredCoordinators.map((coordinator) => (
              <div key={coordinator.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">#{coordinator.id}</span>
                      <button
                        onClick={() => handleToggleStatus(coordinator.id)}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          coordinator.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {coordinator.status}
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{coordinator.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCoordinator(coordinator)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCoordinator(coordinator.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span>{coordinator.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span>{coordinator.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{coordinator.territory}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={14} className="text-gray-400" />
                    <span>{coordinator.experience}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md p-4 text-white">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm">
              Showing <span className="font-bold">{filteredCoordinators.length}</span> of <span className="font-bold">{coordinators.length}</span> coordinators
            </div>
            <div className="text-sm font-semibold">
              Active: {coordinators.filter(c => c.status === 'Active').length} | Territories: {territories.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorList;