// src/store/useBlogStore.js
import { create } from "zustand";
import api from "../lib/axios";
import { normalizeTags } from "../utils/blogHelpers";

export const useBlogStore = create((set, get) => ({
  blogs: [],
  currentBlog: null,
  relatedBlogs: [],
  categories: [],
  searchResults: [],
  homePageBlogs: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    limit: 9,
  },

  // Fetch all blogs
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/blogs");
      set({ blogs: data, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // ========================================
  // FETCH BLOGS WITH PAGINATION (Blog Listing Page)
  // ========================================
  // fetchBlogsPagination: async (page = 1, category = null, search = null) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const params = new URLSearchParams({
  //       page: page.toString(),
  //       limit: get().pagination.limit.toString(),
  //     });

  //     if (category && category !== "All") {
  //       params.append("category", category);
  //     }

  //     if (search) {
  //       params.append("search", search);
  //     }

  //     const { data } = await api.get(`/blogs/pagination?${params.toString()}`);

  //     set({
  //       blogs: data.blogs,
  //       pagination: data.pagination,
  //       loading: false,
  //     });

  //     return data;
  //   } catch (e) {
  //     set({ error: e.message, loading: false });
  //     throw e;
  //   }
  // },

  // src/store/useBlogStore.js - VERIFY THIS EXISTS
  fetchBlogsPagination: async (
    page = 1,
    category = null,
    search = null,
    sort = "newest"
  ) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: get().pagination.limit.toString(),
        sort: sort, // This sends sort to backend
      });

      if (category && category !== "All") {
        params.append("category", category);
      }

      if (search) {
        params.append("search", search);
      }

      const { data } = await api.get(`/blogs/pagination?${params.toString()}`);

      set({
        blogs: data.blogs,
        pagination: data.pagination,
        loading: false,
      });

      return data;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // ========================================
  // FETCH SINGLE BLOG BY ID (Blog Details Page)
  // ========================================
  fetchBlogById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/blogs/${id}`);
      set({ currentBlog: data.blog, loading: false });
      return data.blog;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // ========================================
  // FETCH ALL CATEGORIES (For Filter Dropdown)
  // ========================================
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/blogs/meta/categories");
      set({ categories: data.categories, loading: false });
      return data.categories;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // ========================================
  // FETCH RELATED BLOGS (Blog Details Page)
  // ========================================
  fetchRelatedBlogs: async (category, excludeId, limit = 2) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams({
        category,
        exclude: excludeId,
        limit: limit.toString(),
      });

      const { data } = await api.get(
        `/blogs/related/category?${params.toString()}`
      );
      set({ relatedBlogs: data.blogs, loading: false });
      return data.blogs;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // ========================================
  // SEARCH BLOGS (Autocomplete/Live Search)
  // ========================================
  searchBlogs: async (query, limit = 5) => {
    if (!query || query.length < 2) {
      set({ searchResults: [] });
      return [];
    }

    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
      });

      const { data } = await api.get(
        `/blogs/search/query?${params.toString()}`
      );
      set({ searchResults: data.results, loading: false });
      return data.results;
    } catch (e) {
      set({ error: e.message, loading: false, searchResults: [] });
      throw e;
    }
  },

  // ========================================
  // CLEAR FUNCTIONS
  // ========================================
  clearCurrentBlog: () => {
    set({ currentBlog: null });
  },

  clearSearchResults: () => {
    set({ searchResults: [] });
  },

  clearRelatedBlogs: () => {
    set({ relatedBlogs: [] });
  },

  // Create blog with file upload
  createBlog: async ({
    imageFile,
    date,
    title,
    description,
    category,
    tags,
  }) => {
    set({ loading: true, error: null });
    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("date", date);
      form.append("title", title);
      form.append("description", description);
      if (category) form.append("category", category);

      const tagList = normalizeTags(tags);
      if (tagList.length) {
        tagList.forEach((t) => form.append("tags", t));
      }

      const { data } = await api.post("/blogs/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ blogs: [data.blog, ...get().blogs], loading: false });
      return data.blog;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // Update blog; supports optional new image
  updateBlog: async (
    id,
    { imageFile, date, title, description, category, tags }
  ) => {
    set({ loading: true, error: null });
    try {
      let res;
      if (imageFile) {
        const form = new FormData();
        form.append("image", imageFile);
        if (date) form.append("date", date);
        if (title) form.append("title", title);
        if (description) form.append("description", description);
        if (category) form.append("category", category);
        if (typeof tags !== "undefined") {
          normalizeTags(tags).forEach((t) => form.append("tags", t));
        }
        res = await api.put(`/blogs/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const payload = {};
        if (date) payload.date = date;
        if (title) payload.title = title;
        if (description) payload.description = description;
        if (typeof category !== "undefined") payload.category = category;
        if (typeof tags !== "undefined") payload.tags = normalizeTags(tags);
        res = await api.put(`/blogs/${id}`, payload);
      }

      const updated = res.data.blog;
      set({
        blogs: get().blogs.map((b) => (b._id === updated._id ? updated : b)),
        loading: false,
      });
      return updated;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // Delete blog
  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/blogs/${id}`);
      set({ blogs: get().blogs.filter((b) => b._id !== id), loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // Get homepage blogs
  fetchHomePageBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/blogs/homepage");
      set({ homePageBlogs: data.blogs, loading: false });
      return data.blogs;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // Add single blog to homepage
  addToHomePage: async (blogId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.patch(`/blogs/${blogId}/add-to-home`);

      // Update the specific blog in blogs array
      set({
        blogs: get().blogs.map((b) =>
          b._id === blogId ? { ...b, isOnHomePage: true } : b
        ),
        loading: false,
      });

      return data;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  // Remove single blog from homepage
  removeFromHomePage: async (blogId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.patch(`/blogs/${blogId}/remove-from-home`);

      // Update the specific blog in blogs array
      set({
        blogs: get().blogs.map((b) =>
          b._id === blogId ? { ...b, isOnHomePage: false } : b
        ),
        loading: false,
      });

      return data;
    } catch (e) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },
}));
