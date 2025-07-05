import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <IoClose className="close-icon" onClick={closeSidebar} />
      </div>
      <ul className="sidebar-links">
        <li><Link to="/" onClick={closeSidebar}>Home</Link></li>
        <li><Link to="/explore-plants" onClick={closeSidebar}>Explore Plants</Link></li>
        <li><Link to="/blogs" onClick={closeSidebar}>Blogs</Link></li>
        <li><Link to="/product" onClick={closeSidebar}>Our Herbal Products</Link></li>
        <li><Link to="/reviews" onClick={closeSidebar}>Reviews</Link></li>
        <li><Link to="/aboutus" onClick={closeSidebar}>About Us</Link></li>
        <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
        <li><Link to="/profile" onClick={closeSidebar}>Profile</Link></li>
        <li><Link to="/quiz" onClick={closeSidebar}>Play Quiz</Link></li>
        <li><Link to="/home-remedies" onClick={closeSidebar}>Home Remedies</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

