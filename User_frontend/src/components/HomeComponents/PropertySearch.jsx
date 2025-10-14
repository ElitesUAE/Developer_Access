// src/components/PropertySearch.jsx - SINGLE SEARCH BUTTON FOR ALL FILTERS
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  ChevronUp,
} from "lucide-react";
import Dropdown from "../Dropdown";

function PropertySearch({ onTabChange, onSearch, initialFilters = {} }) {
  const [activeTab, setActiveTab] = useState(initialFilters.tab || "all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    city: initialFilters.city || "",
    location: initialFilters.location || "",
    propertyType: initialFilters.propertyType || "",
    price: initialFilters.price || "",
    developer: initialFilters.developer || "",
    bedrooms: initialFilters.bedrooms || "",
    bathrooms: initialFilters.bathrooms || "",
    areaSize: initialFilters.areaSize || "",
    amenities: initialFilters.amenities || [],
  });

  const advancedRef = useRef(null);
  const [advancedHeight, setAdvancedHeight] = useState(0);

  useEffect(() => {
    if (advancedRef.current) {
      setAdvancedHeight(advancedRef.current.scrollHeight);
    }
  }, [showAdvanced, formData]);

  const propertyTypes = [
    { value: "", label: "Select" },
    { value: "Apartment", label: "Apartment" },
    { value: "Penthouses", label: "Penthouses" },
    { value: "Townhouses", label: "Townhouses" },
    { value: "Villas", label: "Villas" },
  ];

  const priceRanges = [
    { value: "", label: "Select" },
    { value: "1000000", label: "AED 1,00,000 - 10,00,000" },
    { value: "2000000", label: "AED 10,00,000 - 20,00,000" },
    { value: "3000000", label: "AED 20,00,000 - 30,00,000" },
    { value: "4000000", label: "AED 30,00,000 - 40,00,000" },
    { value: "5000000", label: "AED 40,00,000 - 50,00,000" },
    { value: "above", label: "AED 50,00,000 & Above" },
  ];

  const rooms = [
    { value: "", label: "Select" },
    { value: "1 BHK", label: "1" },
    { value: "2 BHK", label: "2" },
    { value: "3 BHK", label: "3" },
    { value: "4 BHK", label: "4" },
    { value: "5 BHK", label: "5" },
    { value: "6 BHK", label: "6" },
    { value: "7 BHK", label: "7" },
  ];

  const amenitiesList = [
    { value: "Balcony", label: "Balcony" },
    { value: "Basement", label: "Basement" },
    { value: "Parking", label: "Parking" },
    { value: "Central Heating", label: "Central Heating" },
    { value: "Cleaning Service", label: "Cleaning Service" },
    { value: "Dining Room", label: "Dining Room" },
    { value: "Service Elevator", label: "Service Elevator" },
    { value: "Gym", label: "Gym" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Upgrade Interior", label: "Upgrade Interior" },
    { value: "Walk-in Closet", label: "Walk-in Closet" },
    { value: "View landmark", label: "View landmark" },
    { value: "Public Park", label: "Public Park" },
    { value: "Garden", label: "Garden" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // ✅ SINGLE SUBMIT HANDLER - Includes ALL filters including amenities
  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      tab: activeTab,
      ...formData, // ✅ Includes amenities array
    };

    console.log(
      "🔍 Submitting search with ALL filters (including amenities):",
      searchData
    );
    onSearch?.(searchData);
  };

  const handleAmenityToggle = (value) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter((a) => a !== value)
        : [...prev.amenities, value],
    }));
  };

  const TabButton = ({ value, label }) => (
    <button
      type="button"
      onClick={() => handleTabChange(value)}
      className={`px-4 sm:px-6 md:px-8 py-3 font-['Inter'] font-medium text-sm sm:text-base rounded-md rounded-b-none transition-all duration-300 ${
        activeTab === value
          ? "bg-gold text-navy border-b-2 border-gold"
          : "bg-light-gray text-charcoal-gray hover:bg-[#E4C666] hover:text-navy"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-2 font-['Inter']">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-[#CFAF4E]/30">
        <TabButton value="all" label="All" />
        <TabButton value="rent" label="Rent" />
        <TabButton value="buy" label="Buy" />
        <TabButton value="offplan" label="Off-Plan" />
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 border border-[#CFAF4E]/20"
      >
        {/* Main Search Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* City Dropdown */}
          <div>
            <label className="block text-[#333333] font-medium mb-2 font-['Playfair_Display']">
              City
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white border border-[#CFAF4E]/30 rounded-lg font-['Inter'] text-sm text-[#333333] hover:bg-[#CFAF4E]/5 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] transition-all duration-200 appearance-none"
              >
                <option value="">Select City</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ras Al Khaimah (RAK)">
                  Ras Al Khaimah (RAK)
                </option>
                <option value="Ajman">Ajman</option>
                <option value="Fujairah">Fujairah</option>
              </select>
              {/* Dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#CFAF4E]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#333333] font-medium mb-2 font-['Playfair_Display']">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Enter location"
              className="w-full px-4 py-2.5 bg-white border border-[#CFAF4E]/30 rounded-lg font-['Inter'] text-sm text-[#333333] placeholder-[#333333]/50 hover:bg-[#CFAF4E]/5 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] transition-all duration-200"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-[#333333] font-medium mb-2 font-['Playfair_Display']">
              Property Type
            </label>
            <div className="relative">
              <Dropdown
                options={propertyTypes}
                value={formData?.propertyType}
                onChange={(selectedValue) =>
                  setFormData({ ...formData, propertyType: selectedValue })
                }
                placeholder="Select Property Type"
                className="w-full"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[#333333] font-medium mb-2 font-['Playfair_Display']">
              Price Range
            </label>
            <div className="relative">
              <Dropdown
                options={priceRanges}
                value={formData?.price}
                onChange={(selectedValue) =>
                  setFormData({ ...formData, price: selectedValue })
                }
                placeholder="Select Price Range"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Advanced Toggle Button */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-center sm:justify-start gap-2 text-[#CFAF4E] hover:text-[#B8973A] font-medium transition-all duration-300 px-4 py-2 rounded-md hover:bg-[#CFAF4E]/10"
          >
            <SlidersHorizontal
              size={18}
              className={`transition-transform duration-300 ${
                showAdvanced ? "rotate-90" : ""
              }`}
            />
            Advanced Filters
            {/* ✅ Show selected amenities count */}
            {formData.amenities.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-[#CFAF4E] text-[#0A2540] text-xs font-semibold rounded-full">
                {formData.amenities.length}
              </span>
            )}
            {showAdvanced ? (
              <ChevronUp
                size={18}
                className="transition-transform duration-300"
              />
            ) : (
              <ChevronDown
                size={18}
                className="transition-transform duration-300"
              />
            )}
          </button>

          {/* ✅ ONLY ONE SEARCH BUTTON - Desktop */}
          <button
            type="submit"
            className="hidden md:flex items-center gap-2 ml-auto px-8 py-3 bg-[#0A2540] text-[#CFAF4E] font-semibold rounded-md hover:bg-[#1A3A5C] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Search size={18} />
            Search Properties
          </button>
        </div>

        {/* Advanced Filters */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out p-1"
          style={{
            maxHeight: showAdvanced ? `${advancedHeight}px` : "0px",
            opacity: showAdvanced ? 1 : 0,
          }}
        >
          <div ref={advancedRef} className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Developer */}
              <div className="group">
                <h3 className="font-['Playfair_Display'] text-[#0A2540] font-semibold mb-3 transition-colors group-hover:text-[#CFAF4E]">
                  Developer
                </h3>
                <input
                  type="text"
                  value={formData.developer}
                  onChange={(e) =>
                    setFormData({ ...formData, developer: e.target.value })
                  }
                  placeholder="Enter developer name"
                  className="w-full px-4 py-2.5 bg-white border border-[#CFAF4E]/30 rounded-lg font-['Inter'] text-sm text-[#333333] placeholder-[#333333]/50 hover:bg-[#CFAF4E]/5 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] transition-all duration-200"
                />
              </div>

              {/* Bedrooms */}
              <div className="group">
                <h3 className="font-['Playfair_Display'] text-[#0A2540] font-semibold mb-3 transition-colors group-hover:text-[#CFAF4E]">
                  Bedrooms
                </h3>
                <div className="relative">
                  <Dropdown
                    options={rooms}
                    value={formData?.bedrooms}
                    onChange={(selectedValue) =>
                      setFormData({ ...formData, bedrooms: selectedValue })
                    }
                    placeholder="Select Bedrooms"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Bathrooms */}
              <div className="group">
                <h3 className="font-['Playfair_Display'] text-[#0A2540] font-semibold mb-3 transition-colors group-hover:text-[#CFAF4E]">
                  Bathrooms
                </h3>
                <div className="relative">
                  <Dropdown
                    options={rooms}
                    value={formData?.bathrooms}
                    onChange={(selectedValue) =>
                      setFormData({ ...formData, bathrooms: selectedValue })
                    }
                    placeholder="Select Bathrooms"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Size (Sqft) */}
              <div className="group">
                <h3 className="font-['Playfair_Display'] text-[#0A2540] font-semibold mb-3 transition-colors group-hover:text-[#CFAF4E]">
                  Min Size (Sqft)
                </h3>
                <input
                  type="text"
                  value={formData.areaSize}
                  onChange={(e) =>
                    setFormData({ ...formData, areaSize: e.target.value })
                  }
                  placeholder="Enter minimum size"
                  className="w-full px-4 py-2.5 bg-white border border-[#CFAF4E]/30 rounded-lg font-['Inter'] text-sm text-[#333333] placeholder-[#333333]/50 hover:bg-[#CFAF4E]/5 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] transition-all duration-200"
                />
              </div>
            </div>

            {/* ✅ Amenities Section - Part of main search */}
            <div className="mt-6">
              <h3 className="font-['Playfair_Display'] text-[#0A2540] font-semibold mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#CFAF4E] rounded-full"></div>
                Amenities
                {formData.amenities.length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-[#CFAF4E]/20 text-[#0A2540] text-xs font-semibold rounded-full">
                    {formData.amenities.length} selected
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity.value}
                    className="flex items-center gap-2 cursor-pointer group/item hover:bg-white rounded-lg p-2 transition-all duration-200"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.value)}
                        onChange={() => handleAmenityToggle(amenity.value)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border-2 border-[#CFAF4E] rounded bg-white peer-checked:bg-[#CFAF4E] peer-checked:border-[#CFAF4E] transition-all flex items-center justify-center">
                        {formData.amenities.includes(amenity.value) && (
                          <svg
                            className="w-3 h-3 text-[#0A2540]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-[#333333] group-hover/item:text-[#0A2540] transition-colors">
                      {amenity.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ✅ NO SEPARATE APPLY FILTERS BUTTON - Removed */}
          </div>
        </div>

        {/* ✅ ONLY ONE SEARCH BUTTON - Mobile */}
        <button
          type="submit"
          className="flex md:hidden items-center justify-center gap-2 w-full mt-6 px-8 py-3 bg-[#0A2540] text-[#CFAF4E] font-semibold rounded-md hover:bg-[#1A3A5C] transition-all duration-300 shadow-md transform active:scale-95"
        >
          <Search size={18} />
          Search Properties
          {formData.amenities.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-[#CFAF4E] text-[#0A2540] text-xs font-semibold rounded-full">
              {formData.amenities.length} filters
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default PropertySearch;
