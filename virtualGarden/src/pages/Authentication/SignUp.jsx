
import  { useState, useEffect, useContext } from "react";
import Footer from "../../components/Footer/Footer";
import "./LoginSignUp.css";
import { Link ,useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";
const SignUp = () => {
  const navigate = useNavigate(); // ✅ Create navigate function
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [users, setUsers] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const { signup } = useContext(AuthContext); // ✅ Use the signup function from AuthContext
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || {};
    setUsers(savedUsers);
  }, []);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message || "Signup failed!");
      signup(result.userId);
      alert("Signup successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
          // ✅ Redirect to Home
          navigate("/");
          window.location.reload();
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message);
    }
  };
  

  const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      alert("Please enter your registered email.");
      return;
    }

    const user = users[formData.email];
    if (!user) {
      alert("No user found with this email.");
      return;
    }

    const code = generateResetCode();
    setResetCode(code);
    alert(`Your password reset code is: ${code}`);
  };

  const handleResetPassword = () => {
    const inputCode = prompt("Enter the reset code sent to your email:");
    if (inputCode !== resetCode) {
      alert("Invalid reset code.");
      return;
    }

    const newPass = prompt("Enter your new password:");
    if (!newPass || newPass.trim().length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }

    const updatedUsers = {
      ...users,
      [formData.email]: {
        ...users[formData.email],
        password: newPass,
      },
    };

    setUsers(updatedUsers);
    setResetCode("");
    alert("Password reset successfully!");
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card" style={{ marginTop: "30px" }}>
          <h2>
            <span className="dot" />🌿 Register
          </h2>
          <p className="subtitle">
            Signup now and get full access to our herbal app.
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="input-row">
              <input
                type="text"
                name="firstName"
                placeholder="Firstname"
                onChange={handleChange}
                value={formData.firstName}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Lastname"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />

            {error && <div className="error-message">{error}</div>}

            <div className="flex-remember-forgot">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>

          <div className="switch-auth">
            Already have an account?  <Link to="/login">Login</Link> 
          </div>
        </div>
      </div>
      <div className="footcont">
        <Footer />
      </div>
    </>
  );
};

export default SignUp;
