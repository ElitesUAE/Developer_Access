// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import PopupManager from "../components/popups/PopupManager";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <>
      {/* Main Layout */}
      <ScrollToTop/>
      <main>
        <Outlet />
      </main>
      {/* Popup Manager for entire site */}
      <PopupManager />
    </>
  );
};

export default Layout;
