import React, { useState } from "react";
import { Search, Home, Award, ArrowRight } from "lucide-react";
import Button from "../Button";
// import { Highlight, Link, TextWithLinks } from "../LinkAndHighlights";
import HeroImage from "../../assets/hero_image.avif";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen h-auto sm:h-screen sm:man-h-[600px] md:min-h-[800px]  flex items-center overflow-hidden py-12 sm:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Modern Architecture"
          className="w-full h-full object-cover lg:object-cover"
        />
      </div>

      {/* Gradient Overlay - Darker on very small screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/75 via-gray-700/60 to-gray-700/50 sm:bg-gradient-to-t sm:from-gray-700/70 sm:via-gray-700/50 sm:to-gray-700/30 lg:bg-gradient-to-r lg:from-gray-700/40 lg:via-gray-700/20 lg:to-gray-700/10 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-4 lg:w-[60%] sm:space-y-6 text-center lg:text-left w-full">
            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl  xs:text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-normal leading-tight text-white">
                Find Properties On Sale in UAE.
              </h1>
            </div>

            {/* Description */}
            <p className="font-serif  text-sm xs:text-md  text-center lg:text-left justified sm:text-base md:text-lg text-white leading-relaxed max-w-xl mx-auto lg:mx-0  xs:px-0">
              We simplify your journey to discovering the finest
              properties in Dubai.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                rightIcon={
                  <ArrowRight
                    height={18}
                    width={18}
                    className="xs:h-5 xs:w-5 align-middle"
                  />
                }
                onClick={() => navigate("/properties")}
                variant="primary"
                className="border border-light-gray font-luxury text-sm xs:text-base sm:text-lg px-4 xs:px-6 py-2.5 xs:py-3 whitespace-nowrap"
              >
                <span className="hidden xs:inline">Discover Luxury</span>
                <span className="inline xs:hidden">Discover Luxury</span>
              </Button>
            </div>
          </div>

          {/* Right Content - Search & Stats */}
          {/* <div className="flex-1 max-w-full lg:max-w-md w-full backdrop-blur-sm p-3 xs:p-4 sm:p-4 rounded-lg lg:self-end lg:ml-auto">
 
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
              <div className="p-2 flex-1">
                <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4">
                  <div className="p-2 xs:p-2.5 sm:p-3 bg-gold/10 rounded-lg sm:rounded-4xl flex-shrink-0">
                    <Home className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-light-gray" />
                  </div>
                  <div className="font-luxury text-lg xs:text-xl md:text-2xl  font-bold text-light-gray leading-tight">
                    Residential Properties Available
                  </div>
                </div>
              </div>
              <div className="hidden xs:block border-r-2 border-navy-light self-stretch"></div>

            
              <div className="rounded-lg p-2 flex-1 align-middle">
                <div className="flex  items-center gap-2.5 xs:gap-3 sm:gap-4">
                  <div className="p-2 xs:p-2.5 sm:p-3 bg-gold/10 rounded-lg sm:rounded-4xl flex-shrink-0">
                    <Award className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-light-gray" />
                  </div>

                  <div className=" flex font-luxury text-lg xs:text-xl md:text-2xl font-bold text-light-gray leading-tight">
                    Industry Experience
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
