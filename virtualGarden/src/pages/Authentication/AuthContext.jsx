import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate(); 
  const signup = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
    fetchUserProfile(id);
  }
  const login = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);
    fetchUserProfile(id); // Fetch profile data when user logs in
  };

    
  const logout = () => {
    setUserId(null);
    setProfileImage(null);
    setUserName(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userName"); // optional
    navigate("/"); // ✅ Redirect to home
  };


  // Function to generate avatar
  const generateAvatar = (firstName) => {
    if (!firstName) return;

    // Take the first letter of the first name
    const firstLetter = firstName.charAt(0).toUpperCase();

    // Generate a random color for the background
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return {
      text: firstLetter,
      backgroundColor: randomColor,
    };
  };
  
 // Fetch the user profile image and name
  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/user/${userId}`);
      const data = await res.json();
      // console.log("username:- ", data)
      if (res.ok) {
        // Generate and set the avatar if no profileImage is provided
        const avatar = generateAvatar(data.firstName);
        setProfileImage(avatar); // Set the dynamically generated avatar
        setUserName(`⁠ ${data.firstName} ${data.lastName}`);
        localStorage.setItem("userName",` ${data.firstName} ${data.lastName}` )
      } else {
        console.error(data.message); // Handle errors
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      login(storedUserId); // Automatically log in if userId is found in localStorage
    }
  },[]);


 

  return (
    <AuthContext.Provider value={{ userId, profileImage, userName, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
