// src/store/useContactStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const useContactStore = create((set) => ({
  // ==================== STATE ====================
  contacts: [],
  currentContact: null,
  contactsCount: 0,
  loading: false,
  error: null,

  // ==================== ACTIONS ====================

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // ==================== API CALLS ====================

  // Create new contact submission (Public)
  createContact: async (contactData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/contacts/create", contactData);

      set({ loading: false });
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit contact form";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Get all contacts (Admin)
  fetchAllContacts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/contacts/admin/all-simple");

      set({
        contacts: data.contacts || [],
        contactsCount: data.count || 0,
        loading: false,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch contacts";
      set({
        error: errorMessage,
        loading: false,
        contacts: [],
        contactsCount: 0,
      });
      throw error;
    }
  },

  // Get contact by ID (Admin)
  fetchContactById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/contacts/getbyid/${id}`);

      set({
        currentContact: data.data,
        loading: false,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch contact";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Delete contact (Admin)
  deleteContact: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.delete(`/contacts/delete/${id}`);

      // Remove contact from state
      set((state) => ({
        contacts: state.contacts.filter((contact) => contact._id !== id),
        contactsCount: Math.max(0, state.contactsCount - 1),
        currentContact:
          state.currentContact?._id === id ? null : state.currentContact,
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete contact";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Clear current contact
  clearCurrentContact: () => {
    set({ currentContact: null });
  },

  // Clear all contacts
  clearContacts: () => {
    set({
      contacts: [],
      currentContact: null,
      contactsCount: 0,
      error: null,
    });
  },
}));
