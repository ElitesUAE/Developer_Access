// src/components/CTAs.jsx
import Button from "./Button";

// Hero Section CTA
export const HeroCTA = ({ onCallback, onExplore }) => (
  <div className="bg-gradient-to-r from-navy to-navy-light p-8 rounded-2xl text-center">
    <h2 className="text-3xl font-luxury text-white mb-4">
      Find Your Dream Property in Dubai
    </h2>
    <p className="text-white/90 text-lg mb-6">
      Premium apartments and villas in prime locations
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="primary"
        size="lg"
        onClick={onCallback}
        leftIcon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        }
      >
        Request Callback
      </Button>

      <Button
        variant="secondary"
        size="lg"
        onClick={onExplore}
        rightIcon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      >
        Explore Properties
      </Button>
    </div>
  </div>
);

// Property Card CTA
export const PropertyCTA = ({ onInquire, onTour, onSave }) => (
  <div className="flex gap-3 mt-4">
    <Button variant="primary" size="sm" onClick={onInquire}>
      Inquire Now
    </Button>

    <Button
      variant="outline"
      size="sm"
      onClick={onTour}
      rightIcon={
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      }
    >
      Book Tour
    </Button>

    <Button
      variant="secondary"
      size="sm"
      onClick={onSave}
      leftIcon={
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      }
    >
      Save
    </Button>
  </div>
);

// Contact Section CTA
export const ContactCTA = ({ onCallback, onWhatsApp, onEmail }) => (
  <div className="bg-gray-50 p-8 rounded-2xl text-center">
    <h3 className="text-2xl font-semibold text-navy mb-4">
      Ready to Find Your Perfect Home?
    </h3>
    <p className="text-gray-600 mb-6">Connect with our expert agents today</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="primary"
        onClick={onCallback}
        leftIcon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        }
      >
        Get Expert Advice
      </Button>

      <Button
        variant="secondary"
        onClick={onWhatsApp}
        leftIcon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        }
      >
        WhatsApp Us
      </Button>

      <Button
        variant="outline"
        onClick={onEmail}
        leftIcon={
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        }
      >
        Email Us
      </Button>
    </div>
  </div>
);

// Home Valuation CTA
export const ValuationCTA = ({ onGetValuation }) => (
  <div className="bg-navy text-white p-8 rounded-2xl">
    <h3 className="text-2xl font-luxury mb-4">What's Your Property Worth?</h3>
    <p className="text-white/90 mb-6">
      Get an instant market valuation of your property
    </p>
    <Button
      variant="primary"
      size="lg"
      onClick={onGetValuation}
      rightIcon={
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      }
      className="w-full sm:w-auto"
    >
      Get Free Valuation
    </Button>
  </div>
);

// Newsletter CTA
export const NewsletterCTA = ({ onSubscribe }) => (
  <div className="border-2 border-gold p-6 rounded-xl">
    <h3 className="text-xl font-semibold text-navy mb-3">
      Stay Updated with Dubai Properties
    </h3>
    <p className="text-gray-600 mb-4">
      Get exclusive listings and market insights delivered to your inbox
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
      />
      <Button variant="primary" onClick={onSubscribe}>
        Subscribe
      </Button>
    </div>
  </div>
);

// Urgency CTA
export const UrgencyCTA = ({ onActNow, timeLeft = "24 hours" }) => (
  <div className="bg-gradient-to-r from-gold to-gold-light p-6 rounded-xl text-center">
    <div className="flex items-center justify-center gap-2 mb-3">
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <span className="text-white font-semibold">Limited Time Offer</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">
      Exclusive Pre-Launch Prices
    </h3>
    <p className="text-white/90 mb-4">
      Only {timeLeft} left to secure your unit at launch prices
    </p>
    <Button
      variant="secondary"
      size="lg"
      onClick={onActNow}
      className="font-bold"
    >
      Reserve Now
    </Button>
  </div>
);
