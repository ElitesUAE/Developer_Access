// src/store/useLeadStore.js - WITH DEBUG LOGS
import { create } from "zustand";
import api from "../lib/axios";

export const useLeadStore = create((set) => ({
  // State
  blundersLeads: [],
  strategiesLeads: [],
  loading: false,
  submitting: false,
  error: null,

  // Submit blunders lead
  submitBlundersLead: async (name, email) => {
    console.log("🔥 submitBlundersLead FUNCTION CALLED");
    console.log("📧 Name:", name);
    console.log("📧 Email:", email);

    set({ submitting: true, error: null });

    try {
      console.log("📡 Making API call to /leads/blunders/submit");

      const { data } = await api.post("/leads/blunders/submit", {
        name,
        email,
      });

      console.log("✅ API Success:", data);
      set({ submitting: false });
      return data;
    } catch (error) {
      console.error("❌ API Error:", error);
      console.error("❌ Error Response:", error.response?.data);

      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, submitting: false });
      throw new Error(errorMessage);
    }
  },

  // Submit strategies lead
  submitStrategiesLead: async (name, email) => {
    console.log("🔥 submitStrategiesLead FUNCTION CALLED");
    console.log("📧 Name:", name);
    console.log("📧 Email:", email);

    set({ submitting: true, error: null });

    try {
      console.log("📡 Making API call to /leads/strategies/submit");

      const { data } = await api.post("/leads/strategies/submit", {
        name,
        email,
      });

      console.log("✅ API Success:", data);
      set({ submitting: false });
      return data;
    } catch (error) {
      console.error("❌ API Error:", error);
      console.error("❌ Error Response:", error.response?.data);

      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, submitting: false });
      throw new Error(errorMessage);
    }
  },

  // Fetch all blunders leads
  fetchBlundersLeads: async (page = 1, limit = 20) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(
        `/leads/blunders/all?page=${page}&limit=${limit}`
      );
      set({
        blundersLeads: data.leads,
        loading: false,
      });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Fetch all strategies leads
  fetchStrategiesLeads: async (page = 1, limit = 20) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(
        `/leads/strategies/all?page=${page}&limit=${limit}`
      );
      set({
        strategiesLeads: data.leads,
        loading: false,
      });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear leads
  clearBlundersLeads: () => set({ blundersLeads: [] }),
  clearStrategiesLeads: () => set({ strategiesLeads: [] }),
}));
