import React from "react";
import { Shield, Info } from "lucide-react";

export default function Policy() {
  return (
    <div className="min-h-screen w-full bg-[#eef2f6] px-4 py-16 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header / Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-[#d5b36a33] px-4 py-1">
            <Shield className="w-4 h-4 text-[#d5b36a]" />
            <span className="text-xs uppercase tracking-[0.18em] text-[#6b7280]">
              Privacy Policy
            </span>
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-[#0a1a33] font-['Playfair_Display']">
            Privacy Policy – Elite in Emirates
          </h1>

          <p className="mt-3 text-sm md:text-base text-gray-600">
            Last Updated:{" "}
            <span className="text-[#b08a2a] font-medium">15 November 2025</span>
          </p>

          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl text-justify">
            Elite in Emirates (“we”, “our”, “us”) is committed to protecting
            your personal information and ensuring transparency about how your
            data is collected, used, and shared.
          </p>

          {/* Key highlight bar */}
          <div className="mt-6 rounded-2xl bg-white border border-[#d5b36a33] shadow-sm px-4 py-3 md:px-6 md:py-4 flex gap-3">
            <div className="mt-1">
              <Info className="w-5 h-5 text-[#d5b36a]" />
            </div>
            <p className="text-sm md:text-base text-gray-700 text-justify">
              By using our website, submitting property enquiries, or engaging
              with our services, you agree to the practices described in this
              Privacy Policy.
            </p>
          </div>
        </div>

        {/* Content container */}
        <div className="bg-white rounded-3xl shadow-md border border-white px-5 py-6 md:px-8 md:py-8 space-y-8">
          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              1. Information We Collect
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-3 text-justify">
              We collect certain information when you interact with our website,
              submit property enquiries, or communicate with us.
            </p>

            <h3 className="text-base md:text-lg font-semibold text-[#0a1a33] mt-4 mb-2">
              1.1 Personal Information
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Country of residence</li>
              <li>
                Any details you voluntarily submit in enquiry forms or WhatsApp
                chats
              </li>
            </ul>

            <h3 className="text-base md:text-lg font-semibold text-[#0a1a33] mt-5 mb-2">
              1.2 Website & Technical Data
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>IP address</li>
              <li>Device type and browser type</li>
              <li>Pages viewed and time spent on the website</li>
              <li>
                Source of visit (e.g., search engines, social media, ad
                campaigns)
              </li>
            </ul>

            <h3 className="text-base md:text-lg font-semibold text-[#0a1a33] mt-5 mb-2">
              1.3 Cookies & Tracking Technologies
            </h3>
            <p className="text-sm md:text-base text-gray-700 text-justify">
              We use cookies, Google Analytics, and Google Ads tags to measure
              performance, understand visitor behaviour, and optimize our
              marketing.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              2. How We Use Your Information
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-3 text-justify">
              We use the information we collect for the following purposes:
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm md:text-base text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>To respond to your property enquiries</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>
                  To connect you with the right real estate developers or agents
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>To provide property recommendations</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>To improve our website and marketing performance</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>To run targeted advertising</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>To verify the authenticity of leads</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d5b36a]" />
                <span>
                  To offer customer support via email, call, or WhatsApp
                </span>
              </li>
            </ul>
          </section>

          {/* 3. Data Sharing & Disclosure */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              3. Data Sharing & Disclosure
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-3 text-justify">
              We maintain full transparency about how and with whom your
              information is shared.
            </p>

            {/* Highlighted “We DO NOT” block */}
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3">
              <p className="text-sm md:text-base font-semibold text-emerald-800">
                We DO NOT:
              </p>
              <ul className="mt-2 list-disc list-inside text-sm md:text-base text-emerald-900">
                <li>Sell your data to unrelated companies</li>
                <li>Share your information for non-real estate purposes</li>
                <li>
                  Share your details with anyone not connected to your enquiry
                </li>
              </ul>
            </div>

            <p className="text-sm md:text-base text-gray-700 mb-2 text-justify">
              We may share your submitted details with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>
                Approved UAE real estate developers (e.g., Emaar, Damac, Sobha,
                Binghatti, Azizi, etc.)
              </li>
              <li>
                Authorized real estate agents working on behalf of projects you
                enquire about
              </li>
              <li>
                Marketing partners directly linked to the property you requested
              </li>
              <li>
                Service providers assisting with website hosting, analytics,
                forms, or advertising
              </li>
            </ul>

            <p className="text-sm md:text-base text-gray-700 mt-3 text-justify">
              We share this information to ensure your enquiry is handled by the
              correct party who can provide project details, payment plans,
              property availability, site visits or virtual tours, and
              up-to-date offers and pricing.
            </p>
          </section>

          {/* 4. Legal Basis for Processing */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              4. Legal Basis for Processing (UAE-Compliant)
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-3 text-justify">
              Your data is processed on the following legal bases:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>
                <span className="font-semibold text-[#0a1a33]">Consent</span> –
                when you submit a form or contact us
              </li>
              <li>
                <span className="font-semibold text-[#0a1a33]">
                  Legitimate interest
                </span>{" "}
                – to provide relevant property information
              </li>
              <li>
                <span className="font-semibold text-[#0a1a33]">
                  Contractual necessity
                </span>{" "}
                – when you request project details, offers, or support
              </li>
            </ul>
          </section>

          {/* 5. Lead Forms & WhatsApp */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              5. Lead Forms & WhatsApp Communication
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-2 text-justify">
              When you submit an enquiry or request a callback:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>Your information may be stored securely in our database</li>
              <li>We may contact you via call, email, or WhatsApp</li>
              <li>
                Developers or authorized agents may also contact you regarding
                your enquiry
              </li>
            </ul>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              6. Data Retention
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-2 text-justify">
              We retain your data for as long as:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>You remain interested in property options</li>
              <li>
                Communication or follow-up regarding your enquiry is ongoing
              </li>
              <li>Required for legal, administrative, or security purposes</li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 mt-2 text-justify">
              You may request deletion of your data at any time, subject to
              applicable legal requirements.
            </p>
          </section>

          {/* 7. Data Security */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              7. Data Security
            </h2>
            <p className="text-sm md:text-base text-gray-700 text-justify">
              We take reasonable technical and organizational measures to
              protect your data from unauthorized access, misuse, alteration, or
              loss.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              8. Your Rights
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-2 text-justify">
              Depending on applicable law, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700">
              <li>Request access to the information we hold about you</li>
              <li>
                Request correction of inaccurate or incomplete information
              </li>
              <li>Request deletion of your data</li>
              <li>Request that we stop sending marketing communications</li>
              <li>Request information on how your data is shared</li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 mt-3 text-justify">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:hello@eliteinemirates.com"
                className="text-[#b08a2a] underline underline-offset-2"
              >
                hello@eliteinemirates.com
              </a>
              .
            </p>
          </section>

          {/* 9. International Transfers */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              9. International Transfers
            </h2>
            <p className="text-sm md:text-base text-gray-700 text-justify">
              Although our website may be accessed globally, your submitted data
              may be processed in India (where our team operates) and in the UAE
              (by developers or agents handling your enquiry). We take
              appropriate steps to ensure that your data is handled securely in
              both locations.
            </p>
          </section>

          {/* 10. Links to Other Websites */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              10. Links to Other Websites
            </h2>
            <p className="text-sm md:text-base text-gray-700 text-justify">
              Our website may contain links to external websites. We are not
              responsible for the privacy practices or content of those
              third-party sites and encourage you to review their policies
              separately.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              11. Changes to This Policy
            </h2>
            <p className="text-sm md:text-base text-gray-700 text-justify">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated “Last Updated” date.
              We encourage you to review this page periodically to stay informed
              about how we protect your information.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0a1a33] mb-3 font-['Playfair_Display'] border-l-4 border-[#d5b36a] pl-3">
              12. Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-2 text-justify">
              For any questions about this Privacy Policy or your data rights,
              please contact:
            </p>
            <div className="rounded-2xl border border-[#d5b36a33] bg-[#fffaf0] px-4 py-3">
              <p className="text-sm md:text-base text-[#0a1a33]">
                📧{" "}
                <a
                  href="mailto:hello@eliteinemirates.com"
                  className="text-[#b08a2a] underline underline-offset-2"
                >
                  hello@eliteinemirates.com
                </a>
              </p>
              <p className="text-sm md:text-base text-[#0a1a33] mt-1">
                🌐{" "}
                <a
                  href="https://www.eliteinemirates.com"
                  className="text-[#b08a2a] underline underline-offset-2"
                >
                  www.eliteinemirates.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
