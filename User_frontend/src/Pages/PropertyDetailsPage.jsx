// src/pages/PropertyDetailsPage.jsx - WITH CALLBACK MODAL INTEGRATION
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Phone,
  ChevronDown,
  ChevronUp,
  Loader2,
  Share2,
} from "lucide-react";
import Button from "../components/Button";
import CallbackModal from "../components/PropertyComponents/CallbackModal"; // ✅ Correct import path
import { usePropertyStore } from "../store/usePropertyStore";
import toast from "react-hot-toast";
import StructuredData from "../components/StructuredData";
import useSEO from "../hooks/useSEO";
const PropertyDetailsPage = () => {
  // All hooks at the top — no conditions!
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Zustand store
  const { currentProperty, loading, error, fetchPropertyById } =
    usePropertyStore();

  // Fetch property on mount
  useEffect(() => {
    const loadProperty = async () => {
      try {
        await fetchPropertyById(id);
      } catch (err) {
        console.error("Error loading property:", err);
        toast.error("Failed to load property details");
      }
    };
    loadProperty();
  }, [id, fetchPropertyById]);

  // SEO hook (always called, never in a condition)
  useSEO({
    title: currentProperty
      ? `${currentProperty.title} | Elite In Emirates`
      : "Property Details",
    description: currentProperty
      ? `${currentProperty.description?.substring(0, 160)}... Luxury ${
          currentProperty.type
        } in ${currentProperty.location}, Dubai.`
      : "",
    keywords: currentProperty
      ? `${currentProperty.location}, ${currentProperty.type}, Dubai property, luxury real estate, ${currentProperty.bedrooms} bedroom property`
      : "",
    ogTitle: currentProperty?.title,
    ogDescription: currentProperty?.description,
    ogImage: currentProperty?.images?.[0],
    ogUrl: `https://eliteinemirates.com/properties/${id}`,
    canonical: `https://eliteinemirates.com/properties/${id}`,
  });

  // Utility functions (never hooks, safe to be here)
  const handlePrevImage = () => {
    if (currentProperty?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentProperty.images.length - 1 : prev - 1
      );
    }
  };
  const handleNextImage = () => {
    if (currentProperty?.images) {
      setCurrentImageIndex((prev) =>
        prev === currentProperty.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProperty?.title || "Property Details",
          text: `Check out this property: ${currentProperty?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Error sharing:", error);
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const getTruncatedDescription = () => {
    if (!currentProperty?.description) return "";
    if (currentProperty.description.length <= 150) {
      return currentProperty.description;
    }
    return currentProperty.description.substring(0, 150) + "...";
  };

  const getPropertyForModal = () => {
    if (!currentProperty) return null;
    return {
      id: currentProperty._id,
      title: currentProperty.title,
      location: currentProperty.location,
      price: currentProperty.startingPrice
        ? `AED ${currentProperty.startingPrice.toLocaleString()}`
        : "Price on request",
    };
  };

  const structuredData = currentProperty
    ? {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: currentProperty.title,
        description: currentProperty.description,
        image: currentProperty.images,
        price: currentProperty.price,
        priceCurrency: "AED",
        address: {
          "@type": "PostalAddress",
          addressLocality: currentProperty.location,
          addressCountry: "UAE",
          addressRegion: "Dubai",
        },
        numberOfRooms: currentProperty.bedrooms,
        floorSize: {
          "@type": "QuantitativeValue",
          value: currentProperty.area,
          unitCode: "SQM",
        },
        amenityFeature: currentProperty.amenities?.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity,
        })),
      }
    : null;

  // "Early returns" are AFTER all hooks
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#CFAF4E]" />
          <p className="text-[#333333]/70 font-['Inter']">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !currentProperty) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-16 px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="font-['Playfair_Display'] text-2xl text-[#0A2540] mb-2">
            Property Not Found
          </h3>
          <p className="font-['Inter'] text-[#333333]/70 mb-6">
            {error || "The property you're looking for doesn't exist."}
          </p>
          <Button variant="primary" onClick={() => navigate("/properties")}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  // Main render unchanged — everything works as before!
  const property = currentProperty;
  const propertyForModal = getPropertyForModal();

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="border-b border-[#CFAF4E]/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#0A2540] hover:text-[#CFAF4E] transition-colors font-['Inter']"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            {/* Share Button */}
            {/* <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[#0A2540] hover:text-[#CFAF4E] transition-colors font-['Inter'] text-sm"
            >
              <Share2 size={18} />
              Share
            </button> */}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden group">
                <img
                  src={
                    property?.images?.[currentImageIndex] ||
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200"
                  }
                  alt={property?.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image Navigation - Only show if multiple images */}
                {property?.images && property?.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronLeft size={24} className="text-[#0A2540]" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronRight size={24} className="text-[#0A2540]" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0A2540]/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-['Inter'] text-sm">
                      {currentImageIndex + 1} / {property?.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 gap-4">
                {property?.images &&
                  property?.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-[190px] lg:h-[290px] rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => setCurrentImageIndex(index + 1)}
                    >
                      <img
                        src={image}
                        alt={`${property?.title} - ${index + 2}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#0A2540]/0 group-hover:bg-[#0A2540]/20 transition-colors" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Property Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Location */}
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0A2540] mb-3">
                  {property?.title || "Property Title"}
                </h1>
                <div className="flex items-center gap-2 text-[#333333]/70 mb-4">
                  <MapPin size={18} className="text-[#CFAF4E]" />
                  <span className="font-['Inter'] text-base">
                    {property?.city && `${property?.city}, `}
                    {property?.location || "Location not available"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-3xl md:text-4xl font-bold text-[#0A2540] font-['Playfair_Display']">
                    AED{" "}
                    {property?.startingPrice?.toLocaleString() ||
                      "Price on request"}
                  </p>
                  {property?.propertyStatus && (
                    <span className="px-4 py-1 bg-[#0A2540] text-[#CFAF4E] rounded-full text-sm font-semibold font-['Inter']">
                      {property?.propertyStatus}
                    </span>
                  )}
                </div>
              </div>

              {/* Key Stats */}
              <div className="flex items-center gap-6 py-4 border-y border-[#CFAF4E]/20">
                <div className="flex items-center gap-2">
                  <Bed size={20} className="text-[#CFAF4E]" />
                  <span className="font-['Inter'] font-medium text-[#0A2540]">
                    {property?.bhkCount || 0} BHK
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath size={20} className="text-[#CFAF4E]" />
                  <span className="font-['Inter'] font-medium text-[#0A2540]">
                    {property?.bathCount || 0} Bath
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 size={20} className="text-[#CFAF4E]" />
                  <span className="font-['Inter'] font-medium text-[#0A2540]">
                    {property?.totalArea || "N/A"} sqft
                  </span>
                </div>
              </div>

              {/* Description with Expand/Collapse */}
              {property?.description && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] mb-3">
                    Description
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      showFullDescription ? "max-h-[2000px]" : "max-h-[120px]"
                    }`}
                  >
                    <p className="font-['Inter'] text-[#333333] text-base leading-relaxed whitespace-pre-line">
                      {showFullDescription
                        ? property?.description
                        : getTruncatedDescription()}
                    </p>
                  </div>
                  {property?.description.length > 150 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="flex items-center gap-2 text-[#CFAF4E] font-['Inter'] text-sm font-medium hover:underline mt-3 transition-all"
                    >
                      {showFullDescription ? (
                        <>
                          Show less
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Show more
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Property Details Card */}
              <div className="bg-[#0A2540] rounded-lg p-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold border-b-2 border-[#CFAF4E] text-[#CFAF4E] mb-6 pb-2 text-center">
                  Property Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {property?.propertyType && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        PROPERTY TYPE
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.propertyType}
                      </span>
                    </div>
                  )}

                  {property?.developer && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        DEVELOPER
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.developer}
                      </span>
                    </div>
                  )}

                  {property?.usp && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        USP
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.usp}
                      </span>
                    </div>
                  )}

                  {property?.constructionStatus && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        CONSTRUCTION STATUS
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.constructionStatus}
                      </span>
                    </div>
                  )}

                  {property?.handover && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        HANDOVER
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.handover}
                      </span>
                    </div>
                  )}

                  {property?.floors && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        FLOORS
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.floors}
                      </span>
                    </div>
                  )}

                  {property?.elevation && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        ELEVATION
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.elevation}
                      </span>
                    </div>
                  )}

                  {property?.paymentPlan && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        PAYMENT PLAN
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.paymentPlan}
                      </span>
                    </div>
                  )}

                  {property?.totalUnits && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        TOTAL UNITS
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.totalUnits}
                      </span>
                    </div>
                  )}

                  {property?.views && (
                    <div className="flex justify-between items-start pb-3 border-b border-[#CFAF4E]/20">
                      <span className="font-['Inter'] text-[#CFAF4E]/70 text-sm font-medium uppercase tracking-wide">
                        VIEWS
                      </span>
                      <span className="font-['Inter'] text-white text-sm text-right max-w-[60%]">
                        {property?.views}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Unit Types & Configurations */}
              {property?.unitTypes && property?.unitTypes.length > 0 && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] mb-4">
                    Unit Types & Configurations
                  </h3>
                  <div className="space-y-3">
                    {property?.unitTypes.map((unit, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 bg-[#F4F4F4] rounded-lg hover:bg-[#CFAF4E]/10 transition-colors border border-[#CFAF4E]/20"
                      >
                        <div className="flex-1">
                          <p className="font-['Inter'] font-semibold text-[#0A2540] mb-1">
                            {unit.type}
                          </p>
                          {(unit.totalAreaStart || unit.totalAreaEnd) && (
                            <p className="font-['Inter'] text-sm text-[#333333]/70">
                              {unit.totalAreaStart} - {unit.totalAreaEnd} sqft
                            </p>
                          )}
                        </div>
                        {unit.price && (
                          <div className="text-left sm:text-right">
                            <p className="font-['Inter'] font-bold text-[#CFAF4E] text-lg">
                              AED {Number(unit.price).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {property?.highlights && property?.highlights.length > 0 && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] mb-4">
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {property?.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 font-['Inter'] text-[#333333]"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#CFAF4E] mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities */}
              {property?.amenities && property?.amenities.length > 0 && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] mb-4">
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property?.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 font-['Inter'] text-sm text-[#333333]"
                      >
                        <svg
                          className="w-4 h-4 text-[#CFAF4E] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Contact Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#0A2540] to-[#1A3A5C] border border-[#CFAF4E]/20 rounded-xl p-6 sticky top-4 shadow-xl">
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#CFAF4E] mb-2 text-center">
                  Interested in this property?
                </h3>
                <p className="text-white/80 text-sm text-center mb-6 font-['Inter']">
                  Get in touch with us for more information
                </p>

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => setIsCallbackModalOpen(true)}
                    leftIcon={<Phone size={18} />}
                  >
                    Request Callback
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Callback Modal with properly formatted property data */}
        {propertyForModal && (
          <CallbackModal
            isOpen={isCallbackModalOpen}
            onClose={() => setIsCallbackModalOpen(false)}
            property={propertyForModal}
          />
        )}
      </div>
    </>
  );
};

export default PropertyDetailsPage;
