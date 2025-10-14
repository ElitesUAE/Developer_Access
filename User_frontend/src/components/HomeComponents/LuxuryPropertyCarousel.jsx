import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CurvedPanoramicCarousel = ({ properties = [], loading = false }) => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ringRef = useRef(null);
  const navigate = useNavigate();

  // Configuration
  const config = {
    totalSlides: Math.max(8, properties.length), // At least 8 or property count
    radius: 850,
    slideHeight: 550,
    slideSpacing: 1,
    rotationSpeed: 0.1,
    autoRotate: true,
    pauseOnHover: true,
  };

  // Calculate slide width
  const calculateSlideWidth = () => {
    const circumference = 2 * Math.PI * config.radius;
    const totalGap = config.totalSlides * config.slideSpacing;
    return (circumference - totalGap) / config.totalSlides;
  };

  const slideWidth = calculateSlideWidth();

  // Auto-rotation
  useEffect(() => {
    if (!config.autoRotate || isPaused || properties.length === 0) return;

    const animate = () => {
      setRotation((prev) => (prev + config.rotationSpeed) % 360);
    };

    const intervalId = setInterval(animate, 1000 / 60);

    return () => clearInterval(intervalId);
  }, [isPaused, properties.length]);

  // Duplicate slides for seamless loop
  const duplicatedProperties = [];
  const neededSlides = config.totalSlides;
  if (properties.length > 0) {
    for (let i = 0; i < neededSlides; i++) {
      duplicatedProperties.push(properties[i % properties.length]);
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center py-4">
        <p className="text-charcoal-gray text-lg">No properties available</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-4 overflow-hidden">
      {/* Title Section */}
      <div className="text-center px-4">
        <h1 className="font-luxury text-navy text-5xl sm:text-6xl lg:text-7xl font-bold mb-2">
          Our Works
        </h1>
        <p className="text-[#CFAF4E] text-lg sm:text-xl font-luxury max-w-2xl mx-auto">
          Experience luxury properties in an immersive panoramic view
        </p>
      </div>

      {/* Curved Carousel Container */}
      <div
        className="curved-carousel relative w-full h-[40vh] sm:h-[40vh] md:h-[70vh] flex items-center justify-center overflow-visible"
        onMouseEnter={() => config.pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => config.pauseOnHover && setIsPaused(false)}
        style={{
          perspective: "850px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Stage Container */}
        <div className="stage relative w-full h-full flex items-center justify-center">
          {/* Ring - The rotating cylinder */}
          <div
            ref={ringRef}
            className="absolute"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition: "none",
              width: `${slideWidth}px`,
              height: `${config.slideHeight}px`,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Slides arranged in cylinder */}
            {duplicatedProperties.map((property, index) => {
              const angle = (360 / config.totalSlides) * index;
              const cardAngle = (angle + rotation) % 360;
              const isBackside = cardAngle > 60 && cardAngle < 300;

              const slideTransform = `rotateY(${angle}deg) translateZ(${config.radius}px)`;

              return (
                <div
                  key={`${property._id}-${index}`}
                  className="slide absolute top-0 left-0 w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: slideTransform,
                    width: `${config.slideWidth}px`,
                    height: `${config.slideHeight}px`,
                    backfaceVisibility: "hidden",
                    transformOrigin: "center center",
                    transform: `${slideTransform} ${
                      isBackside ? "scaleX(-1)" : "scaleX(1)"
                    }`,
                  }}
                >
                  <div
                    className="media relative w-full h-full rounded-xl  shadow-2xl border-2 border-[#CFAF4E]"
                    style={{
                      transform: isBackside ? "scaleX(-1)" : "scaleX(1)",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {/* Image */}
                    <img
                      src={property?.image}
                      alt={property?.title}
                      className="w-full h-full object-cover items-center"
                      draggable="false"
                      style={{
                        transform: isBackside ? "scaleX(-1)" : "scaleX(1)",
                      }}
                    />

                    {/* Gradient and details container */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-[#0A2540]/50 via-10% to-transparent"></div>
                    <div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      style={{
                        transform: isBackside ? "scaleX(-1)" : "scaleX(1)",
                      }}
                    >
                      <h3 className="font-['Playfair_Display'] text-white text-2xl font-bold mb-2">
                        {property.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#CFAF4E]" />
                        <p className="text-[#E4C666] text-lg font-semibold">
                          {property.location}
                        </p>
                      </div>

                      {/* Handover Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-[#CFAF4E]" />
                        <p className="text-white/90 text-sm font-medium">
                          Handover: {property.handover}
                        </p>
                      </div>

                      <p className="font-luxury text-[#CFAF4E] text-4xl font-bold">
                        AED {property.startingPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View All CTA */}
      <div className="mt-2 text-center z-20">
        <Button
          variant="outline"
          rightIcon={
            <ArrowRight className="h-6 w-6 align-middle items-center justify-center" />
          }
          onClick={() => navigate("/properties")}
        >
          Explore All Properties
        </Button>
      </div>

      <style jsx="true">{`
        .curved-carousel {
          position: relative;
        }

        .stage {
          transform-style: preserve-3d;
        }

        .ring {
          transform-style: preserve-3d;
        }

        .slide {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .curved-carousel {
            perspective: 400px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CurvedPanoramicCarousel;
