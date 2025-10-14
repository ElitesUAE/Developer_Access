// src/hooks/useSEO.js
import { useEffect } from "react";

const useSEO = ({
  title = "Elite In Emirates",
  description = "Luxury properties in Dubai and UAE",
  keywords = "luxury properties Dubai, UAE real estate, premium villas",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
  author = "Elite In Emirates",
  robots = "index, follow", // ← Allow indexing for user site
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to update or create meta tags
    const setMetaTag = (name, content, isProperty = false) => {
      if (!content) return;

      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic SEO meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("author", author);
    setMetaTag("robots", robots);

    // Open Graph meta tags
    setMetaTag("og:title", ogTitle || title, true);
    setMetaTag("og:description", ogDescription || description, true);
    setMetaTag("og:image", ogImage, true);
    setMetaTag("og:url", ogUrl || window.location.href, true);
    setMetaTag("og:type", "website", true);

    // Twitter Card meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", ogTitle || title);
    setMetaTag("twitter:description", ogDescription || description);
    setMetaTag("twitter:image", ogImage);

    // Canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "canonical");
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute("href", canonical);
    }

    // Language
    document.documentElement.lang = "en";
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    canonical,
    author,
    robots,
  ]);
};

export default useSEO;
