// src/components/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A2540] border-b border-[#CFAF4E]/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#CFAF4E]/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="text-[#CFAF4E]" size={24} />
              ) : (
                <Menu className="text-[#CFAF4E]" size={24} />
              )}
            </button>
            <h1 className="font-['Playfair_Display'] text-xl font-bold text-[#CFAF4E]">
              Admin Panel
            </h1>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Content Area with padding for mobile header */}
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
