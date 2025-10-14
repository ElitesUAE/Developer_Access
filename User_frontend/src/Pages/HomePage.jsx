import { useEffect } from "react";
import LatestArticles from "../components/HomeComponents/BlogSection";
import HeroSection from "../components/HomeComponents/HeroSection";
import CurvedPanoramicCarousel from "../components/HomeComponents/LuxuryPropertyCarousel";
import RecentProperties from "../components/HomeComponents/RecentProperties";
import WhyBuyProperties from "../components/HomeComponents/WhyBuyProperties";
import { usePropertyStore } from "../store/usePropertyStore";
import toast from "react-hot-toast";
import StructuredData from "../components/StructuredData";
import useSEO from "../hooks/useSEO";

const HomePage = () => {
  // SEO Setup
  useSEO({
    title: "Elite In Emirates | Luxury Properties in Dubai & UAE",
    description:
      "Discover exclusive luxury properties in Dubai and UAE. Elite In Emirates offers premium villas, penthouses, and apartments in the most prestigious locations.",
    keywords:
      "luxury properties Dubai, UAE real estate, premium villas Dubai, luxury apartments UAE, Dubai penthouses, elite properties Emirates, Dubai Marina, Palm Jumeirah",
    ogTitle: "Elite In Emirates - Luxury Properties in Dubai",
    ogDescription: "Discover exclusive luxury properties in Dubai and UAE",
    ogImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ogUrl: "https://eliteinemirates.com",
    canonical: "https://eliteinemirates.com",
    robots: "index, follow, max-image-preview:large",
  });

  // Structured Data for Organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Elite In Emirates",
    description: "Luxury real estate agency in Dubai and UAE",
    url: "https://eliteinemirates.com",
    logo: "https://eliteinemirates.com/about",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UAE",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
    },
    telephone: "+971-XX-XXX-XXXX",
    email: "hello@eliteinemirates.com",
    priceRange: "$$$",
    sameAs: [
      "https://www.facebook.com/eliteinemirates",
      "https://www.instagram.com/eliteinemirates",
      "https://www.linkedin.com/company/eliteinemirates",
    ],
  };
  const { homePageProperties, fetchHomePageProperties, loading } =
    usePropertyStore();

  useEffect(() => {
    const loadHomePageProperties = async () => {
      try {
        await fetchHomePageProperties();
      } catch (error) {
        toast.error("Failed to load properties");
      }
    };
    loadHomePageProperties();
  }, [fetchHomePageProperties]);

  // Get first 3 properties for RecentProperties
  const recentProperties = homePageProperties.slice(0, 3);

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="relative overflow-hidden">
        {/* Hero Section - Full viewport */}
        <HeroSection />

        {/* Property Search Section - Elevated Overlap Design */}
        <div className="relative -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 z-30 px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Luxury Container with Shadow and Border */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl border-2 sm:border-3 md:border-4 border-navy p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-lg">
              {/* Premium Section Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="font-luxury text-xl sm:text-2xl md:text-3xl lg:text-4xl text-navy mb-2">
                  Find Your Perfect Property
                </h2>
                <div className="w-24 sm:w-32 md:w-38 h-0.5 sm:h-1 bg-gold mx-auto mb-2"></div>
                <p className="font-luxury text-sm sm:text-base md:text-md text-charcoal-gray max-w-2xl mx-auto px-4 sm:px-0">
                  Discover exceptional properties tailored to your lifestyle and
                  investment goals
                </p>
              </div>

              {/* Search Component */}
              {/* <PropertySearch /> */}
            </div>
          </div>
        </div>

        {/* Pass first 3 properties to RecentProperties */}
        <RecentProperties properties={recentProperties} loading={loading} />

        {/* <WhyBuyProperties /> */}

        {/* Pass all homepag/e properties to CurvedPanoramicCarousel */}
        <CurvedPanoramicCarousel
          properties={homePageProperties}
          loading={loading}
        />

        {/* <DevelopersSection /> */}
        <LatestArticles />

        {/* <OurPartners /> */}

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 -left-16 sm:-left-24 lg:-left-32 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-2xl sm:blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -right-16 sm:-right-24 lg:-right-32 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-navy/5 rounded-full blur-2xl sm:blur-3xl pointer-events-none"></div>
      </div>
    </>
  );
};

export default HomePage;
