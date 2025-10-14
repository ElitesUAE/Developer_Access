// src/store/useAuthStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const useAuthStore = create((set) => ({
  // State
  admin: null,
  token: localStorage.getItem("adminToken") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("adminToken"),

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/auth/login", { email, password });

      // Store token and admin info
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));

      set({
        admin: data.admin,
        token: data.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      set({
        admin: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Verify token
  verifyToken: async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      set({ isAuthenticated: false, admin: null });
      return false;
    }

    try {
      const { data } = await api.post("/auth/verify", { token });

      set({
        admin: data.admin,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (error) {
      // Token is invalid
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      set({
        admin: null,
        token: null,
        isAuthenticated: false,
      });

      return false;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    set({
      admin: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Get admin profile
  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/auth/profile");

      set({
        admin: data.admin,
        loading: false,
      });

      return data.admin;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch profile";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },
}));
