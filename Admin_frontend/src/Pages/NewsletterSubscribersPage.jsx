// src/pages/admin/NewsletterSubscribersPage.jsx - FULLY RESPONSIVE VERSION
import React, { useState, useEffect } from "react";
import { useNewsletterStore } from "../store/useNewsletterStore";
import {
  Mail,
  Download,
  Trash2,
  Search,
  Filter,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Loader2,
  RefreshCw,
  TrendingUp,
  CheckCircle,
  XCircle,
  SlidersHorizontal,
} from "lucide-react";
import Button from "../components/Button";
import toast from "react-hot-toast";
import Dropdown from "../components/Dropdown";

const NewsletterSubscribersPage = () => {
  const {
    subscribers,
    stats,
    loading,
    error,
    getAllSubscribers,
    getStats,
    deleteSubscriber,
  } = useNewsletterStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

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
        filters.isActive = filterStatus === "active";
      }

      await getAllSubscribers(filters);
      await getStats();
    } catch (err) {
      toast.error("Failed to load subscribers");
    }
  };

  // Filter subscribers based on search
  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete subscriber
  const handleDelete = async (id, email) => {
    if (
      window.confirm(`Are you sure you want to delete ${email} from the list?`)
    ) {
      try {
        await deleteSubscriber(id);
        toast.success("Subscriber deleted successfully");
        loadData();
      } catch (err) {
        toast.error("Failed to delete subscriber");
      }
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedSubscribers.length} subscribers?`
      )
    ) {
      try {
        for (const id of selectedSubscribers) {
          await deleteSubscriber(id);
        }
        toast.success(`${selectedSubscribers.length} subscribers deleted`);
        setSelectedSubscribers([]);
        loadData();
      } catch (err) {
        toast.error("Failed to delete subscribers");
      }
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export");
      return;
    }

    const csvContent = [
      ["Email", "Status", "Subscribed At", "Source"],
      ...subscribers.map((sub) => [
        sub.email,
        sub.isActive ? "Active" : "Inactive",
        new Date(sub.subscribedAt).toLocaleDateString(),
        sub.source || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully");
  };

  // Toggle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(filteredSubscribers.map((sub) => sub._id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  // Toggle individual selection
  const handleSelectSubscriber = (id) => {
    setSelectedSubscribers((prev) =>
      prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id]
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

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-[#0A2540] flex items-center gap-3">
                <Mail className="text-[#CFAF4E]" size={32} />
                Newsletter Subscribers
              </h1>
              <p className="text-xs sm:text-sm text-[#333333]/70 mt-1 sm:mt-2 font-['Inter']">
                Manage newsletter subscriptions
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
                disabled={subscribers.length === 0}
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
            {/* Total Subscribers */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-[#0A2540]/10 rounded-lg">
                  <Users className="text-[#0A2540]" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-['Playfair_Display']">
                {stats.total}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Total
              </p>
            </div>

            {/* Active Subscribers */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                  <UserCheck className="text-green-600" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-green-600 font-['Playfair_Display']">
                {stats.active}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Active
              </p>
            </div>

            {/* Inactive Subscribers */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-red-500/10 rounded-lg">
                  <UserX className="text-red-600" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-red-600 font-['Playfair_Display']">
                {stats.inactive}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Inactive
              </p>
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-[#CFAF4E]/10 rounded-lg">
                  <TrendingUp className="text-[#CFAF4E]" size={20} />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#CFAF4E] font-['Playfair_Display']">
                {stats.recentSubscriptions}
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
                Last 30 Days
              </p>
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
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] text-sm"
                />
              </div>
            </div>

            {/* Status Filter + Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
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
                  onClick={() => setFilterStatus("active")}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                    filterStatus === "active"
                      ? "bg-green-600 text-white"
                      : "bg-[#F4F4F4] text-[#333333] hover:bg-green-100"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus("inactive")}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                    filterStatus === "inactive"
                      ? "bg-red-600 text-white"
                      : "bg-[#F4F4F4] text-[#333333] hover:bg-red-100"
                  }`}
                >
                  Inactive
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="w-full sm:w-auto">
                <Dropdown
                  options={[
                    { value: "", label: "Select" },
                    { value: "createdAt-desc", label: "Newest First" },
                    { value: "createdAt-asc", label: "Oldest First" },
                    { value: "email-asc", label: "Email A-Z" },
                    { value: "email-desc", label: "Email Z-A" },
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
            </div>

            {/* Bulk Actions */}
            {selectedSubscribers.length > 0 && (
              <div className="pt-4 border-t border-[#CFAF4E]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm text-[#333333] font-['Inter']">
                  {selectedSubscribers.length} selected
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

        {/* Subscribers Table/Cards */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-[#CFAF4E]" />
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#0A2540] mb-2">
                Error Loading Subscribers
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
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-[#CFAF4E] mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#0A2540] mb-2">
                No Subscribers Found
              </h3>
              <p className="text-sm sm:text-base text-[#333333]/70 font-['Inter']">
                {searchTerm
                  ? "Try adjusting your search"
                  : "No one has subscribed yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on Mobile */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0A2540] text-[#CFAF4E]">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedSubscribers.length ===
                            filteredSubscribers.length
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-[#CFAF4E] focus:ring-[#CFAF4E]"
                        />
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        EMAIL
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        STATUS
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        SOURCE
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        SUBSCRIBED AT
                      </th>
                      <th className="px-6 py-4 text-center font-['Inter'] font-semibold text-xs">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CFAF4E]/10">
                    {filteredSubscribers.map((subscriber) => (
                      <tr
                        key={subscriber._id}
                        className="hover:bg-[#F4F4F4] transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.includes(
                              subscriber._id
                            )}
                            onChange={() =>
                              handleSelectSubscriber(subscriber._id)
                            }
                            className="w-4 h-4 rounded border-[#CFAF4E] focus:ring-[#CFAF4E]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={16}
                            />
                            <span className="font-['Inter'] text-[#333333]">
                              {subscriber.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {subscriber.isActive ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-['Inter'] font-medium">
                              <CheckCircle size={14} />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-['Inter'] font-medium">
                              <XCircle size={14} />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[#333333]/70 font-['Inter'] capitalize">
                            {subscriber.source || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-[#333333]/70 font-['Inter']">
                            <Calendar size={14} className="text-[#CFAF4E]" />
                            {formatDate(subscriber.subscribedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() =>
                                handleDelete(subscriber._id, subscriber.email)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete subscriber"
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
              <div className="md:hidden divide-y divide-[#CFAF4E]/10">
                {filteredSubscribers.map((subscriber) => (
                  <div key={subscriber._id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.includes(subscriber._id)}
                          onChange={() =>
                            handleSelectSubscriber(subscriber._id)
                          }
                          className="w-4 h-4 rounded border-[#CFAF4E] focus:ring-[#CFAF4E] mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <Mail
                              className="text-[#CFAF4E] flex-shrink-0 mt-0.5"
                              size={14}
                            />
                            <span className="font-['Inter'] text-sm text-[#333333] break-all">
                              {subscriber.email}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            {subscriber.isActive ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full font-['Inter']">
                                <CheckCircle size={12} />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full font-['Inter']">
                                <XCircle size={12} />
                                Inactive
                              </span>
                            )}
                            {subscriber.source && (
                              <span className="text-[#333333]/60 font-['Inter'] capitalize">
                                {subscriber.source}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#333333]/60 mt-2 font-['Inter']">
                            {new Date(
                              subscriber.subscribedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleDelete(subscriber._id, subscriber.email)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
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
        {filteredSubscribers.length > 0 && (
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
              Showing {filteredSubscribers.length} of {stats?.total || 0}{" "}
              subscribers
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default NewsletterSubscribersPage;
