// src/pages/PropertiesPage.jsx - UPDATED TO USE SEARCH API
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertySearch from "../components/HomeComponents/PropertySearch";
import PropertyCard from "../components/PropertyComponents/PropertyCard";
import PropertyTypeContent from "../components/PropertyComponents/PropertyTypeContent";
import PropertyTypeFAQ from "../components/PropertyComponents/PropertyTypeFAQ";
import Button from "../components/Button";
import { Grid3x3, List, SlidersHorizontal, Loader2 } from "lucide-react";
import { usePropertyStore } from "../store/usePropertyStore";
import toast from "react-hot-toast";
import Dropdown from "../components/Dropdown";
import StructuredData from "../components/StructuredData";
import useSEO from "../hooks/useSEO";
function PropertiesPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState([]);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activePropertyType, setActivePropertyType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Use searchProperties instead of fetchProperties
  const { properties, loading, error, searchProperties } = usePropertyStore();

  // Store search filters
  const [searchFilters, setSearchFilters] = useState({
    tab: "all",
    city: "",
    location: "",
    propertyType: "",
    price: "",
    developer: "",
    bedrooms: "",
    bathrooms: "",
    areaSize: "",
    amenities: [],
    page: 1,
    limit: 12,
  });

  // ✅ Load properties on mount and when filters change
  useEffect(() => {
    const loadProperties = async () => {
      try {
        console.log("🔍 Loading properties with filters:", searchFilters);
        await searchProperties(searchFilters);
      } catch (err) {
        console.error("Error loading properties:", err);
        toast.error("Failed to load properties");
      }
    };

    loadProperties();
  }, [searchFilters]);

  // Sort properties
  const getSortedProperties = () => {
    if (!properties || properties.length === 0) return [];

    let sorted = [...properties];

    switch (sortBy) {
      case "newest":
        break;
      case "price-low":
        sorted.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
        break;
      case "price-high":
        sorted.sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0));
        break;
      case "popular":
        break;
      default:
        break;
    }

    return sorted;
  };

  const sortedProperties = getSortedProperties();

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleRequestCallback = (property) => {
    setSelectedProperty(property);
    setIsCallbackModalOpen(true);
  };

  const handleViewDetails = (propertyId) => {
    console.log("Navigating to property:", propertyId);
    navigate(`/property/${propertyId}`);
  };

  // Handle tab change
  const handlePropertyTypeChange = (type) => {
    setActivePropertyType(type);
    setSearchFilters((prev) => ({
      ...prev,
      tab: type,
      page: 1,
    }));
    setCurrentPage(1);
  };

  // ✅ Handle search submit - Direct API call
  const handleSearchSubmit = (filters) => {
    console.log("🔍 Search submitted with filters:", filters);

    setSearchFilters({
      ...filters,
      page: 1,
      limit: 12,
    });
    setActivePropertyType(filters.tab);
    setCurrentPage(1);

    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        window.scrollTo({
          top: resultsSection.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const defaultFilters = {
      tab: "all",
      city: "",
      location: "",
      propertyType: "",
      price: "",
      developer: "",
      bedrooms: "",
      bathrooms: "",
      areaSize: "",
      amenities: [],
      page: 1,
      limit: 12,
    };
    setSearchFilters(defaultFilters);
    setCurrentPage(1);
    setActivePropertyType("all");
  };

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    setSearchFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setSearchFilters((prev) => ({ ...prev, page: prev.page - 1 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSearchFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to get property image with fallback
  const getPropertyImage = (property) => {
    if (property?.image && typeof property?.image === "string") {
      return property?.image;
    }

    if (
      property?.images &&
      Array.isArray(property?.images) &&
      property?.images.length > 0
    ) {
      return property?.images[0];
    }

    return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80";
  };
  useSEO({
    title: "Luxury Properties for Sale in Dubai | Elite In Emirates",
    description:
      "Browse our exclusive collection of luxury properties in Dubai. Villas, penthouses, and apartments in premium locations. Find your dream property today.",
    keywords:
      "Dubai properties for sale, luxury villas Dubai, premium apartments UAE, Dubai real estate listings, properties in Dubai Marina, Palm Jumeirah properties, Downtown Dubai apartments",
    ogImage:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    canonical: "https://eliteinemirates.com/properties",
  });

  // Structured Data for Property Listingss
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Luxury Properties in Dubai",
    itemListElement: properties.map((property, index) => ({
      "@type": "RealEstateListing",
      position: index + 1,
      name: property?.title,
      description: property?.description,
      image: property?.images?.[0],
      price: property?.price,
      priceCurrency: "AED",
      address: {
        "@type": "PostalAddress",
        addressLocality: property?.location,
        addressCountry: "UAE",
      },
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#0A2540] via-[#0A2540] to-[#1A3A5C] text-white py-8 md:py-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OS00LTQtNHoiIGZpbGw9IiNDRkFGNEUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#CFAF4E]">
                Discover Your Dream Property
              </h1>
              <p className="font-['Inter'] text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Explore our exclusive collection of luxury properties in Dubai's
                most prestigious locations
              </p>
            </div>
          </div>
        </div>

        {/* Search Component */}
        <div className="relative -mt-12 z-10">
          <PropertySearch
            onTabChange={handlePropertyTypeChange}
            onSearch={handleSearchSubmit}
            initialFilters={searchFilters}
          />
        </div>

        {/* Main Content */}
        <div
          id="results-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#CFAF4E]/20">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0A2540] mb-1">
                {activePropertyType === "all"
                  ? "All Properties"
                  : activePropertyType === "rent"
                  ? "Properties for Rent"
                  : activePropertyType === "buy"
                  ? "Properties for Sale"
                  : "Off-Plan Properties"}
              </h2>
              <p className="font-['Inter'] text-[#333333]/70">
                {loading
                  ? "Loading properties..."
                  : `Showing ${sortedProperties.length} properties`}
              </p>

              {/* Active Filters Display */}
              {/* Active Filters Display */}
              {(searchFilters.city ||
                searchFilters.location ||
                searchFilters.propertyType ||
                searchFilters.bedrooms ||
                searchFilters.developer ||
                searchFilters.amenities?.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {searchFilters.tab !== "all" && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      📋{" "}
                      {searchFilters.tab.charAt(0).toUpperCase() +
                        searchFilters.tab.slice(1)}
                    </span>
                  )}
                  {searchFilters.city && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      🏙️ {searchFilters.city}
                    </span>
                  )}
                  {searchFilters.location && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      📍 {searchFilters.location}
                    </span>
                  )}
                  {searchFilters.developer && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      🏢 {searchFilters.developer}
                    </span>
                  )}
                  {searchFilters.bedrooms && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      🛏️ {searchFilters.bedrooms}
                    </span>
                  )}
                  {searchFilters.propertyType && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      🏠 {searchFilters.propertyType}
                    </span>
                  )}
                  {/* ✅ Display selected amenities */}
                  {searchFilters.amenities?.length > 0 && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFAF4E]/20 text-[#0A2540] rounded-full text-sm">
                      ✨ {searchFilters.amenities.length} Amenities
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Dropdown
                  options={[
                    { value: "", label: "Select" },
                    { value: "newest", label: "Newest First" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    // { value: "popular", label: "Most Popular" },
                  ]}
                  value={sortBy}
                  onChange={setSortBy}
                  icon={SlidersHorizontal}
                  placeholder="Sort By"
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex gap-2 bg-white border border-[#CFAF4E]/30 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-[#0A2540] text-[#CFAF4E]"
                      : "text-[#333333] hover:bg-[#F4F4F4]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-[#0A2540] text-[#CFAF4E]"
                      : "text-[#333333] hover:bg-[#F4F4F4]"
                  }`}
                  aria-label="List view"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-[#CFAF4E] mb-4" />
              <p className="text-[#333333]/70 font-['Inter']">
                Searching properties...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#0A2540] mb-2">
                Error Loading Properties
              </h3>
              <p className="font-['Inter'] text-[#333333]/70 mb-6">{error}</p>
              <Button
                variant="primary"
                onClick={() => searchProperties(searchFilters)}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Properties Grid/List */}
          {!loading && !error && sortedProperties.length > 0 && (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedProperties.map((property) => {
                    const propertyImage = getPropertyImage(property);

                    return (
                      <PropertyCard
                        key={property?._id}
                        property={{
                          id: property?._id,
                          title: property?.title || "Untitled Property",
                          location:
                            property?.location || "Location not specified",
                          price: property?.startingPrice
                            ? `AED ${property?.startingPrice.toLocaleString()}`
                            : "Price on request",
                          type: property?.propertyType || "Property",
                          bedrooms: property?.bhkCount || 0,
                          bathrooms: property?.bathCount || 0,
                          area: property?.totalArea
                            ? `${property?.totalArea} sqft`
                            : "Area not specified",
                          image: propertyImage,
                          features: property?.amenities?.slice(0, 4) || [],
                          status: property?.propertyStatus || "Available",
                          handover: property?.handover || "TBA",
                        }}
                        viewMode="grid"
                        isFavorite={favorites.includes(property?._id)}
                        onToggleFavorite={() => toggleFavorite(property?._id)}
                        onRequestCallback={() =>
                          handleRequestCallback(property)
                        }
                        onViewDetails={() => handleViewDetails(property?._id)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedProperties.map((property) => {
                    const propertyImage = getPropertyImage(property);

                    return (
                      <PropertyCard
                        key={property?._id}
                        property={{
                          id: property?._id,
                          title: property?.title || "Untitled Property",
                          location:
                            property?.location || "Location not specified",
                          price: property?.startingPrice
                            ? `AED ${property?.startingPrice.toLocaleString()}`
                            : "Price on request",
                          type: property?.propertyType || "Property",
                          bedrooms: property?.bhkCount || 0,
                          bathrooms: property?.bathCount || 0,
                          area: property?.totalArea
                            ? `${property?.totalArea} sqft`
                            : "Area not specified",
                          image: propertyImage,
                          features: property?.amenities?.slice(0, 4) || [],
                          status: property?.propertyStatus || "Available",
                          handover: property?.handover || "TBA",
                        }}
                        viewMode="list"
                        isFavorite={favorites.includes(property?._id)}
                        onToggleFavorite={() => toggleFavorite(property?._id)}
                        onRequestCallback={() =>
                          handleRequestCallback(property)
                        }
                        onViewDetails={() => handleViewDetails(property?._id)}
                      />
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[#CFAF4E]/20">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {[
                  ...Array(
                    Math.min(3, Math.ceil(sortedProperties.length / 12))
                  ),
                ].map((_, index) => (
                  <Button
                    key={index + 1}
                    variant={currentPage === index + 1 ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button variant="outline" size="sm" onClick={handleNextPage}>
                  Next
                </Button>
              </div>
            </>
          )}

          {/* No Properties Found */}
          {!loading && !error && sortedProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#0A2540] mb-2">
                No Properties Found
              </h3>
              <p className="font-['Inter'] text-[#333333]/70 mb-6">
                Try adjusting your search filters or browse all properties
              </p>
              <Button variant="primary" onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Dynamic Content */}
        <PropertyTypeContent type={activePropertyType} />
        <PropertyTypeFAQ type={activePropertyType} />
      </div>
    </>
  );
}

export default PropertiesPage;
