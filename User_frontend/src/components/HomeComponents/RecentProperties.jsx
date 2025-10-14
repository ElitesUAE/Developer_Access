// import React, { useState, useEffect, useRef } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Bed,
//   Maximize2,
//   MapPin,
// } from "lucide-react";

// const RecentProperties = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayRef = useRef(null);

//   const properties = [
//     {
//       id: 1,
//       title: "ARMANI BEACH RESIDENCE",
//       location: "Armani Beach Residences Palm Jumeirah",
//       price: "21,500,000",
//       bedrooms: "2 BHK",
//       sqft: "2657 Sqft",
//       image:
//         "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
//       developer: "ARADA",
//     },
//     {
//       id: 2,
//       title: "The Acres by Meraas",
//       location: "The Acres Dubailand",
//       price: "5,090,000",
//       bedrooms: "3 BHK",
//       sqft: "3049 Sqft",
//       image:
//         "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
//       developer: "MERAAS",
//     },
//     {
//       id: 3,
//       title: "Eden Hills At MBR City",
//       location: "Eden Hills At MBR City",
//       price: "18,100,000",
//       bedrooms: "5 BHK",
//       sqft: "12916 Sqft",
//       image:
//         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
//       developer: "EMAAR",
//     },
//     {
//       id: 4,
//       title: "Damac Casa",
//       location: "Palm Jumeirah - Dubai",
//       price: "3,600,000",
//       bedrooms: "1 BHK",
//       sqft: "1397 Sqft",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
//       developer: "DAMAC",
//     },
//     {
//       id: 5,
//       title: "Palm Jabel Ali Villas",
//       location: "Palm Jabel Ali - Jebel Ali",
//       price: "19,000,000",
//       bedrooms: "5 BHK",
//       sqft: "7727 Sqft",
//       image:
//         "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
//       developer: "NAKHEEL",
//     },
//     {
//       id: 6,
//       title: "Marina Heights Tower",
//       location: "Dubai Marina - UAE",
//       price: "2,500,000",
//       bedrooms: "2 BHK",
//       sqft: "1200 Sqft",
//       image:
//         "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
//       developer: "EMAAR",
//     },
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % properties.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + properties.length) % properties.length
//     );
//   };

//   useEffect(() => {
//     if (isAutoPlaying) {
//       autoPlayRef.current = setInterval(() => {
//         nextSlide();
//       }, 4000);
//     }
//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying, currentIndex]);

//   const getCardStyle = (index) => {
//     const position =
//       (index - currentIndex + properties.length) % properties.length;

//     // Center card (main)
//     if (position === 0) {
//       return {
//         transform: "translateX(0%) scale(1) rotateY(0deg)",
//         zIndex: 30,
//         opacity: 1,
//         filter: "blur(0px)",
//       };
//     }
//     // Right card
//     else if (position === 1) {
//       return {
//         transform: "translateX(45%) scale(0.85) rotateY(-15deg)",
//         zIndex: 20,
//         opacity: 0.7,
//         filter: "blur(1px)",
//       };
//     }
//     // Left card
//     else if (position === properties.length - 1) {
//       return {
//         transform: "translateX(-45%) scale(0.85) rotateY(15deg)",
//         zIndex: 20,
//         opacity: 0.7,
//         filter: "blur(1px)",
//       };
//     }
//     // Hidden cards
//     else {
//       return {
//         transform: "translateX(0%) scale(0.7)",
//         zIndex: 10,
//         opacity: 0,
//         filter: "blur(3px)",
//       };
//     }
//   };

//   return (
//     <section className="relative py-8 sm:py-10 bg-white overflow-hidden">
//       <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
//           {/* LEFT SIDE - Heading */}
//           <div className="lg:col-span-4 xl:col-span-3">
//             <div className="relative">
//               <div
//                 className="absolute -left-8 sm:-left-12 md:-left-16 -top-8 sm:-top-12 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(circle, rgba(255, 182, 193, 0.15) 0%, transparent 80%)",
//                 }}
//               ></div>

//               <div className="relative z-10">
//                 <p className="font-luxury text-charcoal-gray/60 text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4">
//                   Our Recent
//                 </p>

//                 <h2 className="font-luxury text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-normal text-navy leading-tight mb-4 sm:mb-6">
//                   Properties in
//                   <br />
//                   <span className="font-bold">UAE</span>
//                 </h2>

//                 <p className="font-luxury justified text-sm sm:text-base md:text-lg text-charcoal-gray/70 leading-relaxed mb-6 sm:mb-8">
//                   With a large supply of properties, discover apartments,
//                   houses, bungalows, and villas for rent or purchase, in your
//                   city of choice.
//                 </p>

//                 {/* Counter & Navigation */}
//                 <div className="flex items-center gap-6 sm:gap-8">
//                   <div className="flex items-baseline gap-2">
//                     <span className="font-luxury text-4xl sm:text-5xl md:text-6xl font-light text-gold">
//                       {String(currentIndex + 1).padStart(2, "0")}
//                     </span>
//                     <span className="font-luxury text-lg sm:text-xl text-charcoal-gray/30">
//                       / {String(properties.length).padStart(2, "0")}
//                     </span>
//                   </div>

//                   <div className="flex gap-2 sm:gap-3">
//                     <button
//                       onClick={() => {
//                         prevSlide();
//                         setIsAutoPlaying(false);
//                       }}
//                       className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-navy/20 hover:border-gold hover:bg-gold/5 flex items-center justify-center transition-all duration-300 group"
//                     >
//                       <ChevronLeft
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-navy group-hover:text-gold transition-colors"
//                         strokeWidth={1.5}
//                       />
//                     </button>
//                     <button
//                       onClick={() => {
//                         nextSlide();
//                         setIsAutoPlaying(false);
//                       }}
//                       className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-navy/20 hover:border-gold hover:bg-gold/5 flex items-center justify-center transition-all duration-300 group"
//                     >
//                       <ChevronRight
//                         className="w-5 h-5 sm:w-6 sm:h-6 text-navy group-hover:text-gold transition-colors"
//                         strokeWidth={1.5}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE - 3D Carousel */}
//           <div className="lg:col-span-8 xl:col-span-9">
//             <div
//               className="relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
//               style={{ perspective: "2000px" }}
//             >
//               {properties.map((property, index) => {
//                 const style = getCardStyle(index);
//                 const position =
//                   (index - currentIndex + properties.length) %
//                   properties.length;

//                 return (
//                   <div
//                     key={property.id}
//                     className="absolute top-1/2 left-1/2 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
//                     style={{
//                       ...style,
//                       pointerEvents: position === 0 ? "auto" : "none",
//                     }}
//                     onClick={() => {
//                       if (position === 1) {
//                         nextSlide();
//                         setIsAutoPlaying(false);
//                       } else if (position === properties.length - 1) {
//                         prevSlide();
//                         setIsAutoPlaying(false);
//                       }
//                     }}
//                   >
//                     {/* Property Card */}
//                     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
//                       {/* Image Container */}
//                       <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
//                         <img
//                           src={property.image}
//                           alt={property.title}
//                           className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
//                         />

//                         {/* Gradient Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>

//                         {/* Developer Badge */}
//                         <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
//                           <span className="font-luxury text-xs sm:text-sm font-medium text-navy tracking-wide">
//                             {property.developer}
//                           </span>
//                         </div>

//                         {/* Property Title Overlay */}
//                         <div
//                           className="absolute bottom-0 left-0 right-0 p-4 sm:p-6
//               bg-gradient-to-t
//               from-[#36454F]/80
//               via-[#36454F]/80
//               to-transparent
//               text-white"
//                         >
//                           <h3 className=" font-luxury text-xl sm:text-2xl md:text-3xl font-bold text-light-gray mb-2 sm:mb-3 leading-tight">
//                             {property.title}
//                           </h3>

//                           <div className="flex items-start gap-1.5 mb-3 sm:mb-4">
//                             <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0 mt-0.5" />
//                             <p className="font-luxury text-xs sm:text-sm text-white/90 leading-relaxed">
//                               {property.location}
//                             </p>
//                           </div>

//                           {/* Property Details */}
//                           <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
//                             <div className="flex items-center gap-3 sm:gap-4">
//                               <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
//                                 <Bed
//                                   className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
//                                   strokeWidth={1.5}
//                                 />
//                                 <span className="font-luxury text-xs sm:text-sm text-white font-medium">
//                                   {property.bedrooms}
//                                 </span>
//                               </div>

//                               <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg">
//                                 <Maximize2
//                                   className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
//                                   strokeWidth={1.5}
//                                 />
//                                 <span className="font-luxury text-xs sm:text-sm text-white font-medium">
//                                   {property.sqft}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Price */}
//                           <div className="flex items-baseline gap-1.5 sm:gap-2">
//                             <span className="font-luxury text-sm sm:text-base text-gold/90">
//                               AED
//                             </span>
//                             <span className="font-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-gold">
//                               {property.price}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Pagination Dots */}
//             <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
//               {properties.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setCurrentIndex(index);
//                     setIsAutoPlaying(false);
//                   }}
//                   className={`transition-all duration-300 rounded-full ${
//                     index === currentIndex
//                       ? "w-8 sm:w-10 md:w-12 h-1.5 sm:h-2 bg-gold"
//                       : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-navy/20 hover:bg-navy/40"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentProperties;

import React, { useState, useEffect, useRef } from "react";
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

    // Center card (main)
    if (position === 0) {
      return {
        transform: "translateX(0%) scale(1) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
        filter: "blur(0px)",
      };
    }
    // Right card
    else if (position === 1) {
      return {
        transform: "translateX(45%) scale(0.85) rotateY(-15deg)",
        zIndex: 20,
        opacity: 0.7,
        filter: "blur(1px)",
      };
    }
    // Left card
    else if (position === properties.length - 1) {
      return {
        transform: "translateX(-45%) scale(0.85) rotateY(15deg)",
        zIndex: 20,
        opacity: 0.7,
        filter: "blur(1px)",
      };
    }
    // Hidden cards
    else {
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
                      if (position === 1) {
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
                        <div
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/15
              to-navy/10"
                        ></div>

                        {/* Property Title Overlay */}
                        <div
                          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6
              bg-gradient-to-t
              from-[#36454F]/80
              via-[#36454F]/80
              to-transparent
              text-white"
                        >
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
