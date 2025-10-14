// src/pages/AdminContact.jsx - FULLY RESPONSIVE VERSION
import React, { useEffect, useState } from "react";
import { useContactStore } from "../store/useContactStore";
import {
  Trash2,
  Eye,
  Loader2,
  X,
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  CheckCircle,
  RefreshCw,
  Download,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";

export default function AdminContact() {
  const { contacts, contactsCount, loading, fetchAllContacts, deleteContact } =
    useContactStore();

  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, read, unread

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    if (showDeleteModal || showViewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDeleteModal, showViewModal]);

  const loadContacts = async () => {
    try {
      await fetchAllContacts();
    } catch (error) {
      toast.error("Failed to load contacts");
    }
  };

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "read" && contact.isRead) ||
      (filterStatus === "unread" && !contact.isRead);
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    total: contacts.length,
    read: contacts.filter((c) => c.isRead).length,
    unread: contacts.filter((c) => !c.isRead).length,
  };

  const handleViewClick = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedContact) return;

    setDeletingId(selectedContact._id);
    const loadingToast = toast.loading("Deleting contact...");

    try {
      await deleteContact(selectedContact._id);
      toast.success("Contact deleted successfully! 🎉", {
        id: loadingToast,
      });
      setShowDeleteModal(false);
      setSelectedContact(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete contact", {
        id: loadingToast,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseModals = () => {
    setShowDeleteModal(false);
    setShowViewModal(false);
    setSelectedContact(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error("No contacts to export");
      return;
    }

    const csvContent = [
      ["Name", "Email", "Phone", "Message", "Status", "Date"],
      ...contacts.map((c) => [
        c.fullName,
        c.email,
        c.phone,
        c.message.replace(/\n/g, " "),
        c.isRead ? "Read" : "Unread",
        new Date(c.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && contacts.length === 0) {
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
                <MessageSquare className="text-[#CFAF4E]" size={32} />
                Contact Messages
              </h1>
              <p className="text-xs sm:text-sm text-[#333333]/70 mt-1 sm:mt-2 font-['Inter']">
                Manage customer inquiries
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={loadContacts}
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
                disabled={contacts.length === 0}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {/* Total */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-[#0A2540]/10 rounded-lg">
                <MessageSquare className="text-[#0A2540]" size={20} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A2540] font-['Playfair_Display']">
              {stats.total}
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
              Total
            </p>
          </div>

          {/* Read */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-600 font-['Playfair_Display']">
              {stats.read}
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
              Read
            </p>
          </div>

          {/* Unread */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-md border border-[#CFAF4E]/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-lg">
                <Mail className="text-yellow-600" size={20} />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-yellow-600 font-['Playfair_Display']">
              {stats.unread}
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/60 mt-1 font-['Inter']">
              Unread
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
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] text-sm"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "all"
                    ? "bg-[#0A2540] text-[#CFAF4E]"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-[#CFAF4E]/20"
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus("read")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "read"
                    ? "bg-green-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-green-100"
                }`}
              >
                Read ({stats.read})
              </button>
              <button
                onClick={() => setFilterStatus("unread")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-['Inter'] font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ${
                  filterStatus === "unread"
                    ? "bg-yellow-600 text-white"
                    : "bg-[#F4F4F4] text-[#333333] hover:bg-yellow-100"
                }`}
              >
                Unread ({stats.unread})
              </button>
            </div>
          </div>
        </div>

        {/* Table/Cards */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-[#CFAF4E] mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#0A2540] mb-2">
                No Contacts Found
              </h3>
              <p className="text-sm sm:text-base text-[#333333]/70 font-['Inter']">
                {searchTerm
                  ? "Try adjusting your search"
                  : "Contact submissions will appear here"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on Mobile */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-[#CFAF4E]/10">
                  <thead className="bg-[#0A2540] text-[#CFAF4E]">
                    <tr>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        #
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        NAME
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        EMAIL
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        PHONE
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        DATE
                      </th>
                      <th className="px-6 py-4 text-left font-['Inter'] font-semibold text-xs">
                        STATUS
                      </th>
                      <th className="px-6 py-4 text-right font-['Inter'] font-semibold text-xs">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#CFAF4E]/10">
                    {filteredContacts.map((contact, index) => (
                      <tr
                        key={contact._id}
                        className="hover:bg-[#F4F4F4] transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]/70 font-['Inter']">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <User
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={16}
                            />
                            <span className="font-['Inter'] font-medium text-[#333333]">
                              {contact.fullName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Mail
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={16}
                            />
                            <span className="font-['Inter'] text-[#333333] text-sm">
                              {contact.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Phone
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={16}
                            />
                            <span className="font-['Inter'] text-[#333333] text-sm">
                              {contact.phone}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-[#333333]/70 font-['Inter']">
                            <Calendar size={14} className="text-[#CFAF4E]" />
                            {formatDate(contact.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-['Inter'] font-medium ${
                              contact.isRead
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {contact.isRead ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Mail size={14} />
                            )}
                            {contact.isRead ? "Read" : "Unread"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewClick(contact)}
                              className="p-2 text-[#0A2540] hover:bg-[#CFAF4E]/10 rounded-lg transition-colors duration-200"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(contact)}
                              disabled={deletingId === contact._id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                              title="Delete Contact"
                            >
                              {deletingId === contact._id ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <Trash2 size={18} />
                              )}
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
                {filteredContacts.map((contact, index) => (
                  <div key={contact._id} className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User
                              className="text-[#CFAF4E] flex-shrink-0"
                              size={14}
                            />
                            <span className="font-['Inter'] font-semibold text-[#0A2540] text-sm">
                              {contact.fullName}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail
                                className="text-[#CFAF4E] flex-shrink-0"
                                size={12}
                              />
                              <span className="font-['Inter'] text-[#333333] text-xs break-all">
                                {contact.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone
                                className="text-[#CFAF4E] flex-shrink-0"
                                size={12}
                              />
                              <span className="font-['Inter'] text-[#333333] text-xs">
                                {contact.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-['Inter'] font-medium flex-shrink-0 ml-2 ${
                            contact.isRead
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {contact.isRead ? (
                            <CheckCircle size={12} />
                          ) : (
                            <Mail size={12} />
                          )}
                          {contact.isRead ? "Read" : "New"}
                        </span>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-[#333333]/60 font-['Inter']">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleViewClick(contact)}
                          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-[#0A2540] text-[#CFAF4E] rounded-lg hover:bg-[#1A3A5C] transition-colors font-['Inter'] font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDeleteClick(contact)}
                          disabled={deletingId === contact._id}
                          className="px-3 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center flex-shrink-0"
                        >
                          {deletingId === contact._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Results Info */}
        {filteredContacts.length > 0 && (
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
              Showing {filteredContacts.length} of {contactsCount} contacts
            </p>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && contacts.length > 0 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-[#CFAF4E]" />
            </div>
          </div>
        )}
      </div>

      {/* View Modal - Mobile Optimized */}
      {showViewModal && selectedContact && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleCloseModals}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <div
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-8 relative pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModals}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 sm:p-2 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-[#CFAF4E]" />
                </div>
              </div>

              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#0A2540] mb-1 sm:mb-2 text-center">
                Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-[#333333]/70 text-center mb-4 sm:mb-6 font-['Inter']">
                Submitted on {formatDate(selectedContact.createdAt)}
              </p>

              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-4">
                {/* Full Name */}
                <div className="bg-[#F4F4F4] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#CFAF4E]/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#CFAF4E]/20 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A2540]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs font-semibold text-[#333333]/70 uppercase tracking-wide mb-1 font-['Inter']">
                        Full Name
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-[#0A2540] font-['Inter']">
                        {selectedContact.fullName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#F4F4F4] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#CFAF4E]/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#CFAF4E]/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A2540]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs font-semibold text-[#333333]/70 uppercase tracking-wide mb-1 font-['Inter']">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-sm sm:text-base font-medium text-[#0A2540] hover:text-[#CFAF4E] break-all font-['Inter']"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-[#F4F4F4] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#CFAF4E]/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#CFAF4E]/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A2540]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs font-semibold text-[#333333]/70 uppercase tracking-wide mb-1 font-['Inter']">
                        Phone Number
                      </p>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-sm sm:text-base font-medium text-[#0A2540] hover:text-[#CFAF4E] font-['Inter']"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-gradient-to-br from-[#F4F4F4] to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#CFAF4E]/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#CFAF4E]/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A2540]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs font-semibold text-[#333333]/70 uppercase tracking-wide mb-2 font-['Inter']">
                        Message
                      </p>
                      <p className="text-xs sm:text-sm text-[#333333] leading-relaxed whitespace-pre-wrap font-['Inter']">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Date Info */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-[#F4F4F4] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#CFAF4E]/20">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          selectedContact.isRead
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      />
                      <p className="text-[10px] sm:text-xs font-semibold text-[#333333]/70 uppercase tracking-wide font-['Inter']">
                        Status
                      </p>
                    </div>
                    <p
                      className={`text-xs sm:text-sm font-semibold ${
                        selectedContact.isRead
                          ? "text-green-700"
                          : "text-yellow-700"
                      } font-['Inter']`}
                    >
                      {selectedContact.isRead ? "Read" : "Unread"}
                    </p>
                  </div>

                  <div className="bg-[#F4F4F4] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#CFAF4E]/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#333333]/70" />
                      <p className="text-[10px] sm:text-xs font-semibold text-[#333333]/70 uppercase tracking-wide font-['Inter']">
                        Submitted
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#333333] font-['Inter']">
                      {new Date(selectedContact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={handleCloseModals}
                  className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 border-2 border-gray-300 text-[#333333] font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-['Inter'] text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleCloseModals();
                    handleDeleteClick(selectedContact);
                  }}
                  className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-2 font-['Inter'] text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal - Mobile Optimized */}
      {showDeleteModal && selectedContact && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={handleCloseModals}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <div
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-8 relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModals}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-all duration-200"
                disabled={deletingId === selectedContact._id}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 mb-3 sm:mb-5 mx-auto">
                <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>

              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#0A2540] mb-2 sm:mb-3 text-center">
                Delete Contact?
              </h3>

              <p className="text-xs sm:text-sm text-[#333333]/70 mb-4 sm:mb-6 text-center leading-relaxed font-['Inter']">
                Are you sure you want to delete the contact from{" "}
                <span className="font-semibold text-[#0A2540]">
                  {selectedContact.fullName}
                </span>
                ?<br />
                <span className="text-red-600 font-medium">
                  This action cannot be undone.
                </span>
              </p>

              <div className="bg-gradient-to-br from-[#F4F4F4] to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-[#CFAF4E]/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#333333]/70 flex-shrink-0" />
                    <span className="font-medium text-[#0A2540] font-['Inter']">
                      {selectedContact.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#333333]/70 flex-shrink-0" />
                    <span className="text-[#333333] font-['Inter'] break-all">
                      {selectedContact.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#333333]/70 flex-shrink-0" />
                    <span className="text-[#333333] font-['Inter']">
                      {selectedContact.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleCloseModals}
                  disabled={deletingId === selectedContact._id}
                  className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 border-2 border-gray-300 text-[#333333] font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-['Inter'] text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deletingId === selectedContact._id}
                  className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-['Inter'] text-sm"
                >
                  {deletingId === selectedContact._id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}
