

// src/components/PopupManager.jsx - FULLY INTEGRATED
import React, { useState, useEffect } from "react";
import LeadMagnetPopup from "./LeadMagnetPopup";

const PopupManager = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [popupQueue, setPopupQueue] = useState([]);

  useEffect(() => {
    // Check if user has seen popups before (using localStorage)
    const hasSeenBlunders = localStorage.getItem("hasSeenBlundersPopup");
    const hasSeenStrategies = localStorage.getItem("hasSeenStrategiesPopup");
    const lastPopupDate = localStorage.getItem("lastPopupDate");
    const today = new Date().toDateString();

    // Initialize popup queue based on what user hasn't seen
    const queue = [];

    // Show blunders popup if never seen or if it's a new day
    if (!hasSeenBlunders || lastPopupDate !== today) {
      queue.push("blunders");
    }

    // Show strategies popup if never seen (will show after blunders)
    if (!hasSeenStrategies || lastPopupDate !== today) {
      queue.push("strategies");
    }

    setPopupQueue(queue);

    // Show first popup after 3 seconds delay
    if (queue.length > 0) {
      const timer = setTimeout(() => {
        setActivePopup(queue[0]);
      }, 3000); // 3 second delay after page load

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    if (activePopup) {
      // Mark current popup as seen
      localStorage.setItem(
        `hasSeen${activePopup === "blunders" ? "Blunders" : "Strategies"}Popup`,
        "true"
      );
      localStorage.setItem("lastPopupDate", new Date().toDateString());
    }

    // Remove current popup from queue
    const remainingQueue = popupQueue.slice(1);
    setPopupQueue(remainingQueue);
    setActivePopup(null);

    // Show next popup after 5 seconds if there is one
    if (remainingQueue.length > 0) {
      setTimeout(() => {
        setActivePopup(remainingQueue[0]);
      }, 5000); // 5 second delay between popups
    }
  };

  return (
    <>
      {/* Blunders Popup */}
      <LeadMagnetPopup
        type="blunders"
        isOpen={activePopup === "blunders"}
        onClose={handleClosePopup}
      />

      {/* Strategies Popup */}
      <LeadMagnetPopup
        type="strategies"
        isOpen={activePopup === "strategies"}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default PopupManager;
