// src/pages/AdminLeadsPage.jsx - FULLY RESPONSIVE VERSION
import React, { useEffect, useState } from "react";
import { useLeadStore } from "../store/useLeadStore";
import {
  Users,
  Mail,
  Download,
  Loader2,
  RefreshCw,
  Search,
  Calendar,
  TrendingUp,
  FileText,
  Target,
  Filter,
  User,
} from "lucide-react";
import Button from "../components/Button";
import toast from "react-hot-toast";

const AdminLeadsPage = () => {
  const {
    blundersLeads,
    strategiesLeads,
    loading,
    fetchBlundersLeads,
    fetchStrategiesLeads,
  } = useLeadStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, blunders, strategies

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([fetchBlundersLeads(), fetchStrategiesLeads()]);
    } catch (error) {
      toast.error("Failed to load leads");
    }
  };

  // Calculate statistics
  const stats = {
    total: blundersLeads.length + strategiesLeads.length,
    blunders: blundersLeads.length,
    strategies: strategiesLeads.length,
    recentBlunders: blundersLeads.filter(
      (lead) => new Date() - new Date(lead.createdAt) < 30 * 24 * 60 * 60 * 1000
    ).length,
    recentStrategies: strategiesLeads.filter(
      (lead) => new Date() - new Date(lead.createdAt) < 30 * 24 * 60 * 60 * 1000
    ).length,
  };

  // Combine and filter leads
  const allLeads = [
    ...blundersLeads.map((lead) => ({ ...lead, type: "Blunders Guide" })),
    ...strategiesLeads.map((lead) => ({ ...lead, type: "Strategies Guide" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredLeads = allLeads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "blunders" && lead.type === "Blunders Guide") ||
      (activeTab === "strategies" && lead.type === "Strategies Guide");
    return matchesSearch && matchesTab;
  });

  // Export to CSV
  const handleExportCSV = () => {
    if (allLeads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    const csvContent = [
      ["Name", "Email", "Type", "Date"],
      ...allLeads.map((lead) => [
        lead.name || "N/A",
        lead.email,
        lead.type,
        new Date(lead.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `popup-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
        <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-[#CFAF4E]" />
      </div>
    );
  }

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-[#0A2540] flex items-center gap-3">
                <Users className="text-[#CFAF4E]" size={32} />
                Popup Leads
              </h1>
              <p className="text-xs sm:text-sm text-[#333333]/70 mt-1 sm:mt-2 font-['Inter']">
                Download guide leads from popups
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
                disabled={allLeads.length === 0}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Leads */}
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
              Total Leads
            </p>
          </div>

          {/* Blunders Leads */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-red-500/10 rounded-lg">
                <Target className="text-red-600" size={20} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-red-600 font-['Playfair_Display']">
              {stats.blunders}
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
              Blunders Guide
            </p>
          </div>

          {/* Strategies Leads */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg">
                <FileText className="text-blue-600" size={20} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 font-['Playfair_Display']">
              {stats.strategies}
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
              Strategies Guide
            </p>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#CFAF4E]/10 rounded-lg">
                <TrendingUp className="text-[#CFAF4E]" size={20} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#CFAF4E] font-['Playfair_Display']">
              {stats.recentBlunders + stats.recentStrategies}
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
              Last 30 Days
            </p>
          </div>
        </div>

        {/* Filters - Mobile Optimized */}
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
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] text-sm"
                />
              </div>
            </div>

            {/* Tab Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-[#0A2540] text-[#CFAF4E]"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-[#CFAF4E]/20"
                }`}
              >
                All Leads ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab("blunders")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === "blunders"
                    ? "bg-red-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-red-100"
                }`}
              >
                Blunders ({stats.blunders})
              </button>
              <button
                onClick={() => setActiveTab("strategies")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === "strategies"
                    ? "bg-blue-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-blue-100"
                }`}
              >
                Strategies ({stats.strategies})
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table/Cards */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-[#CFAF4E] mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#0A2540] mb-2">
                No Leads Found
              </h3>
              <p className="text-sm sm:text-base text-[#333333]/70 font-['Inter']">
                {searchTerm
                  ? "Try adjusting your search"
                  : "No leads available yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on Mobile */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0A2540] text-[#CFAF4E]">
                    <tr>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        NAME
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        EMAIL
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        TYPE
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        DATE
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CFAF4E]/10">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="hover:bg-[#F4F4F4] transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={16}
                            />
                            <span className="font-['Inter'] text-[#333333]">
                              {lead.name || "—"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={16}
                            />
                            <span className="font-['Inter'] text-[#333333]">
                              {lead.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-['Inter'] font-medium ${
                              lead.type === "Blunders Guide"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {lead.type === "Blunders Guide" ? (
                              <Target size={14} />
                            ) : (
                              <FileText size={14} />
                            )}
                            {lead.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-[#333333]/70 font-['Inter']">
                            <Calendar size={14} className="text-[#CFAF4E]" />
                            {formatDate(lead.createdAt)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards - Visible on Mobile/Tablet */}
              <div className="md:hidden divide-y divide-[#CFAF4E]/10">
                {filteredLeads.map((lead) => (
                  <div key={lead._id} className="p-4">
                    <div className="space-y-2">
                      {/* Name */}
                      <div className="flex items-center gap-2">
                        <User
                          className="text-[#CFAF4E] flex-shrink-0"
                          size={14}
                        />
                        <span className="font-['Inter'] font-semibold text-[#0A2540] text-sm">
                          {lead.name || "—"}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-2">
                        <Mail
                          className="text-[#CFAF4E] flex-shrink-0"
                          size={14}
                        />
                        <span className="font-['Inter'] text-[#333333] text-sm break-all">
                          {lead.email}
                        </span>
                      </div>

                      {/* Type & Date */}
                      <div className="flex items-center justify-between gap-2 pt-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-['Inter'] font-medium ${
                            lead.type === "Blunders Guide"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {lead.type === "Blunders Guide" ? (
                            <Target size={12} />
                          ) : (
                            <FileText size={12} />
                          )}
                          {lead.type}
                        </span>
                        <span className="text-xs text-[#333333]/60 font-['Inter']">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Results Info */}
        {filteredLeads.length > 0 && (
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
              Showing {filteredLeads.length} of {stats.total} leads
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminLeadsPage;
