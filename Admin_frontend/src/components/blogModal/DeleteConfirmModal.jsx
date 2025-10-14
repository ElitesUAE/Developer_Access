// src/components/DeleteConfirmModal.jsx
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  blogTitle,
}) {
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

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon Section */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6">
          {/* Warning Circle Icon with "i" */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Delete Blog?
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-2">
            Are you sure you want to delete this blog?
          </p>

          {/* Blog Title Display */}
          {blogTitle && (
            <div className="w-full mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-700 text-center font-medium line-clamp-2">
                "{blogTitle}"
              </p>
            </div>
          )}

          {/* Warning Text */}
          <p className="text-sm text-red-600 text-center mt-3">
            This action cannot be undone.
          </p>
        </div>

        {/* Button Section */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-5 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
