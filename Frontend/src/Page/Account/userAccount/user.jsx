import { useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockIcon from "@mui/icons-material/Lock"; // Icon for password
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icon for logout
import LoginIcon from "@mui/icons-material/Login"; // Icon for login
import { useNavigate } from "react-router-dom"; // For redirecting after logout
import "./user.css"; // CSS file for styling

const UserAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({}); // User data store

  useEffect(() => {
    // LocalStorage se data fetch karo
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const mobile = localStorage.getItem("mobile");
    const password = localStorage.getItem("password");

    // State mein data set karo
    setUser({ username, email, mobile, password });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("mobile");
    localStorage.removeItem("password");

    // Bas user state ko reset karo, localStorage ka data untouched rahega
    setUser({});

    // Alert to show logout is successful
    alert("Account Logged Out");

    // Redirect to homepage or login page
    navigate("/");
  };

  const handleLogin = () => {
    // Redirect to the login page (you can customize the login route)
    navigate("/login");
  };

  return (
    <center>
    <div className="user-account-page d-flex justify-content-center align-items-center">
      <div className="user-account-card shadow">
        <div className="profile-section text-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/662/702/non_2x/vector-man-face-cartoon.jpg" // Placeholder image
            alt="User Profile"
            className="profile-picture"
          />
          <h2 className="username">{user.username || "Guest"}</h2>
        </div>
        {user.username && user.email && user.mobile && user.password ? (
          <div className="details-section">
            <p>
              <EmailIcon className="icon" /> <strong>Email:</strong> {user.email}
            </p>
            <p>
              <PhoneAndroidIcon className="icon" /> <strong>Mobile:</strong> {user.mobile}
            </p>
            <p>
              <LockIcon className="icon" /> <strong>Password:</strong> {user.password}
            </p>
          </div>
        ) : (
          <p className="error-message">
           Pehle register ya login kar!
          </p>
        )}

        {/* Conditionally render buttons */}
        {user.username ? (
          <button className="logout-button" onClick={handleLogout}>
            <ExitToAppIcon className="icon" /> Log Out
          </button>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            <LoginIcon className="icon" /> Log In
          </button>
        )}
      </div>
    </div>
    </center>
    
  );
};

export default UserAccount;
