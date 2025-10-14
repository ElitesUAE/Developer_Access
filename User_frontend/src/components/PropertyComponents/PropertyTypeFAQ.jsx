// src/components/PropertyTypeFAQ.jsx - UPDATED
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const PropertyTypeFAQ = ({ type = "rent" }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqConfig = {
    rent: {
      title: "Rent Properties FAQs",
      faqs: [
        {
          question:
            "Which three things ought you to accomplish before signing a lease on an apartment?",
          answer:
            "Assemble your papers. Make a checklist for renting an apartment. Invest in renters insurance.",
        },
        {
          question: "What is the tenant's legal notice period?",
          answer:
            "In Dubai, tenants must provide 90 days' notice before the end of their lease if they wish to vacate. This notice must be given in writing to the landlord or property management company.",
        },
        {
          question:
            "What are the finest neighbourhoods in Dubai for young professionals to rent a home?",
          answer:
            "Popular areas include Dubai Marina, JBR, Business Bay, Downtown Dubai, and JLT (Jumeirah Lakes Towers). These areas offer excellent connectivity, lifestyle amenities, and vibrant communities suitable for young professionals.",
        },
        {
          question: "Can I get a flat for rent in Dubai for the short term?",
          answer:
            "Yes, short-term rental options are available in Dubai, ranging from weekly to monthly stays. However, ensure the property is registered for short-term rentals as per Dubai Tourism regulations.",
        },
      ],
    },
    buy: {
      title: "Buy Properties FAQs",
      faqs: [
        {
          question: "Can foreigners buy property in Dubai?",
          answer:
            "Yes, foreigners can purchase freehold properties in designated areas across Dubai. These freehold areas include popular locations like Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, JBR, and many others throughout the emirate.",
        },
        {
          question: "What are the costs involved in buying property in Dubai?",
          answer:
            "The main costs include the Dubai Land Department (DLD) fee of 4% of the property value, real estate agent fees (typically 2%), property valuation fees, mortgage registration fees if applicable (around 0.25%), and trustee fees if buying off-plan. You should also budget for maintenance fees and service charges.",
        },
        {
          question: "Do I get a residence visa when buying property in Dubai?",
          answer:
            "Yes, property owners can qualify for residence visas. Properties worth AED 750,000 or more qualify for a 2-year renewable residence visa. Properties worth AED 2 million or more qualify for a 10-year Golden Visa, which can be extended for family members.",
        },
        {
          question: "What is the process of buying property in Dubai?",
          answer:
            "The process involves: 1) Selecting a property and making an offer, 2) Signing a Memorandum of Understanding (MOU) and paying a deposit (typically 10%), 3) Completing due diligence and property inspection, 4) Securing financing if needed, 5) Signing the Sale and Purchase Agreement (SPA), 6) Transferring the title deed at the Dubai Land Department with payment of the remaining balance and applicable fees.",
        },
        {
          question:
            "What payment plans are available for buying property in Dubai?",
          answer:
            "Dubai offers flexible payment plans for both ready and off-plan properties. Off-plan properties typically offer installment plans during construction (30/70, 40/60, or 50/50 payment structures). Ready properties can be purchased through cash payment, mortgage financing (up to 80% for expats, 85% for UAE nationals), or developer payment plans in some cases.",
        },
        {
          question: "Is buying property in Dubai Marina a good investment?",
          answer:
            "Yes, Dubai Marina is one of the most sought-after locations offering excellent ROI potential. With high rental yields (typically 6-8%), strong demand from expats and tourists, world-class amenities, waterfront living, and proximity to business districts, it's an attractive investment option for both capital appreciation and rental income.",
        },
      ],
    },
    offplan: {
      title: "Off Plan Properties FAQs",
      faqs: [
        {
          question: "How does off plan real estate operate?",
          answer:
            "Basically, buying off-plan property means you'll buy your new house before construction is complete. This could mean that the house is already being built or that work will soon start.",
        },
        {
          question: "What dangers exist while purchasing off-plan?",
          answer:
            "The main risks include potential delays in construction, changes in market conditions, developer reliability issues, and the property not meeting expectations upon completion. However, RERA regulations in Dubai provide significant protection for buyers.",
        },
        {
          question: "Is purchasing a home off plan a wise idea?",
          answer:
            "Yes, purchasing off-plan can be advantageous due to lower prices, flexible payment plans, potential for capital appreciation, and the ability to customize your property. However, it's important to research the developer's track record and ensure all legal protections are in place.",
        },
        {
          question: "What advantages come with buying off-plan?",
          answer:
            "Key advantages include lower purchase prices compared to completed properties, flexible payment plans, potential for high returns on investment, modern amenities and designs, and the opportunity to choose preferred units and customize finishes.",
        },
      ],
    },
  };

  const currentFAQ = faqConfig[type] || faqConfig.rent;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-12">
          {currentFAQ.title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {currentFAQ.faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-[#CFAF4E] bg-[#FFF5E6] shadow-lg"
          : "border-[#CFAF4E]/30 bg-white shadow-sm hover:border-[#CFAF4E]/60"
      }`}
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors duration-300`}
      >
        <span className="font-['Inter'] font-semibold text-[#0A2540] text-base md:text-lg pr-4">
          {question}
        </span>
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 ${
              isOpen ? "text-[#CFAF4E]" : "text-[#333333]"
            }`}
          />
        </div>
      </button>

      {/* Answer Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 md:p-5 pt-0 md:pt-2 bg-white border-t border-[#CFAF4E]/20">
          <p className="font-['Inter'] text-[#333333]/80 text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeFAQ;
