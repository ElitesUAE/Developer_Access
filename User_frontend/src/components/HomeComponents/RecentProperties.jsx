import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Maximize2,
  MapPin,
  Calendar,
} from "lucide-react";

const RecentProperties = ({ properties = [], loading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + properties.length) % properties.length
    );
  };

  useEffect(() => {
    if (isAutoPlaying && properties.length > 0) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, properties.length]);

  const getCardStyle = (index) => {
    const position =
      (index - currentIndex + properties.length) % properties.length;

    if (position === 0) {
      return {
        transform: "translateX(0%) scale(1) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
        filter: "blur(0px)",
      };
    } else if (position === 1) {
      return {
        transform: "translateX(45%) scale(0.85) rotateY(-15deg)",
        zIndex: 20,
        opacity: 0.7,
        filter: "blur(1px)",
      };
    } else if (position === properties.length - 1) {
      return {
        transform: "translateX(-45%) scale(0.85) rotateY(15deg)",
        zIndex: 20,
        opacity: 0.7,
        filter: "blur(1px)",
      };
    } else {
      return {
        transform: "translateX(0%) scale(0.7)",
        zIndex: 10,
        opacity: 0,
        filter: "blur(3px)",
      };
    }
  };

  if (loading) {
    return (
      <section className="relative py-8 sm:py-10 bg-white overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="relative py-8 sm:py-10 bg-white overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-center h-96">
            <p className="text-charcoal-gray text-lg">
              No properties available
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 sm:py-10 bg-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* LEFT SIDE - Heading */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="relative">
              <div
                className="absolute -left-8 sm:-left-12 md:-left-16 -top-8 sm:-top-12 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 182, 193, 0.15) 0%, transparent 80%)",
                }}
              ></div>

              <div className="relative z-10">
                <p className="font-luxury text-charcoal-gray/60 text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4">
                  Our Recent
                </p>

                <h2 className="font-luxury text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-normal text-navy leading-tight mb-4 sm:mb-6">
                  Properties in
                  <br />
                  <span className="font-bold">UAE</span>
                </h2>

                <p className="font-luxury justified text-sm sm:text-base md:text-lg text-charcoal-gray/70 leading-relaxed mb-6 sm:mb-8">
                  With a large supply of properties, discover apartments,
                  houses, bungalows, and villas for rent or purchase, in your
                  city of choice.
                </p>

                {/* Counter & Navigation */}
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-luxury text-4xl sm:text-5xl md:text-6xl font-light text-gold">
                      {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="font-luxury text-lg sm:text-xl text-charcoal-gray/30">
                      / {String(properties.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => {
                        prevSlide();
                        setIsAutoPlaying(false);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-navy/20 hover:border-gold hover:bg-gold/5 flex items-center justify-center transition-all duration-300 group"
                    >
                      <ChevronLeft
                        className="w-5 h-5 sm:w-6 sm:h-6 text-navy group-hover:text-gold transition-colors"
                        strokeWidth={1.5}
                      />
                    </button>
                    <button
                      onClick={() => {
                        nextSlide();
                        setIsAutoPlaying(false);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-navy/20 hover:border-gold hover:bg-gold/5 flex items-center justify-center transition-all duration-300 group"
                    >
                      <ChevronRight
                        className="w-5 h-5 sm:w-6 sm:h-6 text-navy group-hover:text-gold transition-colors"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 3D Carousel */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div
              className="relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
              style={{ perspective: "2000px" }}
            >
              {properties.map((property, index) => {
                const style = getCardStyle(index);
                const position =
                  (index - currentIndex + properties.length) %
                  properties.length;

                return (
                  <div
                    key={property._id}
                    className="absolute top-1/2 left-1/2 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                    style={{
                      ...style,
                      pointerEvents: position === 0 ? "auto" : "none",
                    }}
                    onClick={() => {
                      if (position === 0) {
                        navigate(`/property/${property._id}`);
                      } else if (position === 1) {
                        nextSlide();
                        setIsAutoPlaying(false);
                      } else if (position === properties.length - 1) {
                        prevSlide();
                        setIsAutoPlaying(false);
                      }
                    }}
                  >
                    {/* Property Card */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
                      {/* Image Container */}
                      <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
                        <img
                          src={
                            property.image || "https://via.placeholder.com/400"
                          }
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/15 to-navy/10"></div>

                        {/* Property Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#36454F]/80 via-[#36454F]/80 to-transparent text-white">
                          <h3 className="font-luxury text-xl sm:text-2xl md:text-3xl font-bold text-light-gray mb-2 sm:mb-3 leading-tight">
                            {property.title}
                          </h3>

                          <div className="flex items-start gap-1.5 mb-3 sm:mb-4">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0 mt-0.5" />
                            <p className="font-luxury text-xs sm:text-sm text-white/90 leading-relaxed">
                              {property.location}
                            </p>
                          </div>

                          {/* Property Details */}
                          <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                                <Bed
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                                  strokeWidth={1.5}
                                />
                                <span className="font-luxury text-xs sm:text-sm text-white font-medium">
                                  {property.bhkCount} BHK
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                                <Maximize2
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                                  strokeWidth={1.5}
                                />
                                <span className="font-luxury text-xs sm:text-sm text-white font-medium">
                                  {property.totalArea} Sqft
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                                <Calendar
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                                  strokeWidth={1.5}
                                />
                                <span className="font-luxury text-xs sm:text-sm text-white font-medium">
                                  {property.handover}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-1.5 sm:gap-2">
                            <span className="font-luxury text-sm sm:text-base text-gold/90">
                              AED
                            </span>
                            <span className="font-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-gold">
                              {property.startingPrice?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {properties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 sm:w-10 md:w-12 h-1.5 sm:h-2 bg-gold"
                      : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-navy/20 hover:bg-navy/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;
