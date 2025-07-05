import React from 'react'
import "./Product.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure this is included
import { HiMiniShoppingCart } from "react-icons/hi2";
import plantvideo from '/videos/plant1medicine.mp4'; 
import axios from 'axios';
import Footer from  '../../components/Footer/Footer'
import {useState,useEffect,useRef} from 'react'

import { useNavigate } from "react-router-dom";

const Product = ({ addToCart }) => {

  const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
      
    const handlePlay = () => {
      videoRef.current.play();
        setIsPlaying(true);
    };
  
    
  const handlePlaybutton = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

   const [productData, setProductData] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
     axios.get("http://localhost:8802/alldata/product")
       .then((res) => {
         if (res.data?.data) setProductData(res.data.data);
       })
       .catch((err) => console.error("Error fetching products:", err));
   }, []);

    const handleClick = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product._id}`, {
      state: { product }, // Pass full product object
    });
  };


  return (
    <>
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero__overlay">
          <h1 className="products-hero__title">
            Our Herbal Products
          </h1>
        </div>
      </section>

      <div className="topRatedProduct">
        <h1>Our Top Rated Products</h1>
        <div className="topProducts">
          {
            productData.slice(10, 15).map((product) =>{
              return(
              <div className="top-product-cards" key={product._id} >
                <div className="top-productsCard" onClick={() => handleClick(product)}>
                  <img src={product.image_link} alt={product.name} />
                  <div className="product-details">
                    <div className="product-title">{product.name}</div>
                    <div className="product-price">₹{product.price}</div>
                    <p className="rating">Rating:- {product.rating}</p>
                    <button
                      onClick={(e) => {
                      e.stopPropagation(); // ⛔ prevents navigation
                      addToCart(product);
                    }}
                    className="Productcart-btn-overlay"
                    >
                    <HiMiniShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>

      </div>

      <div className="medicinalPreparation">
        
        <div className="content-main-head">
          <h2>🌿 How We Craft Our Herbal Products</h2>
          <p>
            Our herbal remedies are made with care—sustainably sourced, sun-dried, and blended using traditional Ayurvedic techniques. 
            We ensure each product retains its natural healing essence without chemicals or preservatives.
          </p>
        </div>

        <div className="product-page__video-container">
          <video  ref={videoRef} className="product-page__video" muted loop controls>
            <source src={plantvideo} type="video/mp4" />
          </video>
          <div className="video-overlay-plant"  onClick={handlePlaybutton}>
            <button className="play-button-plant">&#9658;</button>
          </div>
        </div>


      </div>


      
      <div className="bestSellerProduct">
        <h1 className="bestSeller-heading">🌿 Our Best Sellers</h1>
        <p className="bestSeller-subtext">
          Discover the herbal products our customers love the most.  
          These top picks combine nature’s purity with trusted effectiveness.
        </p>

        <hr className="bestSeller-divider" />

        <div className="bestSeller-grid">
          {
            productData.slice(0, 5).map((product) => (
              <div className="bestSeller-card" key={product._id} onClick={() => handleClick(product)}>
                <img src={product.image_link} alt={product.name} className="bestSeller-image" />
                <div className="bestSeller-info">
                  <div className="bestSeller-name">{product.name}</div>
                  <div className="bestSeller-price">₹{product.price}</div>
                 <button
                            onClick={(e) => {
                              e.stopPropagation(); // ⛔ prevents navigation
                              addToCart(product);
                            }}
                            className="Productcart-btn-overlay"
                          >
                            <HiMiniShoppingCart />
                          </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>


      <div className="allProductsPage">
        <h1 className='mainProductHeading'>Nature's Healing Collection</h1>
        <p>Emphasizes the natural healing power of the products.</p>

        <div className="allProductPageProducts">
          {
            productData.map((product) =>{
              return(
                <div className="allProducts-product-cards" key={product._id} >
                  <div className="all-productsCard" onClick={() => handleClick(product)}>
                    <div className="img">
                      <img src={product.image_link} alt={product.name} />
                    </div>
                    <div className="allproduct-details">
                      <div className="allproduct-title">{product.name}</div>
                      <div className="allproduct-price">₹{product.price}</div>
                      <p className="rating">Rating:- {product.rating}</p>
                     <button
                      onClick={(e) => {
                      e.stopPropagation(); // ⛔ prevents navigation
                      addToCart(product);
                    }}
                    className="Productcart-btn-overlay"
                    >
                    <HiMiniShoppingCart />
                    </button>
                    </div>
                  </div>
                </div>

              )})
            
          }

        </div>
         <ToastContainer />
      </div>

        
        
      <div className="footcont">
        <Footer/>
      </div>

    </>
  )
}

export default Product
