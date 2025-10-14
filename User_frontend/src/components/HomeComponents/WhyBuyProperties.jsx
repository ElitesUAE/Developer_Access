import React from "react";
import { Building2, Users, Percent, ArrowRight } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const WhyBuyProperties = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Building2,
      title: "Leading in Property",
      description:
        "EliteInEmirates is a leading investor in the real estate industry that has a global network allowing you to connect with many solvent potential purchasers.",
    },
    {
      icon: Users,
      title: "Professional Agents",
      description:
        "When it comes to trustworthy service design, our professional real estate agents have extensive expertise and industry knowledge, which you will benefit from.",
    },
    {
      icon: Percent,
      title: "Less Commission Ratio",
      description:
        "Our commission ratio is the lowest in the market, providing you with ease whether you are searching for a high-quality residential property or commercial space.",
    },
  ];

  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 bg-white overflow-hidden">
      <div className="relative max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          {/* LEFT SIDE - Image (Full Bleed) */}
          <div className="relative order-2 lg:order-1 lg:col-span-6 xl:col-span-5">
            {/* Mobile/Tablet: Contained with padding */}
            <div className="lg:hidden px-4 mt-10 lg:mt-0 sm:px-6 md:px-8">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
                    alt="Luxury Property"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-gold/20"></div>
                </div>
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500"></div>
              </div>
            </div>

            {/* Desktop: Full Bleed Left */}
            <div className="hidden lg:block relative h-full min-h-[600px]">
              <div className="absolute inset-0 group">
                {/* Main Image Container */}
                <div className="relative h-full overflow-hidden">
                  {/* Image extending to the left edge */}
                  <div className="absolute inset-0 -left-20 xl:-left-28">
                    <img
                      src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
                      alt="Luxury Property"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlays for Luxury Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-gold/30"></div>

                  {/* Decorative Cut-out Shape on Right */}
                  <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white via-white to-transparent"></div>
                </div>
              </div>

              {/* Luxury Badge/Label */}
              <div className="absolute top-12 right-8 bg-navy/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-gold/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                  <span className="font-luxury text-sm font-semibold text-white tracking-wider">
                    PREMIUM
                  </span>
                </div>
              </div>
            </div>

            {/* Large Decorative Background Circle */}
            <div
              className="absolute -right-12 top-1/4 w-64 h-64 rounded-full -z-10 opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(207, 175, 78, 0.15) 0%, transparent 70%)",
              }}
            ></div>
          </div>

          {/* RIGHT SIDE - Content */}
          <div className="relative order-1 lg:order-2 lg:col-span-6 xl:col-span-7 px-4 sm:px-6 md:px-8 lg:pl-12 xl:pl-20 lg:pr-12">
            {/* Decorative Background */}
            <div
              className="absolute -right-8 top-0 w-56 h-56 rounded-full -z-10 opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(10, 37, 64, 0.06) 0%, transparent 70%)",
              }}
            ></div>

            <div className="relative z-10 max-w-2xl">
              {/* Section Header */}
              <div className="mb-6 sm:mb-8">
                <p className="font-modern text-gold text-xs tracking-[0.15em] uppercase mb-2 font-semibold">
                  Why Choose Us
                </p>

                <h2 className="font-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-navy leading-tight mb-3">
                  Why Buy Properties on Sale from{" "}
                  <span className="font-bold text-navy">EliteInEmirates?</span>
                </h2>

                <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
              </div>

              {/* Features List */}
              <div className="space-y-5 sm:space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group relative flex gap-3 sm:gap-4 items-start"
                    >
                      {/* Icon Container */}
                      <div className="relative flex-shrink-0">
                        {/* Background Circle */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-gold-light/20 rounded-xl sm:rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"></div>

                        {/* Icon */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-gold/30 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:border-gold group-hover:shadow-lg transition-all duration-300">
                          <Icon
                            className="w-5 h-5 sm:w-6 sm:h-6 text-gold group-hover:text-navy transition-colors duration-300"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-0.5">
                        <h3 className="font-luxury text-lg sm:text-xl md:text-2xl font-bold text-navy mb-1.5 sm:mb-2 group-hover:text-gold transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="font-modern text-sm sm:text-base text-charcoal-gray/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional CTA Button */}
              <div className="flex justify-center mt-4 lg:justify-start">
                <Button
                  rightIcon={
                    <ArrowRight
                      height={18}
                      width={18}
                      className="xs:h-5 xs:w-5 align-middle"
                    />
                  }
                  onClick={() => navigate("/properties")}
                  variant="outline"
                  className="font-luxury text-sm xs:text-base sm:text-lg px-4 xs:px-6 py-2.5 xs:py-3 whitespace-nowrap"
                >
                  <span className="inline">Explore Properties</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-navy/4 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-gold/5 to-transparent rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default WhyBuyProperties;
