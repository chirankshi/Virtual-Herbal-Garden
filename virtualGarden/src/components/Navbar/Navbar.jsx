import React, { useState, useEffect,useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi"; // Hamburger icon
import "./Navbar.css";
import { AuthContext } from "../../pages/Authentication/AuthContext";
import User from "../../assets/images/user.png"; // Default user image
const Navbar = ({ setSelectedPlant, setShowDetail }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Track mobile menu visibility
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [plants, setPlants] = useState([]);
  const profileRef = useRef(null);
// const { userId, logout } = useContext(AuthContext);
const { userId, logout, profileImage, userName } = useContext(AuthContext);

  const handlePlantClick = (plantData) => {
    // Format the clicked plant data (plantData is already structured correctly)
    const formattedPlant = {
      title: plantData.commonName || "Unknown Plant",
      commonName: plantData.commonName || "Unknown",
      sanskritName: plantData.sanskritName || "Sanskrit Name",
      botanicalName: plantData.botanicalName || "Botanical Name",
      image: plantData.image_link || "https://via.placeholder.com/150",
      description: plantData.sanskritName || "No Sanskrit Name available",
      modelUrl: plantData.modelname || "/models/DefaultModel.glb",  // Use the model name from plantData or a default
      size: plantData.plantSize || "Medium",
      nativeRegion: plantData.nativeRegion || "India",
      preferredClimate: plantData.preferredClimate || "Tropical",
      requiredSunlight: plantData.requiredSunlight || "Full Sun",
      requiredSoil: plantData.requiredSoil || "Loamy",
      partsUsed: plantData.partsUsedInMedicine || ["Leaves"],
      activeCompounds: plantData.activeCompounds || ["Flavonoids"],
      therapeuticProperties: plantData.therapeuticProperties || ["Anti-inflammatory", "Digestive"],
      dosageForms: plantData.dosageForm || ["Powder", "Capsule"],
      ayushApplications: plantData.ayushApplications || ["Used in Ayurvedic medicine for respiratory health.", "Helps in reducing stress."],
      healthBenefits: plantData.healthBenefits || ["Boosts immunity", "Reduces stress", "Supports respiratory health"]
    };
  
    console.log("Formatted Plant Data:", formattedPlant);
    setSelectedPlant(formattedPlant);  // Update the state with the formatted plant data
    setShowDetail(true); // Show the PlantDetail modal or page
  };
  
  
  
  const normalizeString = (str) => {
    return str && typeof str === "string" ? str.replace(/\s+/g, "").toLowerCase() : "";
  };

  const matchedProducts = products
    ?.filter((item) => normalizeString(item.name).includes(normalizeString(searchTerm)))
    .slice(0, 3);

  const matchedPlants = plants
    ?.filter((item) =>
      normalizeString(item.plant?.commonName).includes(normalizeString(searchTerm))
    )
    .slice(0, 2);

  const hasResults = normalizeString(searchTerm).length > 0 &&
    (matchedProducts.length > 0 || matchedPlants.length > 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, plantRes] = await Promise.all([
          fetch("http://localhost:8802/alldata/product"),
          fetch("http://localhost:8802/alldata/plants"),
        ]);

        const rawProduct = await productRes.clone().text();
        const rawPlant = await plantRes.clone().text();

        const productData = JSON.parse(rawProduct);
        const plantData = JSON.parse(rawPlant);

        const fetchedProducts = Array.isArray(productData.data)
        ? productData.data
        : productData.products || [];
        const fetchedPlants = Array.isArray(plantData.data) ? plantData.data : [];
        console.log("Fetched Products:", fetchedProducts);
        
        setProducts(fetchedProducts);
        setPlants(fetchedPlants);
      } catch (err) {
        console.error("❌ Error fetching or parsing data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle scroll UI effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  const handleClick = (product) => {
    // setSelectedProduct(product);
    navigate(`/product/${product._id}`, {
      state: { product }, // Pass full product object
    });
  };

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
    setActiveModal(null);
  };

  
  const openModal = (option) => {
    setActiveModal(option);
    setShowProfileMenu(false);
  };

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <>
      <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        {/* Top center title */}
        <Link to="/">
          <div className={`navbar-title ${scrolled ? "scrolled" : ""}`}>𝔾𝕣𝕖𝕖𝕟𝔹𝕝𝕠𝕠𝕞</div>
        </Link>


        {/* Bottom area: center nav links + right icons */}
        <div className="navbar-bottom">
          <nav className={`navbar-links ${scrolled ? "scrolled" : ""}`}>
            <Link to="/products">Our Herbal Products</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/explore-plants">Explore Plants</Link>
            <Link to="/explore-Tour">Tour</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/remedies">Home Remedies</Link>
            <Link to="/quiz">Play Quiz</Link>
            <Link to="/blogs">Blogs</Link>
          </nav>
          <div className="navbar-bottom">
          <FiAlignJustify className={`icon-hamburger ${scrolled ? "scrolled" : ""}`} onClick={toggleMobileMenu}/>
          {/* Right-aligned icons */}
          <div className="navbar-icons">
            {showSearch && (
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search herbal products or plants..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            )}

            <span onClick={toggleSearch}>
              {showSearch ? (
                <IoClose className={`icon ${scrolled ? "scrolled" : ""}`} />
              ) : (
                <IoSearch className={`icon ${scrolled ? "scrolled" : ""}`} />
              )}
            </span>

            <Link to="/cart">
              <FiShoppingCart className={`icon ${scrolled ? "scrolled" : ""}`} />
            </Link>

             {/* Profile Icon or Image */}
            <div className="profile-icon" ref={profileRef}>
              <a onClick={handleProfileClick}>
                {userId && profileImage ? (
            <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: profileImage.backgroundColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {profileImage.text}
          </div>
                ) : (
                  <div className="user-icon">
                  <img
                    src={User}
                    alt="Profile"
                    className={`image-icon`}
                    />
                    </div>
                )}
              </a>
            {showProfileMenu && (
  <div className="profile-menu">
    {userId ? (
  <>
    {/* <div onClick={() => openModal("orders")}>My Orders</div> */}
     <Link to="/myorder">My Orders</Link>
    <div onClick={() => openModal("createAnother")}>Create Another Account</div>
    <div onClick={() => openModal("settings")}>Settings</div>
    <div onClick={() => openModal("help")}>Help</div>
    <div onClick={() => openModal("wallet")}>My Wallet</div>
    <div onClick={logout}>Sign Out</div>
  </>
) : (
  <>
    <Link to="/signup">Create Account</Link>
    <Link to="/login">Login</Link>
    <div onClick={() => openModal("help")}>Help</div>
  </>
)}

  </div>
)}

            </div>

          </div>
        </div>
        </div>
      </header>

      
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-icon" onClick={closeModal}>×</button>
            <p>
              {/* {activeModal === "orders" && "You have no orders yet. Start exploring our herbal products!"} */}
              {activeModal === "createAnother" && "You can register another account using a different email."}
              {activeModal === "settings" && "Change your preferences, password, and profile settings here."}
              {activeModal === "help" && "Contact our support team or browse FAQs for assistance."}
              {activeModal === "wallet" && "Your wallet balance is ₹0. Add funds or apply coupons here."}
            </p>
            <p>Content for {activeModal} goes here.</p>
          </div>
        </div>
      )}

      {/* Display search results */}
      {showSearch && hasResults && (
        <div className="search-results">
          <ul>
            {matchedProducts.map((product, index) => (
            
            <li key={index} onClick={() => handleClick(product)}>{product.name}</li>
            ))}
          </ul>
          <ul>
            {matchedPlants.length > 0 && (
              <div>
                <ul>
                  {matchedPlants.map((item, index) => {
                    const plantData = item.plant; // Accessing the plant data
                    return (
                      <li key={index} onClick={() => handlePlantClick(plantData)}>
                      {plantData.commonName}
                    </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}

      {/* If no results */}
      {showSearch && searchTerm && !hasResults && (
        <div className="search-results">No results found for "{searchTerm}"</div>
      )}

      {/* Mobile Menu - Display Categories */}
      {showMobileMenu && (
  <div className="mobile-menu-overlay">
    <div className="mobile-menu-items">
      <Link to="/products" onClick={toggleMobileMenu}>Our Herbal Products</Link>
      <Link to="/aboutus" onClick={toggleMobileMenu}>About Us</Link>
      <Link to="/explore-plants" onClick={toggleMobileMenu}>Explore Plants</Link>
      <Link to="/explore-Tour" onClick={toggleMobileMenu}>Tour</Link>
      <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
      <Link to="/remedies" onClick={toggleMobileMenu}>Home Remedies</Link>
      <Link to="/quiz" onClick={toggleMobileMenu}>Play Quiz</Link>
      <Link to="/blog" onClick={toggleMobileMenu}>Blogs</Link>
      <span onClick={toggleMobileMenu} className="close-menu">
        Close
      </span>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;