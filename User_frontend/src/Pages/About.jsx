import React, { useState } from "react";
import { Building2 } from "lucide-react";
import EliteImage from "../assets/logo-bk.png";
import ContactFormModal from "../components/ContactFormModal";

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div
      className="bg-white min-h-screen flex flex-col items-center"
      style={{
        fontFamily: "var(--font-luxury)",
        color: "var(--color-navy)",
      }}
    >
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#1a3a5f] py-4 md:py-6 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div>
            <Building2 size={48} className="mx-auto mb-6 text-[gold]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#CFAF4E] mb-6 tracking-tight">
            About Us
          </h1>
          <div className="w-24 h-1 bg-[#CFAF4E] mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light">
            Your ambition, our expertise
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-14 md:py-16 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8 text-left">
          <div>
            <div className="h-1 bg-[#CFAF4E] mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6">
              Elite In Emirates
            </h2>
          </div>

          <p className="text-lg font-medium text-gray-600 leading-relaxed justified">
            Elite In Emirates was born from a simple belief: mastering UAE's
            fast-paced property market shouldn't be reserved for insiders. With
            a foundation rooted in sharp market analysis, transparent insights,
            and local know-how, Elite In Emirates stands at the intersection of
            real estate and strategy.
          </p>

          <p className="text-lg font-medium text-gray-600 leading-relaxed justified">
            What started as a niche content platform has evolved into a trusted
            name among smart investors, expats, and first-time buyers looking to
            turn their property goals into profitable realities. From off-plan
            gems in new hotspots to hidden value in established communities, our
            mission is clear: unlock the kind of information others don't tell
            you.
          </p>

          <div className="relative bg-gradient-to-br from-[#0A2540] to-[#1a3a5f] p-8 rounded-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CFAF4E]/10 rounded-full blur-2xl"></div>
            <p className="text-lg text-white font-medium leading-relaxed relative z-10 justified">
              Elite In Emirates is proud to empower clients through real-time
              updates, investment guides, and exclusive developer insights: all
              tailored to help you invest smarter, faster, and with confidence.
              Today, we serve a growing network of readers and investors across
              the UAE, India, and beyond, all driven by one shared belief:{" "}
              <span className="font-bold text-[#CFAF4E] text-xl">
                "Clarity is Profit"
              </span>
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-[#CFAF4E] to-transparent rounded-2xl"></div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-gradient-to-t from-gold/45 to-transparent z-10"></div>
            <img
              src={EliteImage}
              alt="Elite In Emirates"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating accent */}
          <div className="absolute -bottom-8 md:-left-8 w-32 h-32 bg-[#CFAF4E] rounded-2xl shadow-xl z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-xs text-white/90">Years Expertise</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full relative py-20 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border-t-4 border-[#CFAF4E]">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
              Ready to start your property journey?
            </h3>
            <p className="text-lg text-[#333333] mb-8 max-w-2xl mx-auto">
              Let our experts guide you to the perfect investment opportunity in
              the UAE
            </p>

            {/* ✅ Updated Button with onClick */}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-10 py-4 bg-[#CFAF4E] text-white text-lg rounded-xl font-semibold shadow-xl hover:bg-[#0A2540] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
            </button>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-[#333333]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#CFAF4E]"></div>
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#CFAF4E]"></div>
                <span>Market Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#CFAF4E]"></div>
                <span>Exclusive Deals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Start Your Property Journey"
        description="Our property experts are ready to help you find the perfect investment opportunity in the UAE."
      />
    </div>
  );
};

export default About;
