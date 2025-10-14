// src/components/admin/AdminSidebar.jsx - WITH CUSTOM LOGOUT MODAL
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Mail,
  Phone,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  X,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    toast.success("Logged out successfully");
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const menuItems = [
    {
      title: "Properties",
      icon: <Home size={20} />,
      path: "/admin/properties",
      matchPaths: ["/admin/properties"],
    },
    {
      title: "Blogs",
      icon: <FileText size={20} />,
      path: "/admin/blogs",
      matchPaths: ["/admin/blogs"],
    },
    {
      title: "Callback Requests",
      icon: <Phone size={20} />,
      path: "/admin/callbacks",
      matchPaths: ["/admin/callbacks"],
    },
    {
      title: "Subscribers",
      icon: <Mail size={20} />,
      path: "/admin/newsletter",
      matchPaths: ["/admin/newsletter"],
    },
    {
      title: "Popup Leads",
      icon: <Users size={20} />,
      path: "/admin/leads",
      matchPaths: ["/admin/leads"],
    },
    {
      title: "ContactUs Messages",
      icon: <MessageSquare size={20} />,
      path: "/admin/contact",
      matchPaths: ["/admin/contact"],
    },
    {
      title: "Admin Management",
      icon: <Shield size={20} />,
      path: "/admin/admins",
      matchPaths: ["/admin/admins"],
    },
  ];

  // Check if current path matches item or its sub-pages
  const isActiveLink = (item) => {
    return item.matchPaths.some((matchPath) =>
      location.pathname.startsWith(matchPath)
    );
  };

  return (
    <>
      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64
          bg-gradient-to-b from-[#0A2540] via-[#0A2540] to-[#1A3A5C]
          border-r border-[#CFAF4E]/20
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Logo Section - Fixed at top */}
        <div className="flex-shrink-0 px-6 py-6 border-b border-[#CFAF4E]/20">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#CFAF4E]">
                Elite In Emirates
              </h1>
              <p className="text-xs text-white/70 mt-1 font-['Inter']">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 scrollbar-thin scrollbar-thumb-[#CFAF4E]/30 scrollbar-track-transparent hover:scrollbar-thumb-[#CFAF4E]/50">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = isActiveLink(item);

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg 
                    transition-all duration-300 font-['Inter'] group
                    ${
                      isActive
                        ? "bg-[#CFAF4E] text-[#0A2540] shadow-lg"
                        : "text-white/80 hover:bg-[#CFAF4E]/10 hover:text-[#CFAF4E]"
                    }
                  `}
                >
                  <span
                    className={`transition-colors flex-shrink-0 ${
                      isActive
                        ? "text-[#0A2540]"
                        : "text-[#CFAF4E] group-hover:text-[#CFAF4E]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.title}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-[#0A2540] rounded-full animate-pulse flex-shrink-0" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#CFAF4E]/20" />

          {/* Logout Button */}
          <div className="space-y-2">
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 font-['Inter'] w-full group"
            >
              <LogOut
                size={20}
                className="group-hover:text-red-300 flex-shrink-0"
              />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-[#CFAF4E]/20">
          <div className="text-center">
            <p className="text-xs text-white/50 font-['Inter']">
              © 2025 Elite In Emirates
            </p>
            <p className="text-xs text-white/30 font-['Inter'] mt-1">
              Admin Panel v1.0
            </p>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleLogoutCancel}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <div
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleLogoutCancel}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 sm:p-2 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-100 mb-4 sm:mb-5 mx-auto">
                <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
              </div>

              {/* Title */}
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#0A2540] mb-2 sm:mb-3 text-center">
                Logout Confirmation
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#333333]/70 mb-6 sm:mb-8 text-center leading-relaxed font-['Inter']">
                Are you sure you want to logout from the admin panel?
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={handleLogoutCancel}
                  className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 border-2 border-gray-300 text-[#333333] font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-['Inter'] text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center justify-center gap-2 font-['Inter'] text-sm sm:text-base shadow-md hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminSidebar;
