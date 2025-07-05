import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer"; // Adjust path
import "./Products.css"; // New CSS file
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetailPage({addToCart}) {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [quantities, setQuantities] = useState({});
  if (!product) {
    return (
      <div className="product-error">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }
  const handleAddToCart = (product) => {
    const quantity = quantities?.[product._id] || 1;
    const item = {
      id: product._id,
      name: product.name || "Unnamed Product",
      image: product.image_link || "default-image.jpg",
      price: product.price,
      quantity,
    };
    addToCart(item);
  };
  

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  return (
    <>
    <div className="product-top-banner"></div>
    <div className="product-detail-wrapper">

      {/* Main image and content split */}
      <div className="product-top-section">
        <img src={product.image_link} alt={product.name} className="product-image" />

        <div className="product-content">
          <h1>{product.name} 🍃</h1>
          <p className="price">₹{product.price}</p>
          <p className="rating">Rating:- {product.rating}</p>

          <div className="quantity-box">
            <button onClick={() => decreaseQuantity(product._id)}>-</button>
            <span>{quantities[product._id] || 1}</span>
            <button onClick={() => increaseQuantity(product._id)}>+</button>
            <button className="add-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
         

          <div className="faqs-box">
            <h3>FAQs</h3>
            <li>All full-priced, unworn items, with tags attached and in their original packaging are eligible for return or exchange within 7 days of placing your order.</li>
            <li>Packs must be returned in full. We do not accept partial returns.</li>
            <li>Want to know our full returns policies?<a href="#"> Here you go.</a></li>
            <li>Want more info about shipping, materials, or care instructions?<a href="#">Here!</a></li>
            
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="description-box">
        <h3>Description</h3>
        <p>
          This plant is a perfect addition to any home or office space. Known for its vibrant foliage and air-purifying qualities, it requires minimal maintenance.
          Great for gifting, suitable for all seasons, thrives in indirect sunlight, and needs watering twice a week.
        </p>
        <p><strong>Weight:</strong> 250g &nbsp; | &nbsp; <strong>Size:</strong> Medium</p>
      </section>

      {/* Reviews Section */}
      <section className="reviews-box">
        <h3>Customer Reviews</h3>
        <p>{product.review}</p>
        <p className="rating">⭐ {product.rating}</p>
      </section>

      <ToastContainer/> 
    </div>
    <Footer />
    </>
  );
}
