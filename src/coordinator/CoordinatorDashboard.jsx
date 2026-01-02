import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Menu,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  Users,
  TrendingUp,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Download,
  Edit,
  Trash2,
  Check,
  XCircle,
  LogOut,
} from "lucide-react";

const CoordinatorDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [notification, setNotification] = useState(null);
    //   const [selectedItem, setSelectedItem] = useState(null);
    
    const navigate = useNavigate();
  const handleLogout = () => {
    // Optional: clear auth/session data
    localStorage.clear();
    sessionStorage.clear();

    navigate("/", { replace: true });
  };
  // Data states
  const [workAssignments, setWorkAssignments] = useState([
    {
      id: 1,
      artisan: "Rajesh Kumar",
      task: "Wool Processing",
      wool: "5 kg",
      deadline: "Today 6 PM",
      status: "in-progress",
    },
    {
      id: 2,
      artisan: "Priya Sharma",
      task: "Gola Making",
      wool: "3 kg",
      deadline: "Tomorrow",
      status: "assigned",
    },
    {
      id: 3,
      artisan: "Amit Patel",
      task: "Quality Check",
      wool: "2 kg",
      deadline: "Today 4 PM",
      status: "completed",
    },
    {
      id: 4,
      artisan: "Sunita Devi",
      task: "Wool Processing",
      wool: "4 kg",
      deadline: "Tomorrow",
      status: "assigned",
    },
  ]);

  const [woolDistribution, setWoolDistribution] = useState([
    {
      id: 1,
      artisan: "Rajesh Kumar",
      distributed: "5 kg",
      date: "2026-01-01",
      collected: "4.8 kg",
      status: "partial",
    },
    {
      id: 2,
      artisan: "Priya Sharma",
      distributed: "3 kg",
      date: "2025-12-31",
      collected: "3 kg",
      status: "complete",
    },
    {
      id: 3,
      artisan: "Amit Patel",
      distributed: "2 kg",
      date: "2026-01-01",
      collected: "0 kg",
      status: "pending",
    },
  ]);

  const [golaMakers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      efficiency: 95,
      production: 45,
      status: "active",
      shift: "Morning",
    },
    {
      id: 2,
      name: "Priya Sharma",
      efficiency: 88,
      production: 38,
      status: "active",
      shift: "Evening",
    },
    {
      id: 3,
      name: "Amit Patel",
      efficiency: 92,
      production: 42,
      status: "break",
      shift: "Morning",
    },
    {
      id: 4,
      name: "Sunita Devi",
      efficiency: 85,
      production: 35,
      status: "active",
      shift: "Evening",
    },
  ]);

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      type: "Production Entry",
      artisan: "Rajesh Kumar",
      quantity: "45 pcs",
      time: "2 hrs ago",
      priority: "high",
    },
    {
      id: 2,
      type: "Quality Check",
      artisan: "Priya Sharma",
      quantity: "38 pcs",
      time: "4 hrs ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "Wool Return",
      artisan: "Amit Patel",
      quantity: "0.2 kg",
      time: "1 hr ago",
      priority: "low",
    },
  ]);

  const [dispatchQueue, setDispatchQueue] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      items: 450,
      artisan: "Rajesh Kumar",
      packaged: true,
      verified: false,
    },
    {
      id: 2,
      orderId: "ORD-002",
      items: 380,
      artisan: "Priya Sharma",
      packaged: true,
      verified: true,
    },
    {
      id: 3,
      orderId: "ORD-003",
      items: 420,
      artisan: "Amit Patel",
      packaged: false,
      verified: false,
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    artisan: "",
    task: "",
    wool: "",
    deadline: "",
    distributed: "",
    date: "",
  });

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Get stats dynamically
  const getStats = () => {
    const activeArtisans = golaMakers.filter(
      (m) => m.status === "active"
    ).length;
    const totalProduction = golaMakers.reduce(
      (sum, m) => sum + m.production,
      0
    );
    const readyToDispatch = dispatchQueue.filter(
      (d) => d.packaged && d.verified
    ).length;

    return [
      {
        label: "Active Artisans",
        value: activeArtisans,
        change: "+3",
        icon: Users,
        color: "bg-blue-500",
      },
      {
        label: "Pending Approvals",
        value: pendingApprovals.length,
        change: "-2",
        icon: Clock,
        color: "bg-yellow-500",
      },
      {
        label: "Today's Production",
        value: totalProduction,
        change: "+12",
        icon: TrendingUp,
        color: "bg-green-500",
      },
      {
        label: "Ready to Dispatch",
        value: readyToDispatch,
        change: "+5",
        icon: Package,
        color: "bg-purple-500",
      },
    ];
  };

  // Handle new assignment
  const handleNewAssignment = () => {
    if (
      !formData.artisan ||
      !formData.task ||
      !formData.wool ||
      !formData.deadline
    ) {
      showNotification("Please fill all fields", "error");
      return;
    }

    const newAssignment = {
      id: workAssignments.length + 1,
      artisan: formData.artisan,
      task: formData.task,
      wool: formData.wool,
      deadline: formData.deadline,
      status: "assigned",
    };

    setWorkAssignments([...workAssignments, newAssignment]);
    showNotification("Assignment created successfully!");
    setShowModal(false);
    setFormData({ artisan: "", task: "", wool: "", deadline: "" });
  };

  // Handle distribute wool
  const handleDistributeWool = () => {
    if (!formData.artisan || !formData.distributed || !formData.date) {
      showNotification("Please fill all fields", "error");
      return;
    }

    const newDistribution = {
      id: woolDistribution.length + 1,
      artisan: formData.artisan,
      distributed: formData.distributed,
      date: formData.date,
      collected: "0 kg",
      status: "pending",
    };

    setWoolDistribution([...woolDistribution, newDistribution]);
    showNotification("Wool distributed successfully!");
    setShowModal(false);
    setFormData({ artisan: "", distributed: "", date: "" });
  };

  // Handle record collection
  const handleRecordCollection = (id) => {
    const collected = prompt("Enter collected amount (kg):");
    if (collected) {
      setWoolDistribution(
        woolDistribution.map((item) =>
          item.id === id
            ? {
                ...item,
                collected: `${collected} kg`,
                status:
                  parseFloat(collected) >= parseFloat(item.distributed)
                    ? "complete"
                    : "partial",
              }
            : item
        )
      );
      showNotification("Collection recorded successfully!");
    }
  };

  // Handle approval
  const handleApproval = (id, approved) => {
    setPendingApprovals(
      pendingApprovals.filter((approval) => approval.id !== id)
    );
    showNotification(
      approved ? "Approved successfully!" : "Rejected successfully!",
      approved ? "success" : "error"
    );
  };

  // Handle dispatch status
  const handleDispatchUpdate = (id, field) => {
    setDispatchQueue(
      dispatchQueue.map((order) =>
        order.id === id ? { ...order, [field]: !order[field] } : order
      )
    );
    showNotification(
      `${field === "packaged" ? "Package" : "Verification"} status updated!`
    );
  };

  // Delete assignment
  const handleDeleteAssignment = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setWorkAssignments(workAssignments.filter((a) => a.id !== id));
      showNotification("Assignment deleted successfully!");
    }
  };

  // Update assignment status
  const handleStatusUpdate = (id, newStatus) => {
    setWorkAssignments(
      workAssignments.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
    showNotification("Status updated successfully!");
  };

  // Generate report
  const handleGenerateReport = () => {
    const report = {
      date: new Date().toLocaleDateString(),
      stats: getStats(),
      assignments: workAssignments,
      approvals: pendingApprovals,
    };
    console.log("Generated Report:", report);
    showNotification("Report generated! Check console for details.");
  };

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      break: "bg-yellow-100 text-yellow-800",
      inactive: "bg-gray-100 text-gray-800",
      "in-progress": "bg-blue-100 text-blue-800",
      assigned: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      partial: "bg-orange-100 text-orange-800",
      complete: "bg-green-100 text-green-800",
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "assignments", label: "Work Assignments", icon: CheckCircle },
    { id: "wool", label: "Wool Distribution", icon: Package },
    { id: "makers", label: "Gola Makers", icon: Users },
    { id: "approvals", label: "Approvals", icon: Clock },
    { id: "dispatch", label: "Dispatch", icon: Package },
  ];

  // Filter data based on search
  const filteredAssignments = workAssignments.filter(
    (a) =>
      a.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white flex items-center gap-2 animate-fade-in`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
          {notification.message}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {modalType === "assignment" && "New Assignment"}
                {modalType === "wool" && "Distribute Wool"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {modalType === "assignment" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Artisan Name
                    </label>
                    <input
                      type="text"
                      value={formData.artisan}
                      onChange={(e) =>
                        setFormData({ ...formData, artisan: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter artisan name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Type
                    </label>
                    <select
                      value={formData.task}
                      onChange={(e) =>
                        setFormData({ ...formData, task: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select task</option>
                      <option value="Wool Processing">Wool Processing</option>
                      <option value="Gola Making">Gola Making</option>
                      <option value="Quality Check">Quality Check</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wool Amount
                    </label>
                    <input
                      type="text"
                      value={formData.wool}
                      onChange={(e) =>
                        setFormData({ ...formData, wool: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5 kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deadline
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Today 6 PM"
                    />
                  </div>
                </>
              )}

              {modalType === "wool" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Artisan Name
                    </label>
                    <input
                      type="text"
                      value={formData.artisan}
                      onChange={(e) =>
                        setFormData({ ...formData, artisan: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter artisan name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (kg)
                    </label>
                    <input
                      type="text"
                      value={formData.distributed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          distributed: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5 kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    modalType === "assignment"
                      ? handleNewAssignment
                      : handleDistributeWool
                  }
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-bold text-gray-800">
          Coordinator Dashboard
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
    fixed lg:static inset-y-0 left-0 z-40
    w-64 bg-white border-r border-gray-200
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    flex flex-col
  `}
        >
          {/* Sidebar Header (VISIBLE ON MOBILE) */}
          <div className="p-6 border-b border-gray-200 shrink-0">
            <h1 className="text-xl font-bold text-gray-800">Operations Hub</h1>
            <p className="text-sm text-gray-500 mt-1">Coordinator Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${
              activeTab === item.id
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-500 mt-1">Today, January 01, 2026</p>
                </div>
                <button
                  onClick={handleGenerateReport}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Generate Report
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {getStats().map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          {stat.change}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Assignments */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Today's Assignments
                  </h3>
                  <div className="space-y-3">
                    {workAssignments.slice(0, 3).map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {assignment.artisan}
                          </p>
                          <p className="text-sm text-gray-500">
                            {assignment.task} - {assignment.wool}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            assignment.status
                          )}`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Pending Approvals ({pendingApprovals.length})
                  </h3>
                  <div className="space-y-3">
                    {pendingApprovals.slice(0, 3).map((approval) => (
                      <div
                        key={approval.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {approval.type}
                          </p>
                          <p className="text-sm text-gray-500">
                            {approval.artisan} - {approval.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveTab("approvals")}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Work Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Work Assignments
                </h2>
                <button
                  onClick={() => openModal("assignment")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  New Assignment
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search artisan or task..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Artisan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                          Task
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                          Wool
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAssignments.map((assignment) => (
                        <tr key={assignment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-800">
                              {assignment.artisan}
                            </p>
                            <p className="text-sm text-gray-500 md:hidden">
                              {assignment.task}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                            {assignment.task}
                          </td>
                          <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">
                            {assignment.wool}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={assignment.status}
                              onChange={(e) =>
                                handleStatusUpdate(
                                  assignment.id,
                                  e.target.value
                                )
                              }
                              className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(
                                assignment.status
                              )}`}
                            >
                              <option value="assigned">Assigned</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                handleDeleteAssignment(assignment.id)
                              }
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Wool Distribution Tab */}
          {activeTab === "wool" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Wool Distribution & Collection
                </h2>
                <button
                  onClick={() => openModal("wool")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Distribute Wool
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {woolDistribution.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">
                          {item.artisan}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">Distributed</p>
                            <p className="text-lg font-semibold text-gray-800">
                              {item.distributed}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Collected</p>
                            <p className="text-lg font-semibold text-gray-800">
                              {item.collected}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="text-sm text-gray-600">{item.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Status</p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                item.status
                              )} mt-1`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRecordCollection(item.id)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        Record Collection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gola Makers Tab */}
          {activeTab === "makers" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Gola Maker Status
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {golaMakers.map((maker) => (
                  <div
                    key={maker.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {maker.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {maker.shift} Shift
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          maker.status
                        )}`}
                      >
                        {maker.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Efficiency</span>
                          <span className="font-semibold text-gray-800">
                            {maker.efficiency}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${maker.efficiency}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-sm text-gray-500">
                          Today's Production
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          {maker.production} pcs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approvals Tab */}
          {activeTab === "approvals" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Verification & Approvals
              </h2>

              <div className="space-y-4">
                {pendingApprovals.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <CheckCircle
                      className="mx-auto text-green-500 mb-4"
                      size={48}
                    />
                    <p className="text-gray-500">No pending approvals!</p>
                  </div>
                ) : (
                  pendingApprovals.map((approval) => (
                    <div
                      key={approval.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-gray-800">
                              {approval.type}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                approval.priority
                              )}`}
                            >
                              {approval.priority}
                            </span>
                          </div>
                          <p className="text-gray-600">{approval.artisan}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Quantity: {approval.quantity}</span>
                            <span>•</span>
                            <span>{approval.time}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproval(approval.id, false)}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                          >
                            <X size={18} />
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproval(approval.id, true)}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                          >
                            <Check size={18} />
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Dispatch Tab */}
          {activeTab === "dispatch" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Dispatch Preparation
                </h2>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus size={20} />
                  Create Shipment
                </button>
              </div>

              <div className="space-y-4">
                {dispatchQueue.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {order.orderId}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Artisan: {order.artisan}
                        </p>
                        <p className="text-gray-600">
                          Items: {order.items} pieces
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() =>
                            handleDispatchUpdate(order.id, "packaged")
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            order.packaged
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <CheckCircle size={20} />
                          <span className="text-sm">Packaged</span>
                        </button>
                        <button
                          onClick={() =>
                            handleDispatchUpdate(order.id, "verified")
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            order.verified
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <CheckCircle size={20} />
                          <span className="text-sm">Verified</span>
                        </button>
                      </div>

                      {order.packaged && order.verified && (
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                          Ready to Ship
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CoordinatorDashboard;
