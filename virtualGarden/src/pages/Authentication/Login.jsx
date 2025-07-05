import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer"; // Optional
import "./LoginSignUp.css";
import { AuthContext } from "./AuthContext";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
       login(data.userId); 

        setCredentials({ email: "", password: "" });
        navigate("/");
        window.location.reload();
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!credentials.email) {
      alert("Please enter your registered email first.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Something went wrong");

      alert(result.resetInfo); // Example: shows password or OTP (as per backend design)
    } catch (error) {
      console.error("Forgot password error:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <h2>
            <span className="dot" />🌿 Login
          </h2>
          <p className="subtitle">Welcome back to the Virtual Herbal Garden</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />

            {error && <div className="error-message">{error}</div>}

            <div className="flex-remember-forgot">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>

          <div className="switch-auth">
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
      <div className="footcont">
        <Footer />
      </div>
    </>
  );
};

export default Login;
