// src/store/useNewsletterStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const useNewsletterStore = create((set) => ({
  // State
  loading: false,
  error: null,
  successMessage: null,
  subscribers: [],
  stats: null,

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear messages
  clearMessages: () => set({ error: null, successMessage: null }),

  // Subscribe to newsletter
  subscribe: async (email, source = "footer") => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const { data } = await api.post("/newsletter/subscribe", {
        email,
        source,
      });

      set({
        loading: false,
        successMessage: data.message,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to subscribe";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const { data } = await api.post("/newsletter/unsubscribe", { email });

      set({
        loading: false,
        successMessage: data.message,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to unsubscribe";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Get all subscribers (Admin)
  getAllSubscribers: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/newsletter/subscribers", {
        params: filters,
      });

      set({
        loading: false,
        subscribers: data.subscribers,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch subscribers";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Get newsletter statistics (Admin)
  getStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/newsletter/stats");

      set({
        loading: false,
        stats: data.stats,
      });

      return data.stats;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch statistics";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Delete subscriber (Admin)
  deleteSubscriber: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.delete(`/newsletter/${id}`);

      // Remove from local state
      set((state) => ({
        loading: false,
        subscribers: state.subscribers.filter((sub) => sub._id !== id),
        successMessage: data.message,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete subscriber";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },
}));
