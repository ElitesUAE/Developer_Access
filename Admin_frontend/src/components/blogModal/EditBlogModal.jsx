// src/components/admin/EditBlogModal.jsx - FULLY RESPONSIVE
import { useState, useEffect } from "react";
import { X, Upload, Loader2, Edit3, Save } from "lucide-react";
import { useBlogStore } from "../../store/useBlogStore.js";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function EditBlogModal({ isOpen, onClose, blog }) {
  const { updateBlog, loading } = useBlogStore();

  const [isEditMode, setIsEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  // Quill editor toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  // Pre-fill form when blog prop changes
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setDescription(blog.description || "");
      setCategory(blog.category || "");
      setTags(
        Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || ""
      );

      // Convert DD-MM-YYYY to YYYY-MM-DD for date input
      if (blog.date) {
        const [day, month, year] = blog.date.split("-");
        if (day && month && year) {
          setDate(`${year}-${month}-${day}`);
        }
      }

      setImagePreview(blog.imageUrl || null);
      setImageFile(null);
      setIsEditMode(false);
    }
  }, [blog]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    // Validate description has content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    if (!textContent.trim()) {
      alert("Please add a description");
      return;
    }

    try {
      await updateBlog(blog._id, {
        imageFile,
        date,
        title,
        description,
        category,
        tags,
      });
      setIsEditMode(false);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Close handler
  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  // Backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !blog) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl transform transition-all animate-slideUp max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Mobile Optimized */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#CFAF4E]/20 bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="font-['Playfair_Display'] text-base sm:text-2xl font-bold text-[#CFAF4E]">
              {isEditMode ? "Edit Blog" : "View Blog"}
            </h2>
            {!isEditMode && (
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium bg-blue-500/20 text-blue-200 rounded-full font-['Inter']">
                View
              </span>
            )}
            {isEditMode && (
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium bg-green-500/20 text-green-200 rounded-full font-['Inter']">
                Edit
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 text-[#CFAF4E] hover:bg-[#CFAF4E]/10 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5"
        >
          {/* Image - Mobile Optimized */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Blog Image
            </label>
            <div className="relative">
              {isEditMode ? (
                <div className="relative w-full h-48 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden border-2 border-[#CFAF4E]/30 group">
                  <img
                    src={
                      imagePreview ||
                      "https://via.placeholder.com/600x300?text=No+Image"
                    }
                    alt={title}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark Overlay on Hover/Touch */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <label
                      htmlFor="edit-blog-image"
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-[#0A2540] font-medium rounded-lg cursor-pointer transform scale-90 group-hover:scale-100 transition-all duration-300 flex items-center gap-2 shadow-xl hover:bg-gray-50 font-['Inter'] text-xs sm:text-sm"
                    >
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Change Image</span>
                      <span className="sm:hidden">Change</span>
                    </label>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="edit-blog-image"
                  />

                  {/* Image Info Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 sm:px-3 sm:py-1 bg-black/70 text-white text-[10px] sm:text-xs rounded-full backdrop-blur-sm font-['Inter']">
                    {imageFile ? "New image" : "Current"}
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-48 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden border border-[#CFAF4E]/20 shadow-sm">
                  <img
                    src={
                      imagePreview ||
                      "https://via.placeholder.com/600x300?text=No+Image"
                    }
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Image Change Indicator */}
            {isEditMode && imageFile && (
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg flex items-start sm:items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0 mt-1 sm:mt-0"></div>
                <span className="text-xs sm:text-sm text-green-700 font-medium font-['Inter'] flex-1">
                  New image ready: {imageFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(blog.imageUrl);
                  }}
                  className="text-green-700 hover:text-green-900 text-xs sm:text-sm underline font-['Inter'] flex-shrink-0"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="edit-title"
              className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
            >
              Title
            </label>
            {isEditMode ? (
              <input
                type="text"
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
                placeholder="Enter blog title"
              />
            ) : (
              <div className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] text-sm sm:text-base font-['Inter']">
                {title}
              </div>
            )}
          </div>

          {/* Date and Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Date */}
            <div>
              <label
                htmlFor="edit-date"
                className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
              >
                Date
              </label>
              {isEditMode ? (
                <input
                  type="date"
                  id="edit-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
                />
              ) : (
                <div className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] text-sm sm:text-base font-['Inter']">
                  {blog.date}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="edit-category"
                className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
              >
                Category
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  id="edit-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
                  placeholder="e.g., Technology"
                />
              ) : (
                <div className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-[#CFAF4E]/20 text-[#0A2540] font-['Inter']">
                    {category || "Uncategorized"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="edit-tags"
              className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
            >
              Tags
            </label>
            {isEditMode ? (
              <input
                type="text"
                id="edit-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
                placeholder="e.g., react, nodejs"
              />
            ) : (
              <div className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                {tags ? (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tags.split(",").map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gray-200 text-gray-700 rounded font-['Inter']"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#333333]/60 text-sm font-['Inter']">
                    No tags
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Description
            </label>
            {isEditMode ? (
              <>
                <div className="border border-[#CFAF4E]/30 rounded-lg overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your blog description..."
                    className="bg-white"
                    style={{ height: "250px" }}
                  />
                </div>
                <p className="mt-2 text-[10px] sm:text-xs text-[#333333]/60 font-['Inter']">
                  Use the toolbar to format text
                </p>
              </>
            ) : (
              <div
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2540] prose prose-sm max-w-none text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>

          {/* Extra spacing for Quill editor */}
          {isEditMode && <div className="h-16"></div>}
        </form>

        {/* Footer - Mobile Optimized */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-[#CFAF4E]/20 bg-gray-50 rounded-b-xl sm:rounded-b-2xl">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#333333] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 font-['Inter']"
          >
            Close
          </button>

          <div className="flex gap-2 sm:gap-3">
            {isEditMode && (
              <button
                type="button"
                onClick={() => {
                  if (blog) {
                    setTitle(blog.title || "");
                    setDescription(blog.description || "");
                    setCategory(blog.category || "");
                    setTags(
                      Array.isArray(blog.tags)
                        ? blog.tags.join(", ")
                        : blog.tags || ""
                    );
                    setImagePreview(blog.imageUrl || null);
                    setImageFile(null);
                  }
                  setIsEditMode(false);
                }}
                disabled={loading}
                className="px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#333333] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 font-['Inter']"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2 font-['Inter'] ${
                isEditMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#CFAF4E] hover:bg-[#E4C666] text-[#0A2540]"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                  <span className="hidden sm:inline">Updating...</span>
                  <span className="sm:hidden">Saving</span>
                </>
              ) : isEditMode ? (
                <>
                  <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Save Changes</span>
                  <span className="sm:hidden">Save</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Enable Edit</span>
                  <span className="sm:hidden">Edit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
