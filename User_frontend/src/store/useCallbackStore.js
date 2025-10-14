// src/store/useCallbackStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const useCallbackStore = create((set) => ({
  // State
  loading: false,
  error: null,
  successMessage: null,
  callbackRequests: [],
  currentRequest: null,
  stats: null,

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear messages
  clearMessages: () => set({ error: null, successMessage: null }),

  // Submit callback request
  submitCallbackRequest: async (requestData) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const { data } = await api.post("/callbacks", requestData);

      set({
        loading: false,
        successMessage: data.message,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit callback request";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Get all callback requests (Admin)
  getAllCallbackRequests: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/callbacks", { params: filters });

      set({
        loading: false,
        callbackRequests: data.callbackRequests,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch callback requests";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Get callback request by ID (Admin)
  getCallbackRequestById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/callbacks/${id}`);

      set({
        loading: false,
        currentRequest: data.callbackRequest,
      });

      return data.callbackRequest;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch callback request";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Update callback request status (Admin)
  updateCallbackRequestStatus: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put(`/callbacks/${id}`, updates);

      set((state) => ({
        loading: false,
        callbackRequests: state.callbackRequests.map((req) =>
          req._id === id ? data.callbackRequest : req
        ),
        successMessage: data.message,
      }));

      return data.callbackRequest;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update callback request";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Delete callback request (Admin)
  deleteCallbackRequest: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.delete(`/callbacks/${id}`);

      set((state) => ({
        loading: false,
        callbackRequests: state.callbackRequests.filter(
          (req) => req._id !== id
        ),
        successMessage: data.message,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete callback request";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },

  // Get callback statistics (Admin)
  getCallbackStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/callbacks/stats");

      set({
        loading: false,
        stats: data.stats,
      });

      return data.stats;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch callback statistics";

      set({
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  },
}));
