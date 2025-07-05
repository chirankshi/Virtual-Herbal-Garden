import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import Footer from '../../components/Footer/Footer';
import { FaMoon } from "react-icons/fa"; // Import the moon icon

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8802/alldata/blogs")
      .then((res) => res.json())
      .then((data) => {
        const fetchedBlogs = Array.isArray(data) ? data : data.data || [];
        setBlogs(fetchedBlogs);
        setLatestBlogs(
          [...fetchedBlogs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4)
        );
      });
  }, []);

  const openModal = (blog) => {
    setCurrentBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getReadTime = (content = "") => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const saveForLater = (id) => {
    alert(`Blog ${id} saved for later.`);
  };

  const renderBlogCard = (blog) => {
    const isFavorite = favorites[blog.id] || false;
    const readTime = getReadTime(blog.content);

    return (
      <div className="blog-card" key={blog.id}>
        {blog.thumbnail && (
          <img src={blog.thumbnail} alt={blog.title} className="blog-thumbnail" />
        )}
        <div className="blog-body">
          <h3>{blog.title}</h3>
          <p className="blog-meta">
            By <strong>{blog.author}</strong> | {new Date(blog.date).toLocaleDateString()}
          </p>
          <p className="blog-description">{blog.description}</p>
          <div className="blog-stats">
            <span>⏱ {readTime} min read</span>
            <span>👁 {blog.reads || 120}</span>
            <span>❤ {blog.likes || 85}</span>
            <span>🔗 {blog.shares || 45}</span>
          </div>
          <div className="blog-actions">
            <button className="read-more" onClick={() => openModal(blog)}>Read More</button>
            <button
              className={`favorite-btn ${isFavorite ? "liked" : ""}`}
              onClick={() => toggleFavorite(blog.id)}
            >
              {isFavorite ? "★" : "☆"} Favorite
            </button>
            <button className="save-later" onClick={() => saveForLater(blog.id)}>Save for Later</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`blog-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <section className="bloghero-section">
        <div className="bloghero-overlay"></div>
        <div className="bloghero-content">
          <h1>Herbal Blog Library</h1>
          <p>Discover the magic of herbs through curated articles and stories.</p>
        </div>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          <FaMoon />
        </button>
      </section>

      <div className="content-flex">
        <div className="content-right">
          <div className="blog-section">
            <h3>Latest Articles</h3>
            <div className="latest-blog-grid">
              {latestBlogs.map((blog) => renderBlogCard(blog))}
            </div>
          </div>

          <div className="blog-section">
            <h3>All Blogs</h3>
            <div className="blog-grid">
              {blogs.map((blog) => renderBlogCard(blog))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && currentBlog && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-glass-container" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={closeModal}>×</button>

      <div className="modal-grid-images">
        <div className="image-box image-thumbnail">
          <img src={currentBlog.thumbnail} alt="Thumbnail" />
          <div className="image-label">Thumbnail</div>
        </div>
        <div className="image-box image-main">
          <img src={currentBlog.mainImage || currentBlog.mainimage} alt="Main" />
          <div className="image-label">Main Image</div>
        </div>
      </div>

      <h2 className="modal-title">{currentBlog.title}</h2>
      <div className="modal-meta-info">
        <span>🖊 {currentBlog.author}</span> |{" "}
        <span>🕒 {currentBlog.readTime || `${getReadTime(currentBlog.content)} min read`}</span> |{" "}
        <span>📅 {new Date(currentBlog.date).toDateString()}</span>
      </div>

      <p className="modal-description">{currentBlog.description}</p>

      {currentBlog.plantsMentioned?.length > 0 && (
        <div className="modal-section">
          <h4>🌿 Plants Mentioned</h4>
          <ul className="plant-list">
            {currentBlog.plantsMentioned.map((plant, idx) => (
              <li key={idx}>🌱 {plant}</li>
            ))}
          </ul>
        </div>
      )}

      {currentBlog.usageTips && (
        <div className="modal-section usage-tips">
          <h4>💡 Usage Tips</h4>
          <p>{currentBlog.usageTips}</p>
        </div>
      )}

      {currentBlog.tags?.length > 0 && (
        <div className="modal-section">
          <h4>🏷 Tags</h4>
          <div className="tag-list">
            {currentBlog.tags.map((tag, idx) => (
              <span key={idx} className="tag-item">#{tag}</span>
            ))}
          </div>
        </div>
      )}

      <div className="modal-actions">
        <button onClick={handlePrint} className="print-btn">🖨 Print</button>
        <div className="social-share">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <button>Share on Facebook</button>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <button>Share on Twitter</button>
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <button>Share on Pinterest</button>
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <button>Share on Whatsapp</button>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <button>Share on Linkedin</button>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <button>Share on Instagram</button>
          </a>
        </div>

      </div>
    </div>
  </div>
)}

      {/* ✅ Footer moved here (once, not per card) */}
      <div className="footcont">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
