// src/components/BlogCard.jsx - COMPLETE CODE
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import Button from "../Button";

const BlogCard = ({ blog, featured = false }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blogs/${blog?._id}`);
    window.scrollTo(0, 0);
  };

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

  // Strip HTML tags for excerpt
  const getPlainTextExcerpt = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  // Calculate read time
  // const calculateReadTime = (html) => {
  //   if (!html) return "5 min read";
  //   const div = document.createElement("div");
  //   div.innerHTML = html;
  //   const text = div.textContent || div.innerText || "";
  //   const words = text.split(/\s+/).length;
  //   const minutes = Math.ceil(words / 200);
  //   return `${minutes} min read`;
  // };

  const displayDate = formatDate(blog?.date);
  // const displayReadTime = calculateReadTime(blog?.description);
  const displayExcerpt = getPlainTextExcerpt(blog?.description);
  const displayImage = blog?.imageUrl;

  if (featured) {
    return (
      <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#CFAF4E]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image - FIXED HEIGHT */}
          <div className="relative h-auto md:h-96 overflow-hidden  bg-gray-100">
            <img
              src={displayImage}
              alt={blog?.title}
              className="w-full h-[200px] sm:h-[400px] md:h-full  object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* {blog?.category && (
              <div className="absolute top-4 left-4 bg-[#CFAF4E] text-[#0A2540] px-4 py-1 rounded-full text-sm font-semibold font-['Inter']">
                {blog?.category}
              </div>
            )} */}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 text-sm text-[#333333]/70 font-['Inter']">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#CFAF4E]" />
                  <span>{displayDate}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#CFAF4E]" />
                  <span>{displayReadTime}</span>
                </div> */}
              </div>

              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0A2540] mb-3 group-hover:text-[#CFAF4E] transition-colors line-clamp-2">
                {blog?.title}
              </h2>

              <p className="font-['Inter'] text-[#333333]/80 text-base leading-relaxed mb-4 line-clamp-3">
                {displayExcerpt}
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleReadMore}
              rightIcon={<ArrowRight size={18} />}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#CFAF4E]/10 h-full flex flex-col">
      {/* Image - FIXED HEIGHT */}
      <div className="relative h-56 overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={displayImage}
          alt={blog?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* {blog?.category && (
          <div className="absolute top-4 left-4 bg-[#CFAF4E] text-[#0A2540] px-3 py-1 rounded-full text-xs font-semibold font-['Inter']">
            {blog?.category}
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-3 text-xs text-[#333333]/70 font-['Inter']">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-[#CFAF4E]" />
            <span>{displayDate}</span>
          </div>
          {/* <div className="flex items-center gap-1">
            <Clock size={14} className="text-[#CFAF4E]" />
            <span>{displayReadTime}</span>
          </div> */}
        </div>

        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0A2540] mb-2 line-clamp-2 group-hover:text-[#CFAF4E] transition-colors">
          {blog?.title}
        </h3>

        <p className="font-['Inter'] text-[#333333]/80 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {displayExcerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#CFAF4E]/20 mt-auto">
          <div className="flex items-center gap-3 text-xs text-[#333333]/70">
            {blog?.tags && blog?.tags.length > 0 && (
              <span className="font-['Inter']">#{blog?.tags[0]}</span>
            )}
          </div>

          <button
            onClick={handleReadMore}
            className="flex items-center gap-2 text-[#CFAF4E] hover:text-[#B8973A] transition-colors font-['Inter'] text-sm font-medium"
          >
            Read More
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
