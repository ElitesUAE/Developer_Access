// src/pages/BlogTable.jsx - FULLY RESPONSIVE VERSION
import { useEffect, useState } from "react";
import { useBlogStore } from "../store/useBlogStore";
import {
  Pencil,
  Trash2,
  Loader2,
  Plus,
  Home,
  Calendar,
  Tag,
} from "lucide-react";
import CreateBlogModal from "../components/blogModal/CreateBlogModal";
import EditBlogModal from "../components/blogModal/EditBlogModal";
import DeleteConfirmModal from "../components/blogModal/DeleteConfirmModal";

export default function BlogTable() {
  const {
    blogs,
    loading,
    error,
    fetchBlogs,
    deleteBlog,
    addToHomePage,
    removeFromHomePage,
  } = useBlogStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [homepageLoading, setHomepageLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Count blogs on homepage
  const homepageCount = blogs.filter((b) => b.isOnHomePage).length;

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBlog) return;

    setDeleteLoading(true);
    try {
      await deleteBlog(selectedBlog._id);
      setIsDeleteModalOpen(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!deleteLoading) {
      setIsDeleteModalOpen(false);
      setSelectedBlog(null);
    }
  };

  // Handle homepage checkbox toggle
  const handleHomePageCheckbox = async (blog) => {
    setHomepageLoading(true);
    try {
      if (blog.isOnHomePage) {
        await removeFromHomePage(blog._id);
      } else {
        if (homepageCount >= 3) {
          alert(
            "Maximum 3 blogs allowed on homepage. Please remove one first."
          );
          setHomepageLoading(false);
          return;
        }
        await addToHomePage(blog._id);
      }
    } catch (error) {
      console.error("Homepage update failed:", error);
      alert(error.message || "Failed to update homepage");
    } finally {
      setHomepageLoading(false);
    }
  };

  if (loading && !blogs.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#CFAF4E]" />
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#0A2540]">
                Blog Posts
              </h1>
              <p className="text-xs sm:text-sm text-[#333333]/70 mt-1 font-['Inter'] flex items-center gap-2 flex-wrap">
                Manage all your blog content
                <span className="px-2 py-0.5 text-[10px] sm:text-xs bg-[#CFAF4E]/20 text-[#0A2540] rounded-full font-medium">
                  {homepageCount}/3 on homepage
                </span>
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-['Inter'] font-semibold text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Create Blog</span>
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm sm:text-base font-['Inter']">
            {error}
          </div>
        )}

        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-[#CFAF4E]/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#CFAF4E]/10">
              <thead className="bg-[#0A2540]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    <div className="flex items-center justify-center gap-2">
                      <Home className="w-4 h-4" />
                      Homepage
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-[#CFAF4E] uppercase tracking-wider font-['Inter']">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-[#CFAF4E]/10">
                {blogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-[#333333]/70 font-['Inter']"
                    >
                      No blogs found. Create your first blog post!
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog, idx) => {
                    const canCheck = homepageCount < 3 || blog.isOnHomePage;

                    return (
                      <tr
                        key={blog._id}
                        className="hover:bg-[#F4F4F4] transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden shadow-sm border border-[#CFAF4E]/20">
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/64?text=No+Image";
                              }}
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[#0A2540] line-clamp-2 font-['Inter']">
                            {blog.title}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#333333] font-['Inter']">
                            {blog.date}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[#CFAF4E]/20 text-[#0A2540] font-['Inter']">
                            {blog.category || "Uncategorized"}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={blog.isOnHomePage || false}
                                onChange={() => handleHomePageCheckbox(blog)}
                                disabled={!canCheck || homepageLoading}
                                className={`
                                  w-5 h-5 rounded border-2 transition-all duration-200
                                  ${
                                    blog.isOnHomePage
                                      ? "bg-green-500 border-green-500"
                                      : "bg-white border-gray-300"
                                  }
                                  ${
                                    !canCheck && !blog.isOnHomePage
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer hover:border-green-400"
                                  }
                                  focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                  disabled:opacity-50 disabled:cursor-not-allowed
                                `}
                              />
                              {blog.isOnHomePage && (
                                <svg
                                  className="absolute w-3 h-3 text-white pointer-events-none left-1 top-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </label>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleEditClick(blog)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="View/Edit blog"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => handleDeleteClick(blog)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete blog"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View - Visible on Mobile/Tablet */}
        <div className="lg:hidden space-y-3 sm:space-y-4">
          {blogs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-[#CFAF4E]/20">
              <div className="w-16 h-16 bg-[#CFAF4E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-[#CFAF4E]" />
              </div>
              <p className="text-base sm:text-lg font-medium font-['Playfair_Display'] text-[#0A2540]">
                No blogs found
              </p>
              <p className="text-xs sm:text-sm mt-1 font-['Inter'] text-[#333333]/70">
                Create your first blog post!
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 px-4 py-2 bg-[#CFAF4E] text-[#0A2540] rounded-lg hover:bg-[#E4C666] transition-colors font-['Inter'] font-semibold text-sm"
              >
                Create Blog
              </button>
            </div>
          ) : (
            blogs.map((blog) => {
              const canCheck = homepageCount < 3 || blog.isOnHomePage;

              return (
                <div
                  key={blog._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-[#CFAF4E]/20 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x300?text=No+Image";
                      }}
                    />
                    {/* Homepage Badge */}
                    {blog.isOnHomePage && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold font-['Inter'] shadow-md flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        Homepage
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 bg-[#0A2540]/80 backdrop-blur-sm text-[#CFAF4E] px-2 py-1 rounded-full text-xs font-semibold font-['Inter']">
                      {blog.category || "Uncategorized"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    {/* Title */}
                    <h3 className="font-['Playfair_Display'] text-base sm:text-lg font-semibold text-[#0A2540] mb-2 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-[#333333]/70 mb-3 font-['Inter']">
                      <Calendar
                        size={14}
                        className="text-[#CFAF4E] flex-shrink-0"
                      />
                      <span>{blog.date}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-[#CFAF4E]/10">
                      {/* Homepage Toggle */}
                      <div className="flex items-center gap-2 flex-1">
                        <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-[#333333] font-['Inter']">
                          <input
                            type="checkbox"
                            checked={blog.isOnHomePage || false}
                            onChange={() => handleHomePageCheckbox(blog)}
                            disabled={!canCheck || homepageLoading}
                            className={`
                              w-4 h-4 rounded border-2 transition-all duration-200
                              ${
                                blog.isOnHomePage
                                  ? "bg-green-500 border-green-500"
                                  : "bg-white border-gray-300"
                              }
                              ${
                                !canCheck && !blog.isOnHomePage
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }
                            `}
                          />
                          <span className="inline">Homepage</span>
                        </label>
                      </div>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-['Inter'] font-medium"
                        title="View/Edit blog"
                      >
                        <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(blog)}
                        className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 font-['Inter'] font-medium"
                        title="Delete blog"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Blog Count */}
        {blogs.length > 0 && (
          <div className="mt-4 text-xs sm:text-sm text-[#333333]/70 text-center font-['Inter']">
            Showing {blogs.length} blog{blogs.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        blogTitle={selectedBlog?.title}
      />
    </div>
  );
}
