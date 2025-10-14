// src/pages/PropertiesPage.jsx - FULLY RESPONSIVE VERSION
import { useEffect, useState } from "react";
import { usePropertyStore } from "../store/usePropertyStore";
import {
  Pencil,
  Trash2,
  Loader2,
  Plus,
  X,
  Home,
  MapPin,
  Building2,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PropertyTable() {
  const navigate = useNavigate();
  const {
    adminProperties,
    adminPropertiesCount,
    loading,
    error,
    fetchAllPropertiesAdmin,
    deleteProperty,
    addToHomePage,
    removeFromHomePage,
  } = usePropertyStore();
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [togglingHomePage, setTogglingHomePage] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        await fetchAllPropertiesAdmin();
      } catch (error) {
        toast.error("Failed to load properties");
      }
    };
    loadProperties();
  }, []);

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDeleteModal]);

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    setDeletingId(propertyToDelete._id);
    const loadingToast = toast.loading("Deleting property...");

    try {
      await deleteProperty(propertyToDelete._id);
      toast.success("Property deleted successfully! 🎉", {
        id: loadingToast,
      });
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete property",
        {
          id: loadingToast,
        }
      );
    } finally {
      setDeletingId(null);
      setPropertyToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin/properties/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin/properties/create");
  };

  const handleHomePageToggle = async (property) => {
    const homePageCount = adminProperties.filter((p) => p.isOnHomePage).length;

    if (!property.isOnHomePage && homePageCount >= 8) {
      toast.error("Maximum 8 properties allowed on homepage");
      return;
    }

    setTogglingHomePage(property._id);

    try {
      if (property.isOnHomePage) {
        await removeFromHomePage(property._id);
        toast.success("Property removed from homepage");
      } else {
        await addToHomePage(property._id);
        toast.success("Property added to homepage");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update homepage status"
      );
    } finally {
      setTogglingHomePage(null);
    }
  };

  if (loading && adminProperties?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#CFAF4E]" />
      </div>
    );
  }

  const homePageCount = adminProperties.filter((p) => p.isOnHomePage).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#0A2540]">
                All Properties
              </h1>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
                Manage your property listings
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] transition-all duration-300 shadow-md hover:shadow-lg font-['Inter'] font-semibold text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Property
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
            <p className="font-medium text-sm sm:text-base font-['Inter']">
              Error
            </p>
            <p className="text-xs sm:text-sm font-['Inter']">{error}</p>
          </div>
        )}

        {/* Properties Count - Mobile Optimized */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-[#CFAF4E]/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
              Total Properties:{" "}
              <span className="font-semibold text-[#0A2540]">
                {adminPropertiesCount}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
              Homepage Properties:{" "}
              <span
                className={`font-semibold ${
                  homePageCount >= 8 ? "text-red-600" : "text-green-600"
                }`}
              >
                {homePageCount} / 8
              </span>
            </p>
          </div>
        </div>

        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#CFAF4E]/10">
              <thead className="bg-[#0A2540]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Floors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Total Units
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Homepage
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#CFAF4E]/10">
                {adminProperties?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-[#333333]/70"
                    >
                      <div className="flex flex-col items-center">
                        <Building2 className="w-16 h-16 text-[#CFAF4E] mb-4" />
                        <p className="text-lg font-medium font-['Playfair_Display'] text-[#0A2540]">
                          No properties found
                        </p>
                        <p className="text-sm mt-1 font-['Inter']">
                          Get started by creating your first property
                        </p>
                        <button
                          onClick={handleCreate}
                          className="mt-4 px-4 py-2 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] transition-colors font-['Inter'] font-semibold"
                        >
                          Create Property
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  adminProperties?.map((property) => (
                    <tr
                      key={property._id}
                      className="hover:bg-[#F4F4F4] transition-colors duration-150"
                    >
                      {/* Image */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-16 w-24 rounded-lg overflow-hidden bg-gray-100 border border-[#CFAF4E]/20">
                          <img
                            src={property?.images?.[0] || property?.image}
                            alt={property?.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[#0A2540] max-w-xs truncate font-['Inter']">
                          {property.title}
                        </div>
                        <div className="text-xs text-[#333333]/70 mt-1 font-['Inter']">
                          {property.location}
                        </div>
                      </td>

                      {/* Property Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#CFAF4E]/20 text-[#0A2540] font-['Inter']">
                          {property.propertyType}
                        </span>
                      </td>

                      {/* City */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#333333] font-['Inter']">
                          {property.city}
                        </div>
                      </td>

                      {/* Floors */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#333333] font-['Inter']">
                          {property.floors}
                        </div>
                      </td>

                      {/* Total Units */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#333333] font-['Inter']">
                          {property.totalUnits}
                        </div>
                      </td>

                      {/* Homepage Checkbox */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          {togglingHomePage === property._id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[#CFAF4E]" />
                          ) : (
                            <input
                              type="checkbox"
                              checked={property.isOnHomePage || false}
                              onChange={() => handleHomePageToggle(property)}
                              className="w-5 h-5 text-[#CFAF4E] bg-gray-100 border-[#CFAF4E] rounded focus:ring-[#CFAF4E] focus:ring-2 cursor-pointer"
                              title={
                                property.isOnHomePage
                                  ? "Remove from homepage"
                                  : "Add to homepage"
                              }
                            />
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(property._id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="Edit Property"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteClick(property)}
                            disabled={deletingId === property._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            title="Delete Property"
                          >
                            {deletingId === property._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
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

        {/* Mobile Card View - Visible on Mobile/Tablet */}
        <div className="lg:hidden space-y-3 sm:space-y-4">
          {adminProperties?.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-[#CFAF4E]/20">
              <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#CFAF4E] mx-auto mb-4" />
              <p className="text-base sm:text-lg font-medium font-['Playfair_Display'] text-[#0A2540]">
                No properties found
              </p>
              <p className="text-xs sm:text-sm mt-1 font-['Inter'] text-[#333333]/70">
                Get started by creating your first property
              </p>
              <button
                onClick={handleCreate}
                className="mt-4 px-4 py-2 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] transition-colors font-['Inter'] font-semibold text-sm"
              >
                Create Property
              </button>
            </div>
          ) : (
            adminProperties?.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-[#CFAF4E]/20 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                  <img
                    src={property?.images?.[0] || property?.image}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Homepage Badge */}
                  {property.isOnHomePage && (
                    <div className="absolute top-2 right-2 bg-[#CFAF4E] text-[#0A2540] px-2 py-1 rounded-full text-xs font-semibold font-['Inter'] shadow-md">
                      <Home className="w-3 h-3 inline mr-1" />
                      Homepage
                    </div>
                  )}
                  {/* Property Type Badge */}
                  <div className="absolute top-2 left-2 bg-[#0A2540]/80 backdrop-blur-sm text-[#CFAF4E] px-2 py-1 rounded-full text-xs font-semibold font-['Inter']">
                    {property.propertyType}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  {/* Title */}
                  <h3 className="font-['Playfair_Display'] text-base sm:text-lg font-semibold text-[#0A2540] mb-1 line-clamp-2">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-[#333333]/70 mb-3 font-['Inter']">
                    <MapPin
                      size={14}
                      className="text-[#CFAF4E] flex-shrink-0"
                    />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3 pb-3 border-b border-[#CFAF4E]/10">
                    <div className="flex flex-col items-center">
                      <span className="text-[#333333]/60 text-xs font-['Inter']">
                        City
                      </span>
                      <span className="text-[#0A2540] text-xs sm:text-sm font-semibold font-['Inter'] truncate w-full text-center">
                        {property.city}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#333333]/60 text-xs font-['Inter']">
                        Floors
                      </span>
                      <span className="text-[#0A2540] text-xs sm:text-sm font-semibold font-['Inter']">
                        {property.floors}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[#333333]/60 text-xs font-['Inter']">
                        Units
                      </span>
                      <span className="text-[#0A2540] text-xs sm:text-sm font-semibold font-['Inter']">
                        {property.totalUnits}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Homepage Toggle */}
                    <div className="flex items-center gap-2 flex-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-[#333333] font-['Inter']">
                        {togglingHomePage === property._id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#CFAF4E]" />
                        ) : (
                          <input
                            type="checkbox"
                            checked={property.isOnHomePage || false}
                            onChange={() => handleHomePageToggle(property)}
                            className="w-4 h-4 text-[#CFAF4E] bg-gray-100 border-[#CFAF4E] rounded focus:ring-[#CFAF4E] focus:ring-2 cursor-pointer"
                          />
                        )}
                        <span className="hidden sm:inline">Homepage</span>
                      </label>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(property._id)}
                      className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-['Inter'] font-medium"
                      title="Edit Property"
                    >
                      <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(property)}
                      disabled={deletingId === property._id}
                      className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 disabled:opacity-50 font-['Inter'] font-medium"
                      title="Delete Property"
                    >
                      {deletingId === property._id ? (
                        <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Loading Overlay */}
        {loading && adminProperties.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <Loader2 className="w-8 h-8 animate-spin text-[#CFAF4E]" />
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal - Mobile Optimized */}
      {showDeleteModal && propertyToDelete && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={handleDeleteCancel}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-8 relative pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleDeleteCancel}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-all duration-200"
                disabled={deletingId === propertyToDelete._id}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 mb-4 sm:mb-5 mx-auto animate-in zoom-in duration-500">
                <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>

              {/* Title */}
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#0A2540] mb-2 sm:mb-3 text-center">
                Delete Property?
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#333333]/70 mb-4 sm:mb-6 text-center leading-relaxed font-['Inter']">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#0A2540]">
                  "{propertyToDelete.title}"
                </span>
                ?<br />
                <span className="text-red-600 font-medium">
                  This action cannot be undone
                </span>{" "}
                and all property data will be permanently deleted.
              </p>

              {/* Property Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200 shadow-inner">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={
                        propertyToDelete.images?.[0] || propertyToDelete.image
                      }
                      alt={propertyToDelete.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-md border-2 border-white"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#0A2540] truncate mb-1 font-['Inter']">
                      {propertyToDelete.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#333333]/70 mb-1 font-['Inter']">
                      <span className="px-2 py-0.5 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full font-medium text-[10px] sm:text-xs">
                        {propertyToDelete.propertyType}
                      </span>
                      <span>•</span>
                      <span className="truncate">{propertyToDelete.city}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#333333]/70 font-['Inter']">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 flex-shrink-0" />
                        {propertyToDelete.totalUnits} Units
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        {propertyToDelete.floors} Floors
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deletingId === propertyToDelete._id}
                  className="flex-1 px-4 py-2.5 sm:py-3 border-2 border-gray-300 text-[#333333] font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-['Inter'] text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deletingId === propertyToDelete._id}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-['Inter'] text-sm sm:text-base"
                >
                  {deletingId === propertyToDelete._id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Property
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
