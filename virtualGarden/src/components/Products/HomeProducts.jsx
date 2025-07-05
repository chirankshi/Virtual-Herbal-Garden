import React, { useEffect, useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import Slider from "react-slick";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure this is included
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const HomeProducts = ({ addToCart }) => {
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
  const NextArrow = ({ onClick }) => (
    <button className="custom-arrow next-arrow" onClick={onClick}>
      <FaChevronRight />
    </button>
  );
  
  const PrevArrow = ({ onClick }) => (
    <button className="custom-arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4, // Default view for desktop
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200, // Large tablets and small laptops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // Tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  
  const handleClick = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product._id}`, {
      state: { product }, // Pass full product object
    });
  };
  return (
    <section className="home-products-carousel">
      <h2 className="carousel-title">Explore Our Herbal Products</h2>
      <Slider {...settings}>
        {/* {productData.map((product) => (
          <div className="carousel-product-card" key={product._id}  >
            <div className="product-image-wrapper" onClick={() => handleClick(product)}>
              <img src={product.image_link} alt={product.name} />
              <div className="product-overlay">
                <h3 className="overlay-title">{product.name}</h3>
                <p className="overlay-price">₹{product.price}</p>
                <div className="overlay-buttons">
                  <button onClick={() => addToCart(product)} className="cart-btn-overlay">
                    <HiMiniShoppingCart />
                    Add to Cart
                  </button>
                  <button className="wishlist-btn-overlay">
                    <AiOutlineHeart />
                  </button>
                </div>
              </div>
            </div>
            <div className="product-details">
            <div className="product-title">{product.name}</div>
            <div className="product-price">₹{product.price}</div>
            </div>
          </div>
        ))} */}
        {productData.map((product) => (
  <div className="carousel-product-card" key={product._id}>
    <div className="product-image-wrapper" onClick={() => handleClick(product)}>
      <img src={product.image_link} alt={product.name} />
      <div className="product-overlay">
        <h3 className="overlay-title">{product.name}</h3>
        <p className="overlay-price">₹{product.price}</p>
        <div className="overlay-buttons">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ⛔ prevents navigation
              addToCart(product);
            }}
            className="cart-btn-overlay"
          >
            <HiMiniShoppingCart />
            Add to Cart
          </button>
          <button
            className="wishlist-btn-overlay"
            onClick={(e) => e.stopPropagation()} // optional: also stop redirect
          >
            <AiOutlineHeart />
          </button>
        </div>
      </div>
    </div>
    <div className="product-details">
      <div className="product-title">{product.name}</div>
      <div className="product-price">₹{product.price}</div>
    </div>
  </div>
))}

      </Slider>
       <ToastContainer />
    </section>
  );
};

export default HomeProducts;







// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { GrView } from "react-icons/gr";
// import "./Products.css";
// import { HiMiniShoppingCart } from "react-icons/hi2";

// const HomeProducts = ({ addToCart }) => {
//   const [productData, setProductData] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?limit=10")
//       .then((res) => res.json())
//       .then((data) => {
//         setProductData(data);
//         const initialQuantities = {};
//         data.forEach((product) => {
//           initialQuantities[product.id] = 1;
//         });
//         setQuantities(initialQuantities);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleQuickView = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddToCart = (product) => {
//     const quantity = quantities[product.id] || 1;
//     addToCart({ ...product, quantity });
//   };

//   const increaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, (prev[id] || 1) - 1),
//     }));
//   };

//   return (
//     <section className="home-products" id="products">
//       <h2 className="home-products-title">Explore <span>Our Herbal Products</span></h2>

//       {loading ? (
//         <div className="loader-container">
//           <div className="loader"></div>
//         </div>
//       ) : (
//         <div className="product-scroll-container">
//           {productData.map((product) => (
//             <div className="product-card" key={product.id}>
//               <img src={product.image} alt={product.title} />
//               <h3>{product.title.slice(0, 30)}...</h3>
//               <p className="price">₹{Math.floor(product.price * 83)}</p>

//               <div className="quantity-controls">
//                 <button onClick={() => decreaseQuantity(product.id)}>-</button>
//                 <span>{quantities[product.id] || 1}</span>
//                 <button onClick={() => increaseQuantity(product.id)}>+</button>
//               </div>

//               <div className="btns">
//               <button className="cart-btn" onClick={() => handleAddToCart(product)}><HiMiniShoppingCart size={24}/></button>
//               {/* <button className="cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button> */}
//               {/* <button className="quick-view-btn" onClick={() => handleQuickView(product)}>View Product</button> */}
//               <button className="quick-view-btn" onClick={() => handleQuickView(product)}><GrView size={24}/></button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="explore-more-container">
//         <Link to="/product" className="explore-more-btn">More</Link>
//       </div>

//       {showModal && selectedProduct && (
//         <div className="product-modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="product-modal-box" onClick={(e) => e.stopPropagation()}>
//             <div className="product-modal-title">{selectedProduct.title}🍃</div>
//             <div className="img">
//               <img
//                 className="product-modal-image"
//                 src={selectedProduct.image}
//                 alt={selectedProduct.title}
//               />
//             </div>
//             <div className="product-modal-price">
//               Price: ₹{(selectedProduct.price * 83).toFixed(0)}
//             </div>
//             <div className="product-modal-rating">
//               Rating: ⭐ {selectedProduct.rating.rate} / 5
//             </div>
//             <div className="product-modal-description">{selectedProduct.description}</div>
//             <button className="product-modal-close" onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default HomeProducts;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Products.css";
// import peppermint from "../../assets/images/Products/peppermint powder.jpg";
// import baheda from "../../assets/images/products/Bibhitaki Powder.jpg";
// import bayleaf from "../../assets/images/products/Bay Leaf Powder.jpg";
// import dandelion from "../../assets/images/products/Dandelion Powder.jpg";
// import neem from "../../assets/images/products/Neem Powder.jpg";
// import turmeric from "../../assets/images/products/Turmeric Powder.jpg";
// import saffron from "../../assets/images/products/Saffron Powder.jpg";
// import shankhapushpi from "../../assets/images/products/Shankhpushpi Powder.jpg";

// const plantData = [
//   {
//     "name": "Peppermint Leaves Powder",
//     "image_link": peppermint,
//     "price": "₹120",
//     "rating": "⭐4.5/5",
//     "review": "Refreshing powder known for its digestive benefits and soothing properties.",
//   },
//   {
//     "name": "Baheda Powder",
//     "image_link": baheda,
//     "price": "₹150",
//     "rating": "⭐4.3/5",
//     "review": "Traditional herb known for its digestive and respiratory health benefits.",
//   },
//   {
//     "name": "Bay Leaf Powder",
//     "image_link": bayleaf,
//     "price": "₹140",
//     "rating": "⭐4.1/5",
//     "review": "Aromatic powder used to enhance flavors in cooking; also known for its health properties.",
//   },
//   {
//     "name": "Dandelion Root Powder",
//     "image_link": dandelion,
//     "price": "₹250",
//     "rating": "⭐4.5/5",
//     "review": "Known for its detoxifying properties, beneficial for liver and digestive health.",
//   },
//   {
//     "name": "Neem Powder",
//     "image_link": neem,
//     "price": "₹160",
//     "rating": "⭐4.7/5",
//     "review": "Well-known in Ayurveda for its antibacterial properties and skin benefits.",
//   },
//   {
//     "name": "Organic Turmeric Powder",
//     "image_link": turmeric,
//     "price": "₹180",
//     "rating": "⭐4.8/5",
//     "review": "Known for its anti-inflammatory properties, turmeric powder is a staple in every kitchen.",
//   },
//   {
//     "name": "Saffron Powder",
//     "image_link": saffron,
//     "price": "₹400",
//     "rating": "⭐4.9/5",
//     "review": "High-quality saffron used for flavoring and anti-aging benefits; a luxurious culinary ingredient.",
//   },
//   {
//     "name": "Shankhapushpi Powder",
//     "image_link": shankhapushpi,
//     "price": "₹220",
//     "rating": "⭐4.5/5",
//     "review": "Herbal powder traditionally used to enhance memory and cognitive function.",
//   }
// ];

// const HomeProducts = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   const handleQuickView = (plant) => {
//     setSelectedPlant(plant);
//     setShowModal(true);
//   };

//   return (
//     <section className="home-products" id="products">
//       <h2 className="home-products-title">Explore <span>Our Herbal Products</span></h2>

//       <div className="product-scroll-container">
//         {plantData.map((plant, index) => (
//           <div className="product-card" key={index}>
//             <img src={plant.image_link} alt={plant.name} />
//             <h3>{plant.name}</h3>
//             <p className="price">{plant.price}</p>
//             <div className="btns">
//               <button className="cart-btn">Add to Cart</button>
//               <button className="quick-view-btn" onClick={() => handleQuickView(plant)}>View Product</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="explore-more-container">
//         <Link to="/product" className="explore-more-btn">More</Link>
//       </div>

//       {showModal && selectedPlant && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal-box" onClick={(e) => e.stopPropagation()}>
//             <img src={selectedPlant.image_link} alt={selectedPlant.name} />
//             <h3>{selectedPlant.name}</h3>
//             <p className="price">{selectedPlant.price}</p>
//             <p className="rating">Rating: ⭐ {selectedPlant.rating}</p>
//             <p className="review">"{selectedPlant.review}"</p>
//             <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default HomeProducts;
