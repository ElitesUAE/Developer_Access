// src/pages/admin/AdminManagementPage.jsx
import React, { useState, useEffect } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldOff,
  Search,
  Loader2,
  RefreshCw,
  UserCheck,
  UserX,
  Mail,
  Calendar,
} from "lucide-react";
import Button from "../components/Button";
import toast from "react-hot-toast";

const AdminManagementPage = () => {
  const { admin: currentUser } = useAuthStore();
  const {
    admins,
    stats,
    loading,
    error,
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    loadData();
  }, [filterRole, filterStatus]);

  const loadData = async () => {
    try {
      const filters = {};
      if (filterRole !== "all") filters.role = filterRole;
      if (filterStatus !== "all") filters.isActive = filterStatus === "active";

      await getAllAdmins(filters);
    } catch (err) {
      toast.error("Failed to load admins");
    }
  };

  // Filter admins based on search
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteAdmin(id);
        toast.success("Admin deleted successfully");
      } catch (err) {
        toast.error(error || "Failed to delete admin");
      }
    }
  };

  const handleToggleStatus = async (id, name, currentStatus) => {
    if (
      window.confirm(
        `Are you sure you want to ${
          currentStatus ? "deactivate" : "activate"
        } ${name}?`
      )
    ) {
      try {
        await toggleAdminStatus(id);
        toast.success(
          `Admin ${currentStatus ? "deactivated" : "activated"} successfully`
        );
      } catch (err) {
        toast.error(error || "Failed to update admin status");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#0A2540] flex items-center gap-3">
                <Users className="text-[#CFAF4E]" size={40} />
                Admin Management
              </h1>
              <p className="text-[#333333]/70 mt-2 font-['Inter']">
                Manage admin users and permissions
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={loadData}
                leftIcon={<RefreshCw size={18} />}
                disabled={loading}
              >
                Refresh
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowCreateModal(true)}
                leftIcon={<Plus size={18} />}
              >
                Add Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#CFAF4E]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#0A2540]/10 rounded-lg">
                  <Users className="text-[#0A2540]" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#0A2540] font-['Playfair_Display']">
                {stats.total}
              </h3>
              <p className="text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Total Admins
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#CFAF4E]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <UserCheck className="text-green-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-green-600 font-['Playfair_Display']">
                {stats.activeCount}
              </h3>
              <p className="text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Active Admins
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-[#CFAF4E]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <UserX className="text-red-600" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-red-600 font-['Playfair_Display']">
                {stats.inactiveCount}
              </h3>
              <p className="text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Inactive Admins
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6 border border-[#CFAF4E]/20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333333]/40"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterRole("all")}
                className={`px-4 py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 ${
                  filterRole === "all"
                    ? "bg-[#0A2540] text-[#CFAF4E]"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-[#CFAF4E]/20"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterRole("super-admin")}
                className={`px-4 py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 ${
                  filterRole === "super-admin"
                    ? "bg-purple-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-purple-100"
                }`}
              >
                Super Admin
              </button>
              <button
                onClick={() => setFilterRole("admin")}
                className={`px-4 py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 ${
                  filterRole === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-blue-100"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 ${
                  filterStatus === "all"
                    ? "bg-[#0A2540] text-[#CFAF4E]"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-[#CFAF4E]/20"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-4 py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 ${
                  filterStatus === "active"
                    ? "bg-green-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-green-100"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus("inactive")}
                className={`px-4 py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 ${
                  filterStatus === "inactive"
                    ? "bg-red-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-red-100"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Admins Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-[#CFAF4E]" />
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-[#CFAF4E] mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-2xl text-[#0A2540] mb-2">
                No Admins Found
              </h3>
              <p className="text-[#333333]/70 font-['Inter']">
                {searchTerm ? "Try adjusting your search" : "No admins yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0A2540] text-[#CFAF4E]">
                  <tr>
                    <th className="px-6 py-4 text-left font-['Inter'] font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left font-['Inter'] font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left font-['Inter'] font-semibold">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left font-['Inter'] font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-['Inter'] font-semibold">
                      Last Login
                    </th>
                    <th className="px-6 py-4 text-center font-['Inter'] font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CFAF4E]/10">
                  {filteredAdmins.map((admin) => (
                    <tr
                      key={admin._id}
                      className="hover:bg-[#F4F4F4] transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#CFAF4E] text-[#0A2540] rounded-full flex items-center justify-center font-bold">
                            {admin.name[0].toUpperCase()}
                          </div>
                          <span className="font-['Inter'] font-medium text-[#333333]">
                            {admin.name}
                            {admin._id === currentUser?._id && (
                              <span className="ml-2 text-xs text-[#CFAF4E]">
                                (You)
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#333333]">
                          <Mail size={14} className="text-[#CFAF4E]" />
                          {admin.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-['Inter'] font-medium ${
                            admin.role === "super-admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {admin.role === "super-admin" ? (
                            <ShieldCheck size={14} />
                          ) : (
                            <Shield size={14} />
                          )}
                          {admin.role === "super-admin"
                            ? "Super Admin"
                            : "Admin"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-['Inter'] font-medium ${
                            admin.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {admin.isActive ? (
                            <UserCheck size={14} />
                          ) : (
                            <UserX size={14} />
                          )}
                          {admin.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#333333]/70">
                          <Calendar size={14} className="text-[#CFAF4E]" />
                          {admin.lastLogin
                            ? formatDate(admin.lastLogin)
                            : "Never"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedAdmin(admin);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit admin"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleToggleStatus(
                                admin._id,
                                admin.name,
                                admin.isActive
                              )
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              admin.isActive
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={admin.isActive ? "Deactivate" : "Activate"}
                            disabled={admin._id === currentUser?._id}
                          >
                            {admin.isActive ? (
                              <ShieldOff size={18} />
                            ) : (
                              <ShieldCheck size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(admin._id, admin.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete admin"
                            disabled={admin._id === currentUser?._id}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateAdminModal
          onClose={() => setShowCreateModal(false)}
          onCreate={async (data) => {
            try {
              await createAdmin(data);
              toast.success("Admin created successfully");
              setShowCreateModal(false);
            } catch (err) {
              toast.error(error || "Failed to create admin");
            }
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAdmin && (
        <EditAdminModal
          admin={selectedAdmin}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAdmin(null);
          }}
          onUpdate={async (id, data) => {
            try {
              await updateAdmin(id, data);
              toast.success("Admin updated successfully");
              setShowEditModal(false);
              setSelectedAdmin(null);
            } catch (err) {
              toast.error(error || "Failed to update admin");
            }
          }}
        />
      )}
    </div>
    </>
  );
};

// Create Admin Modal
const CreateAdminModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreate(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] text-white px-6 py-5 rounded-t-2xl">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold">
            Create New Admin
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              minLength={6}
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={loading}
              leftIcon={
                loading ? <Loader2 className="animate-spin" size={18} /> : null
              }
            >
              {loading ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Admin Modal
const EditAdminModal = ({ admin, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    role: admin.role,
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      await onUpdate(admin._id, updateData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] text-white px-6 py-5 rounded-t-2xl">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold">
            Edit Admin
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Password (leave blank to keep current)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              minLength={6}
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter']"
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={loading}
              leftIcon={
                loading ? <Loader2 className="animate-spin" size={18} /> : null
              }
            >
              {loading ? "Updating..." : "Update Admin"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminManagementPage;
