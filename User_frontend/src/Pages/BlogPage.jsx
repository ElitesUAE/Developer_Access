// src/pages/BlogPage.jsx - WITH INLINE FILTERS
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogPageComponents/BlogCard";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Loader from "../components/Loader";
import { useBlogStore } from "../store/useBlogStore";
import StructuredData from "../components/StructuredData";
import useSEO from "../hooks/useSEO";
const BlogPage = () => {
  useSEO({
    title:
      "Dubai Real Estate Blog | Property Market Insights - Elite In Emirates",
    description:
      "Get the latest insights on Dubai real estate market, property investment tips, and luxury lifestyle in UAE. Expert advice from Elite In Emirates.",
    keywords:
      "Dubai real estate blog, property investment Dubai, UAE property market, luxury lifestyle Dubai, real estate tips UAE, Dubai property news",
    ogImage: "https://eliteinemirates.com/blogs",
    canonical: "https://eliteinemirates.com/blogs",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Elite In Emirates Blog",
    description:
      "Real estate insights and property market trends in Dubai and UAE",
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // Get from store
  const {
    blogs,
    loading,
    error,
    pagination,
    categories,
    fetchBlogsPagination,
    fetchCategories,
  } = useBlogStore();

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogsPagination(1, null, null, sortOrder);
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    fetchBlogsPagination(
      1,
      category === "All" ? null : category,
      null,
      sortOrder
    );
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2 || query.length === 0) {
      fetchBlogsPagination(
        1,
        selectedCategory === "All" ? null : selectedCategory,
        query || null,
        sortOrder
      );
    }
  };

  // Handle sort change
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    fetchBlogsPagination(
      1,
      selectedCategory === "All" ? null : selectedCategory,
      searchQuery || null,
      newSortOrder
    );
  };

  // Handle pagination
  const handlePageChange = (page) => {
    fetchBlogsPagination(
      page,
      selectedCategory === "All" ? null : selectedCategory,
      searchQuery || null,
      sortOrder
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(
      1,
      pagination.currentPage - Math.floor(maxVisible / 2)
    );
    let end = Math.min(pagination.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Display categories with "All"
  const displayCategories = ["All", ...categories];

  // Sort options for dropdown
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  // Loading state
  if (loading && blogs?.length === 0) {
    return <Loader message="Loading blogs..." />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Inter'] text-red-500 mb-4">Error: {error}</p>
          <Button
            onClick={() => fetchBlogsPagination(1, null, null, sortOrder)}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-[#F4F4F4]">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0A2540] via-[#0A2540] to-[#1A3A5C] text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#CFAF4E]">
                Real Estate Insights
              </h1>
              <p className="font-['Inter'] text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Expert advice, market trends, and insider knowledge to help you
                make informed property decisions in Dubai
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white border-b border-[#CFAF4E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-6 py-4 pl-12 bg-[#F4F4F4] border border-[#CFAF4E]/30 rounded-lg text-[#333333] placeholder-[#333333]/50 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all font-['Inter']"
                />
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CFAF4E]"
                />
              </div>
            </div>

            {/* Categories & Sort Filter - Inline */}
            {/* <div className="flex flex-col lg:flex-row lg:items-center gap-4">
             
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <SlidersHorizontal
                  size={20}
                  className="text-[#CFAF4E] flex-shrink-0 hidden sm:block"
                />

                
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide flex-1">
                  {displayCategories?.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full font-['Inter'] text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                        selectedCategory === category
                          ? "bg-[#0A2540] text-[#CFAF4E]"
                          : "bg-[#F4F4F4] text-[#333333] hover:bg-[#CFAF4E]/20"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

                 <div className="w-full lg:w-48 flex-shrink-0">
                <Dropdown
                  options={sortOptions}
                  value={sortOrder}
                  onChange={handleSortChange}
                  placeholder="Sort by"
                  icon={ArrowUpDown}
                />
              </div>
            </div> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Count */}
          <div className="mb-6">
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0A2540]">
              {selectedCategory === "All"
                ? "Latest Articles"
                : selectedCategory}
            </h2>
            <p className="font-['Inter'] text-[#333333]/70 text-sm mt-1">
              {pagination.totalBlogs} article
              {pagination.totalBlogs !== 1 ? "s" : ""} found
              {pagination.totalPages > 1 &&
                ` • Page ${pagination.currentPage} of ${pagination.totalPages}`}
            </p>
          </div>

          {/* Blog Grid */}
          {blogs?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs?.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-12 pt-8 border-t border-[#CFAF4E]/20">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-['Inter'] text-xs sm:text-sm font-medium transition-all ${
                      pagination.currentPage === 1
                        ? "bg-[#F4F4F4] text-[#333333]/50 cursor-not-allowed"
                        : "bg-white border border-[#CFAF4E]/30 text-[#0A2540] hover:bg-[#CFAF4E]/10"
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {pagination.currentPage > 3 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 sm:px-4 py-2 rounded-lg font-['Inter'] text-xs sm:text-sm font-medium bg-white border border-[#CFAF4E]/30 text-[#0A2540] hover:bg-[#CFAF4E]/10 transition-all"
                      >
                        1
                      </button>
                      {pagination.currentPage > 4 && (
                        <span className="px-2 text-[#333333]/50">...</span>
                      )}
                    </>
                  )}

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-['Inter'] text-xs sm:text-sm font-medium transition-all ${
                        pagination.currentPage === page
                          ? "bg-[#0A2540] text-[#CFAF4E]"
                          : "bg-white border border-[#CFAF4E]/30 text-[#0A2540] hover:bg-[#CFAF4E]/10"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {pagination.currentPage < pagination.totalPages - 2 && (
                    <>
                      {pagination.currentPage < pagination.totalPages - 3 && (
                        <span className="px-2 text-[#333333]/50">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="px-3 sm:px-4 py-2 rounded-lg font-['Inter'] text-xs sm:text-sm font-medium bg-white border border-[#CFAF4E]/30 text-[#0A2540] hover:bg-[#CFAF4E]/10 transition-all"
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-['Inter'] text-xs sm:text-sm font-medium transition-all ${
                      pagination.currentPage === pagination.totalPages
                        ? "bg-[#F4F4F4] text-[#333333]/50 cursor-not-allowed"
                        : "bg-white border border-[#CFAF4E]/30 text-[#0A2540] hover:bg-[#CFAF4E]/10"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#0A2540] mb-2">
                No Articles Found
              </h3>
              <p className="font-['Inter'] text-[#333333]/70 mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortOrder("newest");
                  fetchBlogsPagination(1, null, null, "newest");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default BlogPage;
