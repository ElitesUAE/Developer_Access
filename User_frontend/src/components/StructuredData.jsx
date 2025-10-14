// src/components/StructuredData.jsx
import { useEffect } from "react";

const StructuredData = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    // Create script element for structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.id = "structured-data";

    // Remove existing structured data
    const existing = document.getElementById("structured-data");
    if (existing) {
      existing.remove();
    }

    // Append new structured data
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById("structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null; // This component doesn't render anything
};

export default StructuredData;
