import React, { useState , useEffect} from "react";
import "./CartContainer.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure this is included

const EnhancedCartContainer = ({
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
}) => {
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const discountRate = appliedCoupon === "PLANT10" ? 0.2 : 0;
  const [showAddressModal, setShowAddressModal] = useState(false);
   const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // or whatever key you store it under



  const [addressData, setAddressData] = useState(() => {
    const stored = localStorage.getItem("userAddress");
    return stored ? JSON.parse(stored) : null;
  });
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
    return total + price * item.quantity;
  }, 0);
  const discount = subtotal * discountRate;
  const gst = (subtotal) * 0.05;
  const tax = (subtotal) * 0.1;
  const grandTotal = subtotal - discount + gst + tax;

  const [formData, setFormData] = useState({
    name: addressData?.name || "",
    mobile: addressData?.mobile || "",
    street: addressData?.street || "",
    landmark: addressData?.landmark || "",
    city: addressData?.city || "",
    state: addressData?.state || "",
    zip: addressData?.zip || ""
  });

  useEffect(() => {
    if (addressData) {
      setFormData(addressData); // Pre-fill the form when the modal is opened
    }
  }, [addressData]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    localStorage.setItem("userAddress", JSON.stringify(formData));
    setAddressData(formData);
    setShowAddressModal(false);
  };



  const handleOrder = async () => {
  if (!userId) {
    toast.error("User not logged in!");
    return;
  }
  if (!addressData) {
    toast.error("Please add your address first.");
    return;
  }
  if (cartItems.length === 0) {
    toast.error("Cart is empty.");
    return;
  }

  // Prepare products array for API
  const productsForOrder = cartItems.map(item => ({
    productId: item._id, // Assuming item.id is the productId in backend
    quantity: item.quantity,
  }));

  const orderPayload = {
    userId,
    products: productsForOrder,
    totalPrice: grandTotal.toFixed(2),
    address: `${addressData.name}, ${addressData.mobile}, ${addressData.landmark}, ${addressData.street}, ${addressData.city}, ${addressData.state} - ${addressData.zip}`,
    paymentMethod: "cash"  // or you can make this dynamic based on payment option selected
  };

  try {
    const response = await axios.post('http://localhost:8802/orders', orderPayload);  // Adjust API base URL if needed
    if (response.status === 201) {
      toast.success("Order placed successfully!");
      // Optionally clear cart or redirect user here
      localStorage.removeItem('cartItems');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Failed to place order. Please try again.");
    }
  } catch (error) {
    toast.error(`Order error: ${error.response?.data?.error || error.message}`);
  } finally {
    setShowPaymentModal(false);
  }

};



  return (
    <div className="cart-page-container">
      <div className="top-header"></div>
      <div className="cart-page-container">
        <h1 className="cart-page-container-text">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">No items in your cart.</p>
        ) : (
          <>
            <div className="cart-grid">
              <div className="cart-left">
                {cartItems.map((item) => (
                  <div className="cart-item-card" key={item.id}>
                    <img src={item.image_link || item.image} alt={item.name} />

                    <div className="item-main-content">
                      <div className="item-info-section">
                        <h4>{item.title || item.name}</h4>
                        {/* <p className="sanskrit-name">{item.sanskritName || "संस्कृत नाम उपलब्ध नहीं"}</p> */}
                        <div className="item-price-section">
                          <div className="quantity-controls">
                            <div className="quantity-icon" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                              <FaMinus className="icons-quantity" />
                            </div>
                            <input
                              type="number"
                              className="quantity-input"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value) || 1)}
                            />
                            <div className="quantity-icon" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                              <FaPlus className="icons-quantity" />
                            </div>
                          </div>
                        </div>
                        <div className="item-price">₹{(item.price)}</div>
                      </div>

                      <FaTrash className="remove-icon" onClick={() => removeFromCart(item.id)} />
                    </div>
                  </div>

                ))}
              </div>

              <div className="cart-right">
                <div className="coupon-section">
                  <h4>Apply Coupon</h4>
                  <input
                    type="text"
                    value={coupon}
                    placeholder="Enter coupon code"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <div className="coupon-apply-wrapper">
                    <button className="apply-coupon-btn" onClick={() => setAppliedCoupon(coupon)}>
                      Apply Coupon
                    </button>
                  </div>
                  {appliedCoupon && discountRate > 0 && (
                    <p className="coupon-valid">Coupon applied: {appliedCoupon} (20% off)</p>
                  )}
                  {appliedCoupon && discountRate === 0 && (
                    <p className="coupon-invalid">Invalid coupon code</p>
                  )}
                </div>

                <div className="address-section">
                  <h4>Address</h4>
                  {addressData ? (
                    <p>
                      <p><strong>{addressData.name}</strong></p>
                      <p>{addressData.mobile}</p>
                      <p> {addressData.landmark},{addressData.street}, {addressData.city}, {addressData.state} - {addressData.zip}</p>

                      <button onClick={() => setShowAddressModal(true)} className="apply-coupon-btn">Edit Address</button>
                    </p>
                  ) : (
                    <>
                      <p className="empty-cart">No address added</p>

                      <button onClick={() => setShowAddressModal(true)} className="apply-coupon-btn">Add Address</button>
                    </>
                  )}
                </div>

                <div className="summary-section">
  <h3 className="summary-title">Order Summary</h3>

  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{subtotal.toFixed(0)}</span>
  </div>

  <div className="summary-row">
    <span>Discount</span>
    <span>- ₹{discount.toFixed(0)}</span>
  </div>

  <div className="summary-row">
    <span>GST (5%)</span>
    <span>+ ₹{gst.toFixed(0)}</span>
  </div>

  <div className="summary-row">
    <span>Tax (10%)</span>
    <span>+ ₹{tax.toFixed(0)}</span>
  </div>

  <hr className="summary-divider" />

  <div className="summary-row total-row">
    <strong>Total</strong>
    <strong>₹{grandTotal.toFixed(0)}</strong>
  </div>
</div>
{/* 
                <button className="pay-now-btn" disabled={!addressData} onClick={() => setShowPaymentModal(true)}>
                  Proceed to Pay
                </button> */}

 {userId ? (
        <button
          className="pay-now-btn"
          disabled={!addressData}
          onClick={() => setShowPaymentModal(true)}
        >
          Proceed to Pay
        </button>
      ) : (
        <button
          className="pay-now-btn"
          onClick={() => navigate("/login")}
        >
          Login to Continue
        </button>
      )}


              </div>
            </div>
          </>
        )}
      </div>
      {showAddressModal && (
        <div className="modal-overlay">
         
          <form className="form" onSubmit={handleSave}>
          <div className="modal-header">
            <FaTimes className="close-icon" onClick={() => setShowAddressModal(false)} />
          </div>
            <p className="title">Address</p>
            <p className="message">Please fill in your shipping information.</p>

            <div className="flex">
              <label>
                <input
                  required
                  type="text"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <span>Full Name</span>
              </label>

              <label>
                <input
                  required
                  type="number"
                  name="mobile"
                  className="input"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <span>Mobile Number</span>
              </label>
            </div>

            <label>
              <input
                required
                type="text"
                name="street"
                className="input"
                value={formData.street}
                onChange={handleChange}
              />
              <span>Street Address</span>
            </label>

            <label>
              <input
                required
                type="text"
                name="landmark"
                className="input"
                value={formData.landmark}
                onChange={handleChange}
              />
              <span>Landmark</span>
            </label>

            <label>
              <input
                required
                type="text"
                name="city"
                className="input"
                value={formData.city}
                onChange={handleChange}
              />
              <span>City</span>
            </label>


            <div className="flex">
              <label>
                <select
                  required
                  name="state"
                  className="input"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
                <span>State</span>
              </label>

              <label>
                <input
                  required
                  type="text"
                  name="zip"
                  className="input"
                  value={formData.zip}
                  onChange={handleChange}
                />
                <span>ZIP Code</span>
              </label>
            </div>

            <button type="submit" className="submit">Update Address</button>
          </form>
        </div>
      )}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="form-payment">
            <div className="modal-header-payments">
              <p className="title-payment">Select Payment Method</p>
              <FaTimes className="close-icon-payments" onClick={() => setShowPaymentModal(false)} />
            </div>

            <div className="payment-options">
              <button className="submit" onClick={() => handleOrder()}>
                Cash on Delivery
              </button>
              <button className="submit" onClick={() => handleOrder()}>
                UPI / Cards / Net Banking
              </button>
            </div>
          </div>
        </div>
      )}
 <ToastContainer />
    </div>

  );
};

export default EnhancedCartContainer;
