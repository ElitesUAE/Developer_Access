import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../../store/useBlogStore.js";

const LatestArticles = ({
  title = "Latest Articles",
  breadcrumb = "Our Blogs",
  showBreadcrumb = true,
  onArticleClick = null,
}) => {
  const { homePageBlogs, loading, error, fetchHomePageBlogs } = useBlogStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomePageBlogs();
  }, [fetchHomePageBlogs]);

  const handleArticleClick = (article) => {
    // Navigate to the blog detail page with the blog ID
    navigate(`/blogs/${article._id}`);

    // Call the optional onArticleClick callback if provided
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-lg text-[var(--color-charcol-gray)]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="blog-section py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Title */}
          <div className="mb-6">
            {showBreadcrumb && (
              <div className="flex items-center gap-2 mb-2 text-sm text-[var(--color-charcol-gray)]">
                <HomeIcon className="text-gold h-4 w-4" />
                <span>{breadcrumb}</span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-[var(--font-luxury)] text-[var(--color-navy)]">
              {title}
            </h1>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homePageBlogs.map((article) => (
              <article
                key={article._id}
                className="blog-card group cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                {/* Card Container */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Category Badge */}
                  {/* {article.category && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block px-4 py-1.5 bg-white text-[var(--color-navy)] text-xs font-medium uppercase tracking-wider shadow-md">
                        {article.category}
                      </span>
                    </div>
                  )} */}

                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Image Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl font-[var(--font-modern)] text-[var(--color-navy)] mb-4 leading-tight group-hover:text-[var(--color-gold)] transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-[var(--color-charcol-gray)] opacity-70 mt-auto">
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Component Styles */}
      <style jsx="true">{`
        .blog-card {
          position: relative;
        }

        .blog-card::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--color-gold) 0%,
            var(--color-gold-light) 100%
          );
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }

        .blog-card:hover::before {
          transform: scaleX(1);
        }

        @media (max-width: 768px) {
          .blog-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
      `}</style>
    </>
  );
};

// PropTypes
LatestArticles.propTypes = {
  title: PropTypes.string,
  breadcrumb: PropTypes.string,
  showBreadcrumb: PropTypes.bool,
  onArticleClick: PropTypes.func,
};

export default LatestArticles;
