// src/components/PropertyTypeContent.jsx - UPDATED
import React from "react";

const PropertyTypeContent = ({ type = "rent" }) => {
  // Content configuration for different property types
  const contentConfig = {
    rent: {
      sections: [
        {
          title: "Flat For Rent In Dubai",
          description:
            "Many various sizes of flat for rent in Dubai are available, with choices including budget-friendly, opulent, furnished, unfurnished, and serviced apartments. Tenants have the option of renting flats on a monthly or annual basis. Depending on their budget and space needs, tenants looking for a flat for rent in Dubai can also choose from a variety of units. In Dubai, the majority of apartment complexes offer amenities like designated parking, a communal pool, a kids' play area, and a gym.",
        },
        {
          title: "Apartments For Rent In Dubai",
          description:
            "Need help with an apartment for rent in Dubai? You can get an apartment on rent in Dubai from as low as AED15k and the maximum is up to you. The cost of a one-bedroom apartment for rent in Downtown Dubai and Palm Jumeirah, respectively, starts at AED 45k and AED 65k. Many of the apartments in Dubai that are available for rent also come with a balcony, a laundry room, and a maid's room. In Dubai, there are studio, 1, 2, 3, 4 and 5-bedroom apartments also available for rent.",
        },
        {
          title: "Villa For Rent In Dubai",
          description:
            "Finding the appropriate place to stay is the first step in moving to Dubai. You're in luck since Elite In Emirates is the ideal partner for providing the greatest luxurious villa for rent in Dubai, all of which can be quickly and easily searched for with our help. We have you covered, whether you're looking for flexible stay villas in Dubai Marina, monthly rental villas in Downtown Dubai, or villa for rent in Address Villas Hillcrest.",
        },
      ],
    },
    buy: {
      sections: [
        {
          title: "Buy Apartment In Dubai Marina",
          description:
            "You may live a lavish lifestyle and have easy access to any amenity you could imagine, including fine dining, golf courses, parks, children's play areas, lakes, and other amenities, all in one location if you buy apartment in Dubai Marina. Every facility is included in this breathtaking beachfront property.",
        },
        {
          title:
            "What Factors Do One Consider To Buy Apartments In Dubai Marina?",
          description:
            "Easy access to the city's centre, adjacent culinary alternatives, a commercial or corporate hub, and family-friendly accommodations are all requirements. You can specify your needs and locate exactly what you want, whether you want to purchase studios, one-bedroom, two-bedroom, three-bedroom, or apartments with a specific amount of square footage.",
        },
        {
          title: "How Much To Buy Apartment In Dubai Marina?",
          description:
            "For those looking to relocate permanently as well as those taking time off from work, Dubai Marina has long been a top choice. The cheapest 1-bedroom apartments in Dubai Marina start at AED 580,000, and the most expensive ones go for AED 2,250,000 if you plan to purchase one. The least costly twin-bedroom flats may be purchased for AED 1,720,000, and the most expensive ones can be purchased for AED 6,183,000. Here, AED 478k to AED 2,300k is required for studios.",
        },
        {
          title: "What Makes Dubai Marina a Good Investment?",
          description:
            "Real estate is the only wiser investment. You won't have to worry about return on investment again for the rest of your life if you buy apartments in Dubai Marina. The flats given here are the best value anywhere in the globe. Since there are now more than 80% of residents who are foreigners, the government has been working hard to increase tourism throughout the holiday season. This is demonstrated by regulations that are welcoming to visitors, such as the waiver of the visa cost for dependents under the age of 18. With 32.8 million travellers utilising UAE airports in the first quarter of this year, family travel has taken off in the Emirates, which is precisely why you should own some of the amazing Dubai Marina apartments.",
        },
        {
          title: "Buy Property In Dubai On Instalments",
          description:
            "Dubai is one of the most renowned real estate locations in the globe, offering a variety of real estate options, whether they be residential or commercial, most recently. People are now looking for apartments for sale due to their reasonable rates, favourable rental returns and the easy ways to buy property in Dubai on instalments.",
        },
        {
          title: "Modern Technology for Property Purchase",
          description:
            "The most populated city in the UAE, Dubai is renowned for a variety of features, including its ultramodern architecture, upscale stores, and a vibrant nightlife and easy way to buy property on installments in Dubai. High-end flats are just one of many amenities enjoyed by Dubai residents, but what truly distinguishes Dubai is its high standard of life. It's astonishingly simple and advantageous to purchase real estate in Dubai. Customers can now quickly study developers, and modern technology enables them to make secure purchases. Customers can easily invest in Dubai real estate thanks to virtual tours, simple payments, open procedures, and convenient contact with developers via apps and other safe platforms and the flexibility to buy property on installments in Dubai.",
        },
        {
          title: "Variety of Property Options",
          description:
            "Since Dubai, by definition, pushes the limits of luxury and what is possible, you can expect a wide variety of apartment types to be offered throughout the emirate. Anyone looking to buy an apartment in Dubai may be confident that they will find the right one for them because almost every budget and taste is catered to.",
        },
      ],
    },
    offplan: {
      sections: [
        {
          title: "Income from Rent That Is Very Enticing",
          description:
            "Analysis from various Dubai-based real estate firms have pointed to better rental returns despite the market's volatility. Due to lower acquisition costs compared to fully developed property, you can earn a 6 to 10% yearly return on your investment. In contrast, rental prices for developed real estate in several cities like Riyadh, Mumbai, Cairo and Istanbul see substantially fluctuating rates, dropping and arising again.",
        },
        {
          title: "Rules Regarding Property Ownership",
          description:
            "The Real Estate Regulatory Agency (RERA) in Dubai has enacted a number of safeguards for off-plan property transactions to provide security for investors. Investors who buy property in Dubai with cash or loans are guaranteed payment by them. And clients are eager to put in claims. The process was initiated.",
        },
        {
          title: "Overview of Dubai's Off-Plan Real Estate's Many Perks",
          highlights: [
            "When compared to the cost of a completed structure, these are a great deal.",
            "Affordable pricing structures",
            "Costs are released initially",
            "Profits will increase once the building is finished",
          ],
        },
        {
          title:
            "Villas for sale in Dubai before construction is complete | Layaway available",
          description:
            "Since Dubai's financial property market opened, there has been a constant flow of high-quality real estate initiatives for developers and buyers to choose from. To assist you in making educated investment selections, we have compiled a comprehensive list of all off-plan villas in Dubai.",
        },
      ],
    },
  };

  const currentContent = contentConfig[type] || contentConfig.rent;

  return (
    <div className="bg-gradient-to-b from-[#F4F4F4] to-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Sections */}
        <div className="space-y-6">
          {currentContent.sections.map((section, index) => (
            <ContentSection key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Content Section Component
const ContentSection = ({ title, description, highlights = [] }) => {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-[#CFAF4E]/10 hover:shadow-xl transition-shadow duration-300">
      {/* Section Title */}
      <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold text-[#0A2540] mb-4 flex items-center gap-3">
        <div className="w-1 h-8 bg-[#CFAF4E] rounded-full" />
        {title}
      </h3>

      {/* Section Description */}
      {description && (
        <p className="font-['Inter'] text-[#333333]/80 text-base leading-relaxed">
          {description}
        </p>
      )}

      {/* Highlights Grid (for off-plan) */}
      {highlights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-[#F4F4F4] rounded-lg hover:bg-[#CFAF4E]/10 transition-colors border border-[#CFAF4E]/20"
            >
              <div className="w-2 h-2 rounded-full bg-[#CFAF4E] mt-2 shrink-0" />
              <span className="font-['Inter'] text-[#333333] text-sm">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyTypeContent;
