import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h2 className="footer-logo">GreenBloom 🌿</h2>
        <p className="p1">Connecting Nature with Technology – One Herb at a Time.</p>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
        
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/explore-plants">Explore Plants</Link>
          <Link to="/explore-Tour">Tour</Link>
          <Link to="/products">Our Herbal Products</Link>
          <Link to="/remedies">Home Remedies</Link>
          <Link to="/quiz">Play Quiz</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        <p className="copyright">
          © {new Date().getFullYear()} GreenBloom | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
