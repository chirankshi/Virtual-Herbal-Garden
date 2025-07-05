import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MyOrder.css"; // Import external CSS

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      toast.error("User not logged in!");
      setError("User not logged in");
      setLoading(false);
      return;
    }
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const ordersRes = await axios.get(`http://localhost:8802/orders/user/${userId}`);
        const ordersData = ordersRes.data.data || ordersRes.data;

        if (!ordersData || ordersData.length === 0) {
          toast.info("No orders found for this user.");
          setOrders([]);
          setLoading(false);
          return;
        }

        const productsRes = await axios.get("http://localhost:8802/alldata/product");
        const productsData = productsRes.data.data || productsRes.data;

        const map = {};
        productsData.forEach((product) => {
          map[product._id] = product;
        });

        setProductMap(map);
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders or products.");
        setError("Failed to fetch orders or products.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading user orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!orders.length) return <div className="order_main_cont"><div className="top-header"></div><div className="order_main_cont"><h1>No orders found.</h1></div></div>;

  const firstOrderAddress = orders[0]?.address;

  return (
    <>
      <div className="order_main_cont">
        <div className="top-header"></div>
        <div className="order_main_cont">
          <h1>Your Orders</h1>

          {firstOrderAddress && (
            <div className="address-box">
              <p>
                <strong>Shipping Address:</strong>{" "}
                {typeof firstOrderAddress === "string"
                  ? firstOrderAddress
                  : JSON.stringify(firstOrderAddress)}
              </p>
            </div>
          )}

          {orders.map((order, idx) => (
            <div key={order._id} className="order-card">
              <h2>Order #{idx + 1}</h2>
              <p>
                <strong>Total Price:</strong> ₹{order.totalPrice}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
              <div className="order-products-list">
                {order.products.length === 0 && <p>No products in this order.</p>}
                {order.products.map((item, i) => {
                  const productId = item.productId?.$oid || item.productId;
                  const product = productMap[productId];

                  if (!product) {
                    return (
                      <p key={i} style={{ color: "red" }}>
                        Product not found
                      </p>
                    );
                  }

                  return (
                    <div key={i} className="order-product-item">
                      <img
                        src={product.image_link || product.image || "https://via.placeholder.com/80"}
                        alt={product.name}
                        width="80"
                        height="80"
                      />
                      <div className="product-info">
                        <p><strong>{product.name}</strong></p>
                        <p>Price: ₹{product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Rating: {product.rating || "N/A"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyOrder;
