// src/pages/admin/AdminSignIn.jsx - WITH API INTEGRATION
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      await login(formData.email, formData.password);

      toast.success("Welcome back, Admin!", {
        duration: 2000,
        style: {
          background: "#0A2540",
          color: "#CFAF4E",
        },
      });

      // ✅ Navigate to /admin/leads after successful login
      setTimeout(() => {
        navigate("/admin/leads");
      }, 1000);
    } catch (err) {
      toast.error(error || "Invalid email or password");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CFAF4E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Sign In Card */}
        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-[#CFAF4E]/10 rounded-full mb-4 animate-pulse">
              <Shield className="text-[#CFAF4E]" size={48} />
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#CFAF4E] mb-2">
              Elite In Emirates
            </h1>
            <p className="text-white/70 font-['Inter']">Admin Dashboard</p>
          </div>

          {/* Sign In Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-[#CFAF4E]/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/70 font-['Inter'] text-sm mb-6">
              Sign in to access your admin panel
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-sm font-['Inter']">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-white/90 font-['Inter'] text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CFAF4E]/70"
                    size={20}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent font-['Inter'] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white/90 font-['Inter'] text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CFAF4E]/70"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent font-['Inter'] transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#CFAF4E] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#CFAF4E] focus:ring-[#CFAF4E] focus:ring-offset-0"
                  />
                  <span className="text-white/70 text-sm font-['Inter'] group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[#CFAF4E] text-sm font-['Inter'] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#CFAF4E] text-[#0A2540] font-['Inter'] font-semibold rounded-lg hover:bg-[#E4C666] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/50 text-xs text-center font-['Inter']">
                Need help? Contact your administrator
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-white/50 text-xs font-['Inter']">
              © 2025 Elite In Emirates. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignIn;
