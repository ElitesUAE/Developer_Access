// src/components/PropertyCard.jsx - FIXED LAYOUT WITH CONSISTENT SPACING
import React, { useState } from "react";
import { MapPin, Bed, Bath, Maximize2, ArrowRight, Phone } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import CallbackModal from "./CallbackModal";

const PropertyCard = ({
  property,
  viewMode = "grid",
  isFavorite = false,
  onToggleFavorite,
  onRequestCallback,
  onViewDetails,
}) => {
  const navigate = useNavigate();
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false); // ✅ Modal state

  const handleViewClick = () => {
    navigate(`/property/${property?.id}`);
  };

  // ✅ Open callback modal
  const handleRequestCallback = () => {
    setIsCallbackModalOpen(true);
  };
  if (viewMode === "list") {
    return (
      <>
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#CFAF4E]/10">
          <div className="flex flex-col md:flex-row">
            {/* Image Container - Fixed Width */}
            <div className="relative md:w-96 h-64 md:h-auto flex-shrink-0 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-[#0A2540] text-[#CFAF4E] px-4 py-1 rounded-full text-sm font-semibold font-['Inter']">
                {property.status}
              </div>
            </div>

            {/* Content - Fixed Structure */}
            <div className="flex-1 p-2 flex flex-col">
              {/* Title - Fixed Height with Line Clamp */}
              <div className="mb-3 h-5">
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0A2540] line-clamp-2 group-hover:text-[#CFAF4E] transition-colors duration-300">
                  {property.title}
                </h3>
              </div>

              {/* Location - Fixed Height */}
              <div className="flex items-center gap-2 text-[#333333]/70 mb-4 h-6">
                <MapPin size={18} className="text-[#CFAF4E] flex-shrink-0" />
                <span className="text-base font-['Inter'] truncate">
                  {property.location}
                </span>
              </div>

              {/* Property Stats - Fixed Height */}
              <div className="flex items-center gap-6 mb-4 h-8">
                <div className="flex items-center gap-2">
                  <Bed size={20} className="text-[#CFAF4E] flex-shrink-0" />
                  <span className="text-base font-medium text-[#333333] font-['Inter'] whitespace-nowrap">
                    {property.bedrooms} Bed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath size={20} className="text-[#CFAF4E] flex-shrink-0" />
                  <span className="text-base font-medium text-[#333333] font-['Inter'] whitespace-nowrap">
                    {property.bathrooms} Bath
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2
                    size={20}
                    className="text-[#CFAF4E] flex-shrink-0"
                  />
                  <span className="text-base font-medium text-[#333333] font-['Inter'] whitespace-nowrap">
                    {property.area}
                  </span>
                </div>
              </div>

              {/* Features - Fixed Height */}
              <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden">
                {property.features?.slice(0, 4).map((feature, index) => (
                  <span
                    key={index}
                    className="text-sm bg-[#F4F4F4] text-[#333333] px-3 py-1.5 rounded-full font-['Inter'] h-fit whitespace-nowrap"
                  >
                    {feature}
                  </span>
                ))}
                {property.features?.length > 4 && (
                  <span className="text-sm bg-[#CFAF4E]/20 text-[#0A2540] px-3 py-1.5 rounded-full font-['Inter'] h-fit whitespace-nowrap font-semibold">
                    +{property.features.length - 4}
                  </span>
                )}
              </div>

              {/* Spacer - Pushes bottom content down */}
              <div className="flex-grow"></div>

              {/* Bottom Section - Always at Bottom */}
              <div className="pt-4 border-t border-[#CFAF4E]/20 mt-auto">
                {/* Price - Fixed Height */}
                <div className="mb-4 h-20">
                  <p className="text-sm text-[#333333]/60 font-['Inter'] mb-1">
                    Starting Price
                  </p>
                  <p className="text-3xl font-bold text-[#0A2540] font-['Playfair_Display'] line-clamp-1">
                    {property.price}
                  </p>
                </div>

                {/* Buttons - Fixed Height */}
                <div className="flex flex-wrap gap-3 h-10">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onRequestCallback?.(property)}
                    leftIcon={<Phone className="h-4 w-4" />}
                    className="flex-1 min-w-[140px]"
                  >
                    Request Call
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleViewClick}
                    rightIcon={<ArrowRight size={18} />}
                    className="flex-1 min-w-[140px]"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ✅ Callback Modal */}
        <CallbackModal
          isOpen={isCallbackModalOpen}
          onClose={() => setIsCallbackModalOpen(false)}
          property={property}
        />
      </>
    );
  }

  // Grid View - Fixed Layout
  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#CFAF4E]/10 flex flex-col h-full">
        {/* Image Container - Fixed Height */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-[#0A2540] text-[#CFAF4E] px-4 py-1 rounded-full text-sm font-semibold font-['Inter']">
            {property.status}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-[#0A2540]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content - Flexible with Fixed Sections */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title - Fixed Height with Line Clamp */}
          <div className="mb-2 h-14">
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] line-clamp-2 group-hover:text-[#CFAF4E] transition-colors duration-300 leading-tight">
              {property.title}
            </h3>
          </div>

          {/* Location - Fixed Height */}
          <div className="flex items-center gap-2 text-[#333333]/70 mb-4 h-5">
            <MapPin size={16} className="text-[#CFAF4E] flex-shrink-0" />
            <span className="text-sm font-['Inter'] truncate">
              {property.location}
            </span>
          </div>

          {/* Property Stats - Fixed Height */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-[#CFAF4E]/20 h-12">
            <div className="flex items-center gap-1">
              <Bed size={18} className="text-[#CFAF4E] flex-shrink-0" />
              <span className="text-sm font-medium text-[#333333] font-['Inter']">
                {property.bedrooms}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={18} className="text-[#CFAF4E] flex-shrink-0" />
              <span className="text-sm font-medium text-[#333333] font-['Inter']">
                {property.bathrooms}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 size={18} className="text-[#CFAF4E] flex-shrink-0" />
              <span className="text-sm font-medium text-[#333333] font-['Inter'] truncate">
                {property.area}
              </span>
            </div>
          </div>

          {/* Features - Fixed Height */}
          <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden">
            {property?.features?.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-[#F4F4F4] text-[#333333] px-3 py-1 rounded-full font-['Inter'] h-fit whitespace-nowrap"
              >
                {feature}
              </span>
            ))}
            {property.features?.length > 3 && (
              <span className="text-xs bg-[#CFAF4E]/20 text-[#0A2540] px-3 py-1 rounded-full font-['Inter'] h-fit whitespace-nowrap font-semibold">
                +{property.features.length - 3}
              </span>
            )}
          </div>

          {/* Spacer - Pushes bottom content down */}
          <div className="flex-grow"></div>

          {/* Price Section - Fixed Height */}
          <div className="mb-4 h-16">
            <p className="text-sm text-[#333333]/60 font-['Inter'] mb-1">
              Starting Price
            </p>
            <p className="text-2xl font-bold text-[#0A2540] font-['Playfair_Display'] line-clamp-1">
              {property.price}
            </p>
          </div>

          {/* Buttons - Fixed Height - Always at Bottom */}
          <div className="flex flex-col gap-2 mt-auto">
            <Button
              variant="primary"
              size="sm"
              onClick={handleRequestCallback} // ✅ Open modal
              leftIcon={<Phone className="h-4 w-4" />}
              className="w-full"
            >
              Request Callback
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleViewClick}
              rightIcon={<ArrowRight size={18} />}
              className="w-full"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      {/* ✅ Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        property={property}
      />
    </>
  );
};

export default PropertyCard;
