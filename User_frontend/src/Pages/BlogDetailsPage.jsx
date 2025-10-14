// src/pages/BlogDetailsPage.jsx - COMPLETE CODE
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ChevronLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useBlogStore } from "../store/useBlogStore";
import StructuredData from "../components/StructuredData";
import useSEO from "../hooks/useSEO";
const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);

  const {
    currentBlog,
    relatedBlogs,
    loading,
    error,
    fetchBlogById,
    fetchRelatedBlogs,
    clearCurrentBlog,
    clearRelatedBlogs,
  } = useBlogStore();

  // Fetch blog by ID on mount
  useEffect(() => {
    fetchBlogById(id);

    return () => {
      clearCurrentBlog();
      clearRelatedBlogs();
    };
  }, [id]);

  // Fetch related blogs when current blog loads
  useEffect(() => {
    if (currentBlog?.category) {
      fetchRelatedBlogs(currentBlog?.category, id, 2);
    }
  }, [currentBlog]);

  // Format date from DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate read time
  const calculateReadTime = (html) => {
    if (!html) return "5 min read";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Get plain text excerpt
  const getPlainTextExcerpt = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = currentBlog?.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  // Loading state
  if (loading || !currentBlog) {
    return <Loader message="Loading blog..." />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Inter'] text-red-500 mb-4">Error: {error}</p>
          <Button onClick={() => navigate("/blogs")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <style jsx="true">{`
          .blog-content {
            font-family: "Inter", sans-serif;
            font-size: 1rem;
            line-height: 1.7;
            color: #333333;
          }

          .blog-content h2 {
            font-family: "Playfair Display", serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: #0a2540;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }

          .blog-content h3 {
            font-family: "Playfair Display", serif;
            font-size: 1.25rem;
            font-weight: 600;
            color: #0a2540;
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
          }

          .blog-content p {
            margin-bottom: 1rem;
          }

          .blog-content ul,
          .blog-content ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }

          .blog-content li {
            margin-bottom: 0.5rem;
          }

          .blog-content strong {
            color: #0a2540;
            font-weight: 600;
          }

          .blog-content a {
            color: #cfaf4e;
            text-decoration: underline;
          }

          .blog-content a:hover {
            color: #b8973a;
          }

          /* Quill editor specific styles */
          .blog-content .ql-align-justify {
            text-align: justify;
          }

          .blog-content .ql-align-center {
            text-align: center;
          }

          .blog-content .ql-align-right {
            text-align: right;
          }
        `}</style>

        {/* Back Button */}
        <div className="bg-[#F4F4F4] border-b border-[#CFAF4E]/10">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <button
              onClick={() => navigate("/blogs")}
              className="flex items-center gap-2 text-[#0A2540] hover:text-[#CFAF4E] transition-colors font-['Inter'] text-sm"
            >
              <ChevronLeft size={18} />
              Back to Blog
            </button>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Category Badge */}
          {/* {currentBlog?.category && (
            <div className="mb-3">
              <span className="inline-block bg-[#CFAF4E] text-[#0A2540] px-3 py-1 rounded text-xs font-semibold font-['Inter']">
                {currentBlog?.category}
              </span>
            </div>
          )} */}

          {/* Title */}
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0A2540] mb-4 leading-tight">
            {currentBlog?.title}
          </h1>
          {/* Tags */}
          {currentBlog?.tags && currentBlog?.tags.length > 0 && (
            <div className="mb-3 pb-3 border-b border-[#CFAF4E]/20">
              <div className="flex flex-wrap gap-2">
                {currentBlog?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#F4F4F4] text-[#333333] rounded text-sm font-['Inter'] hover:bg-[#CFAF4E]/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[#CFAF4E]/20">
            <div className="flex items-center gap-3 text-sm text-[#333333]/70 font-['Inter']">
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-[#CFAF4E]" />
                <span>{formatDate(currentBlog?.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-[#CFAF4E]" />
                <span>{calculateReadTime(currentBlog?.description)}</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="ml-auto relative">
              {/* <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#F4F4F4] hover:bg-[#CFAF4E]/20 rounded transition-colors font-['Inter'] text-sm"
              >
                <Share2 size={14} className="text-[#CFAF4E]" />
                Share
              </button> */}

              {/* {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-[#CFAF4E]/20 p-2 min-w-[180px] z-20">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F4F4F4] rounded transition-colors"
                  >
                    <Facebook size={16} className="text-[#1877F2]" />
                    <span className="font-['Inter'] text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F4F4F4] rounded transition-colors"
                  >
                    <Twitter size={16} className="text-[#1DA1F2]" />
                    <span className="font-['Inter'] text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F4F4F4] rounded transition-colors"
                  >
                    <Linkedin size={16} className="text-[#0A66C2]" />
                    <span className="font-['Inter'] text-sm">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F4F4F4] rounded transition-colors"
                  >
                    <LinkIcon size={16} className="text-[#CFAF4E]" />
                    <span className="font-['Inter'] text-sm">Copy Link</span>
                  </button>
                </div>
              )} */}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-6 rounded-lg overflow-hidden shadow">
            <img
              src={currentBlog?.imageUrl}
              alt={currentBlog?.title}
              className="w-full h-[200px] sm:h-[400px] object-contain md:h-[500px]"
            />
          </div>

          {/* Article Content - Render HTML from Quill */}
          <div
            className="blog-content mb-8"
            dangerouslySetInnerHTML={{ __html: currentBlog?.description }}
          />

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mb-8">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] mb-4">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <div
                    key={relatedBlog?._id}
                    className="group bg-white rounded-lg overflow-hidden border border-[#CFAF4E]/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      navigate(`/blogs/${relatedBlog?._id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={relatedBlog?.imageUrl}
                        alt={relatedBlog?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* {relatedBlog?.category && (
                        <div className="absolute top-3 left-3 bg-[#CFAF4E] text-[#0A2540] px-2 py-1 rounded text-xs font-semibold font-['Inter']">
                          {relatedBlog?.category}
                        </div>
                      )} */}
                    </div>

                    <div className="p-4">
                      <h4 className="font-['Playfair_Display'] text-lg font-semibold text-[#0A2540] mb-2 line-clamp-2 group-hover:text-[#CFAF4E] transition-colors">
                        {relatedBlog?.title}
                      </h4>

                      <div className="flex items-center justify-between pt-3 border-t border-[#CFAF4E]/20">
                        <div className="flex items-center gap-3 text-xs text-[#333333]/70 font-['Inter']">
                          <span>{formatDate(relatedBlog?.date)}</span>
                        </div>

                        <div className="flex items-center gap-1 text-[#CFAF4E] text-sm font-medium">
                          Read
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  );
};

export default BlogDetailsPage;
