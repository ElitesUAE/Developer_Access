// src/pages/admin/CallbackRequestsPage.jsx - FULLY RESPONSIVE VERSION
import React, { useState, useEffect } from "react";
import { useCallbackStore } from "../store/useCallbackStore";
import Dropdown from "../components/Dropdown.jsx";
import {
  Phone,
  Download,
  Trash2,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  RefreshCw,
  TrendingUp,
  Eye,
  Edit2,
  Mail,
  User,
  MapPin,
  Home,
  SlidersHorizontal,
  ListChecks,
} from "lucide-react";
import Button from "../components/Button";
import toast from "react-hot-toast";

const CallbackRequestsPage = () => {
  const {
    callbackRequests,
    stats,
    loading,
    error,
    getAllCallbackRequests,
    getCallbackStats,
    updateCallbackRequestStatus,
    deleteCallbackRequest,
  } = useCallbackStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [viewDetailsModal, setViewDetailsModal] = useState(null);
  const [editStatusModal, setEditStatusModal] = useState(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [currentPage, filterStatus, sortBy, sortOrder]);

  const loadData = async () => {
    try {
      const filters = {
        page: currentPage,
        limit: 20,
        sortBy,
        order: sortOrder,
      };

      if (filterStatus !== "all") {
        filters.status = filterStatus;
      }

      await getAllCallbackRequests(filters);
      await getCallbackStats();
    } catch (err) {
      toast.error("Failed to load callback requests");
    }
  };

  // Filter requests based on search
  const filteredRequests = callbackRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm) ||
      request.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete request
  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete callback request from ${name}?`
      )
    ) {
      try {
        await deleteCallbackRequest(id);
        toast.success("Callback request deleted successfully");
        loadData();
      } catch (err) {
        toast.error("Failed to delete callback request");
      }
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRequests.length} callback requests?`
      )
    ) {
      try {
        for (const id of selectedRequests) {
          await deleteCallbackRequest(id);
        }
        toast.success(`${selectedRequests.length} requests deleted`);
        setSelectedRequests([]);
        loadData();
      } catch (err) {
        toast.error("Failed to delete requests");
      }
    }
  };

  // Handle status update
  const handleStatusUpdate = async (id, status, adminNotes = "") => {
    try {
      await updateCallbackRequestStatus(id, { status, adminNotes });
      toast.success("Status updated successfully");
      setEditStatusModal(null);
      loadData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (callbackRequests.length === 0) {
      toast.error("No callback requests to export");
      return;
    }

    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Property",
        "Preferred Time",
        "Status",
        "Message",
        "Created At",
      ],
      ...callbackRequests.map((req) => [
        req.name,
        req.email,
        req.phone,
        req.propertyTitle,
        req.preferredTime || "Anytime",
        req.status,
        req.message || "N/A",
        new Date(req.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `callback-requests-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully");
  };

  // Toggle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRequests(filteredRequests.map((req) => req._id));
    } else {
      setSelectedRequests([]);
    }
  };

  // Toggle individual selection
  const handleSelectRequest = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Contacted":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} />;
      case "Contacted":
        return <AlertCircle size={14} />;
      case "Completed":
        return <CheckCircle size={14} />;
      case "Cancelled":
        return <XCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-[#0A2540] flex items-center gap-3">
                <Phone className="text-[#CFAF4E]" size={32} />
                Callback Requests
              </h1>
              <p className="text-xs sm:text-sm text-[#333333]/70 mt-1 sm:mt-2 font-['Inter']">
                Manage property callback requests
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={loadData}
                leftIcon={<RefreshCw size={16} />}
                disabled={loading}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleExportCSV}
                leftIcon={<Download size={16} />}
                disabled={callbackRequests.length === 0}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Mobile Optimized */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {/* Total Requests */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-[#0A2540]/10 rounded-lg">
                  <Phone className="text-[#0A2540]" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-['Playfair_Display']">
                {stats.total}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Total
              </p>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="text-yellow-600" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-yellow-600 font-['Playfair_Display']">
                {stats.pending}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Pending
              </p>
            </div>

            {/* Contacted Requests */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg">
                  <AlertCircle className="text-blue-600" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 font-['Playfair_Display']">
                {stats.contacted}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Contacted
              </p>
            </div>

            {/* Completed Requests */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-green-600 font-['Playfair_Display']">
                {stats.completed}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Completed
              </p>
            </div>
          </div>
        )}

        {/* Top Properties - Mobile Optimized */}
        {stats?.topProperties && stats.topProperties.length > 0 && (
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 mb-6 sm:mb-8">
            <h3 className="font-['Playfair_Display'] text-base sm:text-xl font-semibold text-[#0A2540] mb-3 sm:mb-4 flex items-center gap-2">
              <TrendingUp className="text-[#CFAF4E]" size={20} />
              Top Properties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {stats.topProperties.map((prop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 sm:p-4 bg-[#F4F4F4] rounded-lg border border-[#CFAF4E]/20"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#CFAF4E] text-[#0A2540] rounded-full flex items-center justify-center font-bold font-['Inter'] text-sm sm:text-base flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-['Inter'] font-semibold text-[#0A2540] text-xs sm:text-sm truncate">
                        {prop.propertyTitle}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#333333]/60 font-['Inter']">
                        {prop.count} inquiries
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search - Mobile Optimized */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md mb-4 sm:mb-6 border border-[#CFAF4E]/20">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="w-full">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333333]/40"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] text-sm"
                />
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "all"
                    ? "bg-[#0A2540] text-[#CFAF4E]"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-[#CFAF4E]/20"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("Pending")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "Pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-yellow-100"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus("Contacted")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "Contacted"
                    ? "bg-blue-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-blue-100"
                }`}
              >
                Contacted
              </button>
              <button
                onClick={() => setFilterStatus("Completed")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "Completed"
                    ? "bg-green-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-green-100"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterStatus("Cancelled")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "Cancelled"
                    ? "bg-red-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-red-100"
                }`}
              >
                Cancelled
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto">
              <Dropdown
                options={[
                  { value: "", label: "Select" },
                  { value: "createdAt-desc", label: "Newest First" },
                  { value: "createdAt-asc", label: "Oldest First" },
                  { value: "name-asc", label: "Name A-Z" },
                  { value: "name-desc", label: "Name Z-A" },
                ]}
                value={`${sortBy}-${sortOrder}`}
                onChange={(value) => {
                  const [field, order] = value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                icon={SlidersHorizontal}
                placeholder="Sort By"
                className="w-full"
              />
            </div>

            {/* Bulk Actions */}
            {selectedRequests.length > 0 && (
              <div className="pt-4 border-t border-[#CFAF4E]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm text-[#333333] font-['Inter']">
                  {selectedRequests.length} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  leftIcon={<Trash2 size={14} />}
                  className="text-red-600 border-red-600 hover:bg-red-50 w-full sm:w-auto text-xs sm:text-sm"
                >
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Requests Table/Cards */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-[#CFAF4E]" />
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#0A2540] mb-2">
                Error Loading Requests
              </h3>
              <p className="text-sm sm:text-base text-[#333333]/70 font-['Inter']">
                {error}
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={loadData}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <Phone className="w-12 h-12 sm:w-16 sm:h-16 text-[#CFAF4E] mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#0A2540] mb-2">
                No Requests Found
              </h3>
              <p className="text-sm sm:text-base text-[#333333]/70 font-['Inter']">
                {searchTerm
                  ? "Try adjusting your search"
                  : "No callback requests yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on Mobile */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0A2540] text-[#CFAF4E]">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedRequests.length === filteredRequests.length
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-[#CFAF4E] focus:ring-[#CFAF4E]"
                        />
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        NAME
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        CONTACT
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        PROPERTY
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        STATUS
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        DATE
                      </th>
                      <th className="px-6 py-4 text-center font-['Inter'] font-semibold text-xs">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CFAF4E]/10">
                    {filteredRequests.map((request) => (
                      <tr
                        key={request._id}
                        className="hover:bg-[#F4F4F4] transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedRequests.includes(request._id)}
                            onChange={() => handleSelectRequest(request._id)}
                            className="w-4 h-4 rounded border-[#CFAF4E] focus:ring-[#CFAF4E]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="text-[#CFAF4E]" size={16} />
                            <span className="font-['Inter'] font-medium text-[#333333]">
                              {request.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-[#333333]">
                              <Mail size={14} className="text-[#CFAF4E]" />
                              {request.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#333333]">
                              <Phone size={14} className="text-[#CFAF4E]" />
                              {request.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Home size={14} className="text-[#CFAF4E]" />
                            <span className="text-sm text-[#333333] font-['Inter'] line-clamp-2 max-w-[200px]">
                              {request.propertyTitle}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-['Inter'] font-medium border ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {getStatusIcon(request.status)}
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-[#333333]/70 font-['Inter']">
                            <Calendar size={14} className="text-[#CFAF4E]" />
                            {formatDate(request.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setViewDetailsModal(request)}
                              className="p-2 text-[#0A2540] hover:bg-[#CFAF4E]/10 rounded-lg transition-colors duration-200"
                              title="View details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => setEditStatusModal(request)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Edit status"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(request._id, request.name)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete request"
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

              {/* Mobile Cards - Visible on Mobile/Tablet */}
              <div className="lg:hidden divide-y divide-[#CFAF4E]/10">
                {filteredRequests.map((request) => (
                  <div key={request._id} className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request._id)}
                        onChange={() => handleSelectRequest(request._id)}
                        className="w-4 h-4 rounded border-[#CFAF4E] focus:ring-[#CFAF4E] mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inter'] font-semibold text-[#0A2540] mb-1 text-sm">
                          {request.name}
                        </p>
                        <div className="space-y-1 mb-2">
                          <p className="text-xs text-[#333333]/70 truncate">
                            {request.email}
                          </p>
                          <p className="text-xs text-[#333333]/70">
                            {request.phone}
                          </p>
                        </div>
                        <p className="text-xs text-[#333333] mb-2 line-clamp-2">
                          {request.propertyTitle}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-['Inter'] font-medium border ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {getStatusIcon(request.status)}
                            {request.status}
                          </span>
                          <span className="text-xs text-[#333333]/60">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewDetailsModal(request)}
                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-[#0A2540] text-[#CFAF4E] rounded-lg hover:bg-[#1A3A5C] transition-colors font-['Inter'] font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setEditStatusModal(request)}
                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-['Inter'] font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(request._id, request.name)}
                        className="px-3 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination Info */}
        {filteredRequests.length > 0 && (
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
              Showing {filteredRequests.length} of {stats?.total || 0} requests
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {viewDetailsModal && (
        <ViewDetailsModal
          request={viewDetailsModal}
          onClose={() => setViewDetailsModal(null)}
        />
      )}

      {editStatusModal && (
        <EditStatusModal
          request={editStatusModal}
          onClose={() => setEditStatusModal(null)}
          onUpdate={handleStatusUpdate}
        />
      )}
    </div>
    </>
  );
};

// View Details Modal - Mobile Optimized
const ViewDetailsModal = ({ request, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] text-white px-4 sm:px-6 py-4 sm:py-5 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between">
          <h2 className="font-['Playfair_Display'] text-lg sm:text-2xl font-bold">
            Request Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <XCircle size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Contact Info */}
          <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
            <h3 className="font-['Inter'] font-semibold text-[#0A2540] mb-2 sm:mb-3 text-sm sm:text-base">
              Contact Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#CFAF4E] flex-shrink-0" />
                <span className="font-['Inter'] text-[#333333] text-sm">
                  {request.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#CFAF4E] flex-shrink-0" />
                <span className="font-['Inter'] text-[#333333] text-sm break-all">
                  {request.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#CFAF4E] flex-shrink-0" />
                <span className="font-['Inter'] text-[#333333] text-sm">
                  {request.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
            <h3 className="font-['Inter'] font-semibold text-[#0A2540] mb-2 sm:mb-3 text-sm sm:text-base">
              Property Information
            </h3>
            <div className="flex items-center gap-2">
              <Home size={14} className="text-[#CFAF4E] flex-shrink-0" />
              <span className="font-['Inter'] text-[#333333] text-sm">
                {request.propertyTitle}
              </span>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-[#F4F4F4] rounded-lg p-3 sm:p-4">
            <h3 className="font-['Inter'] font-semibold text-[#0A2540] mb-2 sm:mb-3 text-sm sm:text-base">
              Request Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#CFAF4E] flex-shrink-0" />
                <span className="font-['Inter'] text-[#333333] text-sm">
                  Preferred Time: {request.preferredTime || "Anytime"}
                </span>
              </div>
              {request.message && (
                <div>
                  <p className="text-xs sm:text-sm text-[#333333]/70 mb-1 font-['Inter']">
                    Message:
                  </p>
                  <p className="font-['Inter'] text-[#333333] bg-white p-2 sm:p-3 rounded text-sm">
                    {request.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status & Dates */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
                Status
              </p>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-['Inter'] font-medium border mt-1">
                {request.status}
              </span>
            </div>
            <div className="sm:text-right">
              <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
                Submitted
              </p>
              <p className="font-['Inter'] text-[#333333] text-sm">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Admin Notes */}
          {request.adminNotes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
              <h3 className="font-['Inter'] font-semibold text-[#0A2540] mb-2 text-sm sm:text-base">
                Admin Notes
              </h3>
              <p className="font-['Inter'] text-[#333333] whitespace-pre-line text-sm">
                {request.adminNotes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#CFAF4E]/20">
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// Edit Status Modal - Mobile Optimized
const EditStatusModal = ({ request, onClose, onUpdate }) => {
  const [status, setStatus] = useState(request.status);
  const [adminNotes, setAdminNotes] = useState(request.adminNotes || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdate(request._id, status, adminNotes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] text-white px-4 sm:px-6 py-4 sm:py-5 rounded-t-xl sm:rounded-t-2xl">
          <h2 className="font-['Playfair_Display'] text-lg sm:text-2xl font-bold">
            Update Status
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 truncate">
            {request.name} - {request.propertyTitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Status Dropdown */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Status
            </label>
            <Dropdown
              options={[
                { value: "", label: "Select Status" },
                { value: "Pending", label: "Pending" },
                { value: "Contacted", label: "Contacted" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
              value={status}
              onChange={setStatus}
              icon={ListChecks}
              placeholder="Select Status"
              className="w-full"
            />
          </div>

          {/* Admin Notes */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Admin Notes
            </label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add any notes about this request..."
              rows={4}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] resize-none text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
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
                loading ? <Loader2 className="animate-spin" size={16} /> : null
              }
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallbackRequestsPage;
