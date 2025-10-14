// src/components/admin/CreateBlogModal.jsx - FULLY RESPONSIVE
import { useState, useEffect } from "react";
import { X, Upload, Loader2, Plus } from "lucide-react";
import { useBlogStore } from "../../store/useBlogStore.js";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CreateBlogModal({ isOpen, onClose }) {
  const { createBlog, loading } = useBlogStore();

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

  // Handle body scroll lock when modal is open
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

  // Handle image preview
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

  // Reset form
  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setDate("");
    setTitle("");
    setDescription("");
    setCategory("");
    setTags("");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if description has content (not just empty HTML tags)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    if (!textContent.trim()) {
      alert("Please add a description");
      return;
    }

    try {
      await createBlog({
        imageFile,
        date,
        title,
        description,
        category,
        tags,
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Modal container - Mobile Optimized */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-xl sm:rounded-2xl shadow-2xl transform transition-all animate-slideUp max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Mobile Optimized */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#CFAF4E]/20 bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] rounded-t-xl sm:rounded-t-2xl">
          <h2 className="font-['Playfair_Display'] text-lg sm:text-2xl font-bold text-[#CFAF4E]">
            Create New Blog
          </h2>
          <button
            onClick={onClose}
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
          {/* Image upload - Mobile Optimized */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Blog Image *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="hidden"
                id="blog-image"
              />
              <label
                htmlFor="blog-image"
                className="flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-[#CFAF4E]/30 rounded-lg cursor-pointer hover:border-[#CFAF4E] hover:bg-[#CFAF4E]/5 transition-all duration-200"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#333333]/70">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-[#CFAF4E]" />
                    <span className="text-xs sm:text-sm font-medium font-['Inter']">
                      Click to upload image
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#333333]/60 mt-1 font-['Inter']">
                      PNG, JPG up to 10MB
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
              placeholder="Enter blog title"
            />
          </div>

          {/* Date and Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
              >
                Date *
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
                placeholder="e.g., Technology"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all duration-200 text-sm sm:text-base font-['Inter']"
              placeholder="e.g., react, nodejs (comma-separated)"
            />
          </div>

          {/* Rich Text Description */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              Description *
            </label>
            <div className="border border-[#CFAF4E]/30 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder="Write your blog description with rich formatting..."
                className="bg-white"
                style={{ height: "250px" }}
              />
            </div>
            <p className="mt-2 text-[10px] sm:text-xs text-[#333333]/60 font-['Inter']">
              Use the toolbar to format text, add lists, links, and more
            </p>
          </div>

          {/* Extra spacing for Quill editor */}
          <div className="h-16"></div>
        </form>

        {/* Footer - Mobile Optimized */}
        <div className="flex-shrink-0 flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-[#CFAF4E]/20 bg-gray-50 rounded-b-xl sm:rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#333333] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 font-['Inter']"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-[#0A2540] bg-[#CFAF4E] rounded-lg hover:bg-[#E4C666] transition-colors duration-200 disabled:opacity-50 flex items-center gap-2 font-['Inter']"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                <span className="hidden sm:inline">Creating...</span>
                <span className="sm:hidden">Creating</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Create Blog</span>
                <span className="sm:hidden">Create</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
