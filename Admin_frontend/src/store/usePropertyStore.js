// src/store/usePropertyStore.js
import { create } from "zustand";
import api from "../lib/axios";

export const usePropertyStore = create((set) => ({
  // ==================== STATE ====================
  properties: [],
  currentProperty: null,
  homePageProperties: [],
  adminProperties: [], // ✅ NEW: For admin all properties
  adminPropertiesCount: 0, // ✅ NEW: Total count for admin
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

  // Search properties with filters (Direct API call)
  searchProperties: async (searchFilters) => {
    set({ loading: true, error: null });
    try {
      console.log("🔍 Searching properties with filters:", searchFilters);

      const { data } = await api.post("/properties/search", searchFilters);

      console.log("✅ Search results:", data);
      set({
        properties: data?.properties || [],
        loading: false,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to search properties";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch all properties with optional filters
  fetchProperties: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      // Build query params (only include non-empty values)
      const params = {};
      Object.keys(filters).forEach((key) => {
        if (
          filters[key] !== "" &&
          filters[key] !== null &&
          filters[key] !== undefined
        ) {
          params[key] = filters[key];
        }
      });

      const { data } = await api.get("/properties", { params });

      console.log("Fetched properties:", data);
      set({
        properties: data?.properties || [],
        loading: false,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch properties";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch single property by ID
  fetchPropertyById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/properties/property/${id}`);
      set({ currentProperty: data, loading: false });
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch property";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // ✅ NEW: Fetch all properties for admin (complete data)
  fetchAllPropertiesAdmin: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/properties/admin/all");

      console.log("Fetched admin properties:", data);
      set({
        adminProperties: data?.properties || [],
        adminPropertiesCount: data?.count || 0,
        loading: false,
      });

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch admin properties";
      set({
        error: errorMessage,
        loading: false,
        adminProperties: [],
        adminPropertiesCount: 0,
      });
      throw error;
    }
  },

  // Create new property
  createProperty: async (propertyData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();

      // Append images (File objects)
      if (propertyData.images && propertyData.images.length > 0) {
        propertyData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      // Append other fields
      Object.keys(propertyData).forEach((key) => {
        if (
          key !== "images" &&
          propertyData[key] !== undefined &&
          propertyData[key] !== null
        ) {
          // Stringify arrays and objects
          if (
            key === "unitTypes" ||
            key === "highlights" ||
            key === "amenities"
          ) {
            formData.append(key, JSON.stringify(propertyData[key]));
          } else {
            formData.append(key, propertyData[key]);
          }
        }
      });

      const { data } = await api.post("/properties/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Add new property to the beginning of all lists
      set((state) => ({
        properties: [data.property, ...state.properties],
        adminProperties: [data.property, ...state.adminProperties], // ✅ Also update admin list
        adminPropertiesCount: state.adminPropertiesCount + 1, // ✅ Increment count
        loading: false,
      }));

      return data.property;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create property";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();

      // Append new images (if any)
      if (propertyData.images && propertyData.images.length > 0) {
        propertyData.images.forEach((image) => {
          // Only append if it's a File object (new upload)
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      // Append other fields
      Object.keys(propertyData).forEach((key) => {
        if (
          key !== "images" &&
          propertyData[key] !== undefined &&
          propertyData[key] !== null
        ) {
          // Stringify arrays and objects
          if (
            key === "unitTypes" ||
            key === "highlights" ||
            key === "amenities"
          ) {
            formData.append(key, JSON.stringify(propertyData[key]));
          } else {
            formData.append(key, propertyData[key]);
          }
        }
      });

      const { data } = await api.put(`/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update property in all lists
      set((state) => ({
        properties: state.properties.map((property) =>
          property._id === id ? data.property : property
        ),
        adminProperties: state.adminProperties.map((property) =>
          property._id === id ? data.property : property
        ), // ✅ Also update admin list
        currentProperty:
          state.currentProperty?._id === id
            ? data.property
            : state.currentProperty,
        loading: false,
      }));

      return data.property;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update property";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Delete property
  deleteProperty: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/properties/${id}`);

      // Remove property from all lists
      set((state) => ({
        properties: state.properties.filter((property) => property._id !== id),
        adminProperties: state.adminProperties.filter(
          (property) => property._id !== id
        ), // ✅ Also remove from admin list
        adminPropertiesCount: Math.max(0, state.adminPropertiesCount - 1), // ✅ Decrement count
        currentProperty:
          state.currentProperty?._id === id ? null : state.currentProperty,
        loading: false,
      }));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete property";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Delete single image from property
  deletePropertyImage: async (propertyId, imageUrl) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.delete(`/properties/${propertyId}/image`, {
        data: { imageUrl },
      });

      // Update property with remaining images in all lists
      set((state) => ({
        properties: state.properties.map((property) =>
          property._id === propertyId
            ? { ...property, images: data.remainingImages }
            : property
        ),
        adminProperties: state.adminProperties.map((property) =>
          property._id === propertyId
            ? { ...property, images: data.remainingImages }
            : property
        ), // ✅ Also update admin list
        currentProperty:
          state.currentProperty?._id === propertyId
            ? { ...state.currentProperty, images: data.remainingImages }
            : state.currentProperty,
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete image";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // ==================== HOMEPAGE METHODS ====================

  // Fetch homepage properties
  fetchHomePageProperties: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/properties/homepage");
      set({
        homePageProperties: data?.properties || [],
        loading: false,
      });
      return data.properties;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch homepage properties";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Add property to homepage
  addToHomePage: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put(`/properties/${id}/add-to-homepage`);

      // Update property in all lists
      set((state) => ({
        properties: state.properties.map((property) =>
          property._id === id ? { ...property, isOnHomePage: true } : property
        ),
        adminProperties: state.adminProperties.map((property) =>
          property._id === id ? { ...property, isOnHomePage: true } : property
        ), // ✅ Also update admin list
        currentProperty:
          state.currentProperty?._id === id
            ? { ...state.currentProperty, isOnHomePage: true }
            : state.currentProperty,
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add property to homepage";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Remove property from homepage
  removeFromHomePage: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put(`/properties/${id}/remove-from-homepage`);

      // Update property in all lists
      set((state) => ({
        properties: state.properties.map((property) =>
          property._id === id ? { ...property, isOnHomePage: false } : property
        ),
        adminProperties: state.adminProperties.map((property) =>
          property._id === id ? { ...property, isOnHomePage: false } : property
        ), // ✅ Also update admin list
        homePageProperties: state.homePageProperties.filter(
          (property) => property._id !== id
        ),
        currentProperty:
          state.currentProperty?._id === id
            ? { ...state.currentProperty, isOnHomePage: false }
            : state.currentProperty,
        loading: false,
      }));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove property from homepage";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // ✅ NEW: Clear admin properties
  clearAdminProperties: () => {
    set({
      adminProperties: [],
      adminPropertiesCount: 0,
    });
  },
}));
