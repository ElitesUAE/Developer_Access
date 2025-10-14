// src/store/useAdminStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const useAdminStore = create((set) => ({
  // State
  admins: [],
  currentAdmin: null,
  stats: null,
  loading: false,
  error: null,

  // Set loading
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // Get all admins
  getAllAdmins: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/auth/admins", { params: filters });

      set({
        admins: data.admins,
        stats: data.pagination,
        loading: false,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch admins";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Create admin
  createAdmin: async (adminData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/auth/admins", adminData);

      set((state) => ({
        admins: [data.admin, ...state.admins],
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create admin";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Update admin
  updateAdmin: async (id, adminData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put(`/auth/admins/${id}`, adminData);

      set((state) => ({
        admins: state.admins.map((admin) =>
          admin._id === id ? data.admin : admin
        ),
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update admin";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Delete admin
  deleteAdmin: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/auth/admins/${id}`);

      set((state) => ({
        admins: state.admins.filter((admin) => admin._id !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete admin";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Toggle admin status
  toggleAdminStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.patch(`/auth/admins/${id}/toggle-status`);

      set((state) => ({
        admins: state.admins.map((admin) =>
          admin._id === id ? data.admin : admin
        ),
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to toggle admin status";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },
}));
