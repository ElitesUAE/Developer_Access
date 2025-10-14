// src/pages/EditPropertyPage.jsx - FULLY RESPONSIVE VERSION
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePropertyStore } from "../store/usePropertyStore";
import toast from "react-hot-toast";
import {
  Upload,
  X,
  Plus,
  Minus,
  Loader2,
  ArrowLeft,
  Trash2,
  AlertCircle,
  ImageIcon,
  Save,
} from "lucide-react";
import Dropdown from "../components/Dropdown";

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentProperty,
    fetchPropertyById,
    updateProperty,
    deletePropertyImage,
    loading,
  } = usePropertyStore();

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    city: "",
    location: "",
    propertyStatus: "",
    startingPrice: "",
    bhkCount: "",
    bathCount: "",
    totalArea: "",
    description: "",
    developer: "",
    usp: "",
    constructionStatus: "",
    handover: "",
    floors: "",
    elevation: "",
    paymentPlan: "",
    totalUnits: "",
    views: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [deletingImage, setDeletingImage] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // Fetch property data on mount
  useEffect(() => {
    const loadProperty = async () => {
      const loadingToast = toast.loading("Loading property data...");
      try {
        await fetchPropertyById(id);
        toast.success("Property loaded successfully", {
          id: loadingToast,
        });
      } catch (error) {
        toast.error("Failed to load property data", {
          id: loadingToast,
        });
        setFetchError("Failed to load property data");
      }
    };
    loadProperty();
  }, [id]);

  // Populate form when currentProperty is loaded
  useEffect(() => {
    if (currentProperty) {
      setFormData({
        title: currentProperty.title || "",
        propertyType: currentProperty.propertyType || "",
        city: currentProperty.city || "",
        location: currentProperty.location || "",
        propertyStatus: currentProperty.propertyStatus || "",
        startingPrice: currentProperty.startingPrice || "",
        bhkCount: currentProperty.bhkCount || "",
        bathCount: currentProperty.bathCount || "",
        totalArea: currentProperty.totalArea || "",
        description: currentProperty.description || "",
        developer: currentProperty.developer || "",
        usp: currentProperty.usp || "",
        constructionStatus: currentProperty.constructionStatus || "",
        handover: currentProperty.handover || "",
        floors: currentProperty.floors || "",
        elevation: currentProperty.elevation || "",
        paymentPlan: currentProperty.paymentPlan || "",
        totalUnits: currentProperty.totalUnits || "",
        views: currentProperty.views || "",
      });

      setExistingImages(currentProperty.images || []);
      setUnitTypes(
        currentProperty.unitTypes?.length > 0
          ? currentProperty.unitTypes
          : [{ type: "", totalAreaStart: "", totalAreaEnd: "", price: "" }]
      );
      setHighlights(
        currentProperty.highlights?.length > 0
          ? currentProperty.highlights
          : [""]
      );
      setAmenities(
        currentProperty.amenities?.length > 0 ? currentProperty.amenities : [""]
      );
    }
  }, [currentProperty]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new image upload
  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setNewImages((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} new image(s) added`);

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove new image (not yet uploaded)
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
    toast.success("New image removed");
  };

  // Delete existing image from server
  const handleDeleteExistingImage = async (imageUrl) => {
    toast(
      (t) => (
        <div>
          <p className="font-medium mb-2 font-['Inter']">Delete this image?</p>
          <p className="text-sm text-[#333333]/70 mb-3 font-['Inter']">
            This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performImageDelete(imageUrl);
              }}
              className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 font-['Inter']"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300 font-['Inter']"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const performImageDelete = async (imageUrl) => {
    setDeletingImage(imageUrl);
    const loadingToast = toast.loading("Deleting image...");

    try {
      await deletePropertyImage(id, imageUrl);
      setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
      toast.success("Image deleted successfully! 🗑️", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete image", {
        id: loadingToast,
      });
    } finally {
      setDeletingImage(null);
    }
  };

  // Unit Types handlers
  const handleUnitTypeChange = (index, field, value) => {
    const updated = [...unitTypes];
    updated[index][field] = value;
    setUnitTypes(updated);
  };

  const addUnitType = () => {
    setUnitTypes([
      ...unitTypes,
      { type: "", totalAreaStart: "", totalAreaEnd: "", price: "" },
    ]);
    toast.success("Unit type added");
  };

  const removeUnitType = (index) => {
    setUnitTypes(unitTypes.filter((_, i) => i !== index));
    toast.success("Unit type removed");
  };

  // Highlights handlers
  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addHighlight = () => {
    setHighlights([...highlights, ""]);
    toast.success("Highlight added");
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
    toast.success("Highlight removed");
  };

  // Amenities handlers
  const handleAmenityChange = (index, value) => {
    const updated = [...amenities];
    updated[index] = value;
    setAmenities(updated);
  };

  const addAmenity = () => {
    setAmenities([...amenities, ""]);
    toast.success("Amenity added");
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
    toast.success("Amenity removed");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingImages.length === 0 && newImages.length === 0) {
      toast.error("Please have at least one image", {
        icon: "📷",
      });
      return;
    }

    const filteredUnitTypes = unitTypes.filter(
      (ut) => ut.type && ut.totalAreaStart && ut.totalAreaEnd && ut.price
    );
    const filteredHighlights = highlights.filter((h) => h.trim() !== "");
    const filteredAmenities = amenities.filter((a) => a.trim() !== "");

    if (filteredUnitTypes.length === 0) {
      toast.error("Please add at least one unit type with all details filled");
      return;
    }

    if (filteredAmenities.length === 0) {
      toast.error("Please add at least one amenity");
      return;
    }

    const loadingToast = toast.loading("Updating property...");

    try {
      await updateProperty(id, {
        ...formData,
        images: newImages,
        unitTypes: filteredUnitTypes,
        highlights: filteredHighlights,
        amenities: filteredAmenities,
      });

      toast.success("Property updated successfully! ✨", {
        id: loadingToast,
        duration: 4000,
      });

      setTimeout(() => {
        navigate("/admin/properties");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update property. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.error(error);
    }
  };

  if (loading && !currentProperty) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#CFAF4E]" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
        <div className="text-center p-4">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#0A2540] mb-2">
            Error
          </h2>
          <p className="text-[#333333]/70 mb-4 font-['Inter'] text-sm sm:text-base">
            {fetchError}
          </p>
          <button
            onClick={() => navigate("/admin/properties")}
            className="px-4 py-2 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] transition-colors font-['Inter'] font-semibold text-sm sm:text-base"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  if (!currentProperty) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8 pb-24 sm:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/admin/properties")}
            className="flex items-center gap-2 text-[#333333] hover:text-[#0A2540] mb-3 sm:mb-4 transition-colors font-['Inter'] text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Properties
          </button>
          <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#0A2540]">
            Edit Property
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#333333]/70 font-['Inter']">
            Update property details and manage images
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Existing Images Section - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540] mb-3 sm:mb-4">
              Current Images ({existingImages.length})
            </h2>

            {existingImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {existingImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden border-2 border-[#CFAF4E]/20 hover:border-[#CFAF4E] transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bottom Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-2 sm:p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 rounded backdrop-blur-sm font-['Inter']">
                          #{index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDeleteExistingImage(imageUrl)}
                          disabled={
                            deletingImage === imageUrl ||
                            existingImages.length === 1
                          }
                          className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-1 text-[10px] sm:text-xs font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 font-['Inter']"
                        >
                          {deletingImage === imageUrl ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span className="hidden sm:inline">Deleting</span>
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-3 h-3" />
                              <span className="hidden sm:inline">Delete</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Last Image Warning */}
                    {existingImages.length === 1 && (
                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 right-1 sm:right-2">
                        <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-500 text-white text-[9px] sm:text-xs font-medium rounded-lg shadow-lg flex items-center gap-1 justify-center font-['Inter']">
                          <AlertCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">Last Image</span>
                          <span className="sm:hidden">Last</span>
                        </div>
                      </div>
                    )}

                    {/* Deleting Overlay */}
                    {deletingImage === imageUrl && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                        <div className="bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-xl flex items-center gap-2">
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-red-600" />
                          <span className="text-xs sm:text-sm font-medium text-[#0A2540] font-['Inter']">
                            Deleting...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                    <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <p className="text-[#333333]/70 font-medium mb-1 font-['Inter'] text-sm sm:text-base">
                    No existing images
                  </p>
                  <p className="text-xs sm:text-sm text-[#333333]/60 font-['Inter']">
                    Please add new images below
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Add New Images Section - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540] mb-3 sm:mb-4">
              Add New Images ({newImages.length})
            </h2>

            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="newImages"
                className="flex flex-col items-center justify-center w-full h-32 sm:h-48 border-2 border-dashed border-[#CFAF4E]/30 rounded-lg cursor-pointer hover:border-[#CFAF4E] hover:bg-[#CFAF4E]/5 transition-all duration-200"
              >
                <div className="flex flex-col items-center justify-center pt-3 pb-3 sm:pt-5 sm:pb-6">
                  <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-[#CFAF4E] mb-2 sm:mb-3" />
                  <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-[#333333]/70 text-center px-2 font-['Inter']">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#333333]/60 font-['Inter']">
                    PNG, JPG, WEBP (MAX. 10MB)
                  </p>
                </div>
                <input
                  id="newImages"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleNewImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {newImagePreviews?.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-[#333333] mb-2 sm:mb-3 font-['Inter']">
                  New Images to Upload
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                  {newImagePreviews?.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border-2 border-green-200 hover:border-green-400 transition-colors"
                    >
                      <img
                        src={preview}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 sm:h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-600 text-white text-[10px] sm:text-xs rounded shadow font-['Inter']">
                        New {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Basic Information - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540] mb-3 sm:mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData?.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Property Type *
                </label>
                <input
                  type="text"
                  name="propertyType"
                  value={formData?.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Property Status *
                </label>
                <Dropdown
                  options={[
                    { value: "", label: "Select" },
                    { value: "Rent", label: "Rent" },
                    { value: "Buy", label: "Buy" },
                    { value: "Off-Plan", label: "Off-Plan" },
                  ]}
                  value={formData?.propertyStatus}
                  onChange={(value) =>
                    handleChange({ target: { name: "propertyStatus", value } })
                  }
                  placeholder="Select Status"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData?.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData?.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Developer *
                </label>
                <input
                  type="text"
                  name="developer"
                  value={formData?.developer}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Construction Status *
                </label>
                <Dropdown
                  options={[
                    { value: "", label: "Select Status" },
                    { value: "Off-Plan", label: "Off-Plan" },
                    {
                      value: "Under Construction",
                      label: "Under Construction",
                    },
                    {
                      value: "Site Preparation Completed",
                      label: "Site Preparation Completed",
                    },
                    {
                      value: "Nearing Completion",
                      label: "Nearing Completion",
                    },
                    { value: "Completed", label: "Completed" },
                    { value: "Ready to Move", label: "Ready to Move" },
                  ]}
                  value={formData?.constructionStatus}
                  onChange={(value) =>
                    handleChange({
                      target: { name: "constructionStatus", value },
                    })
                  }
                  placeholder="Select Status"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Property Details - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540] mb-3 sm:mb-4">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Starting Price (AED) *
                </label>
                <input
                  type="number"
                  name="startingPrice"
                  value={formData?.startingPrice}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  BHK Count *
                </label>
                <input
                  type="number"
                  name="bhkCount"
                  value={formData?.bhkCount}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Bathrooms *
                </label>
                <input
                  type="number"
                  name="bathCount"
                  value={formData?.bathCount}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Total Area (sqft) *
                </label>
                <input
                  type="number"
                  name="totalArea"
                  value={formData?.totalArea}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Floors *
                </label>
                <input
                  type="number"
                  name="floors"
                  value={formData?.floors}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Total Units *
                </label>
                <input
                  type="number"
                  name="totalUnits"
                  value={formData?.totalUnits}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Elevation *
                </label>
                <input
                  type="text"
                  name="elevation"
                  value={formData?.elevation}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Handover *
                </label>
                <input
                  type="text"
                  name="handover"
                  value={formData?.handover}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Payment Plan *
                </label>
                <input
                  type="text"
                  name="paymentPlan"
                  value={formData?.paymentPlan}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Views *
                </label>
                <input
                  type="text"
                  name="views"
                  value={formData?.views}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  USP (Unique Selling Points) *
                </label>
                <textarea
                  name="usp"
                  value={formData?.usp}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent resize-none text-sm sm:text-base font-['Inter']"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 sm:mb-2 font-['Inter']">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent resize-none text-sm sm:text-base font-['Inter']"
                />
              </div>
            </div>
          </div>

          {/* Unit Types - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540]">
                Unit Types * ({unitTypes.length})
              </h2>
              <button
                type="button"
                onClick={addUnitType}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] transition-colors font-['Inter'] font-medium"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add Unit</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {unitTypes.map((unitType, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 border border-[#CFAF4E]/20 rounded-lg relative hover:border-[#CFAF4E] transition-colors"
                >
                  {unitTypes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUnitType(index)}
                      className="absolute top-2 right-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 font-['Inter']">
                        Type
                      </label>
                      <input
                        type="text"
                        value={unitType.type}
                        onChange={(e) =>
                          handleUnitTypeChange(index, "type", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] text-sm font-['Inter']"
                        placeholder="e.g., 2 BHK"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 font-['Inter']">
                        Area Start (sqft)
                      </label>
                      <input
                        type="number"
                        value={unitType.totalAreaStart}
                        onChange={(e) =>
                          handleUnitTypeChange(
                            index,
                            "totalAreaStart",
                            e.target.value
                          )
                        }
                        min="0"
                        className="w-full px-3 py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] text-sm font-['Inter']"
                        placeholder="1000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 font-['Inter']">
                        Area End (sqft)
                      </label>
                      <input
                        type="number"
                        value={unitType.totalAreaEnd}
                        onChange={(e) =>
                          handleUnitTypeChange(
                            index,
                            "totalAreaEnd",
                            e.target.value
                          )
                        }
                        min="0"
                        className="w-full px-3 py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] text-sm font-['Inter']"
                        placeholder="1300"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-1.5 font-['Inter']">
                        Price (AED)
                      </label>
                      <input
                        type="number"
                        value={unitType.price}
                        onChange={(e) =>
                          handleUnitTypeChange(index, "price", e.target.value)
                        }
                        min="0"
                        className="w-full px-3 py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] text-sm font-['Inter']"
                        placeholder="950000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540]">
                Highlights ({highlights.length})
              </h2>
              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-['Inter'] font-medium"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] text-sm font-['Inter']"
                    placeholder="e.g., Prime location with 270° views"
                  />
                  {highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities - Mobile Optimized */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CFAF4E]/20">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-[#0A2540]">
                Amenities * ({amenities.length})
              </h2>
              <button
                type="button"
                onClick={addAmenity}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-['Inter'] font-medium"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] text-sm font-['Inter']"
                    placeholder="e.g., Swimming Pool"
                  />
                  {amenities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons - Mobile Sticky */}
          <div className="fixed bottom-0 left-0 right-0 sm:static bg-white p-3 sm:p-4 rounded-none sm:rounded-lg shadow-2xl sm:shadow-lg border-t sm:border border-[#CFAF4E]/20 z-10">
            <div className="flex items-center justify-end gap-2 sm:gap-4 max-w-4xl mx-auto">
              <button
                type="button"
                onClick={() => navigate("/admin/properties")}
                disabled={loading}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 text-[#333333] rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-['Inter'] text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] disabled:opacity-50 transition-colors shadow-md hover:shadow-lg font-['Inter'] font-semibold text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="hidden sm:inline">Updating...</span>
                    <span className="sm:hidden">Updating</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Update Property</span>
                    <span className="sm:hidden">Update</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
