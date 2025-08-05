import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/images/logo.svg";
import CartIcon from "../../assets/images/icon-cart.svg";
import AccountIcon from "../../assets/images/user.svg";
import "./header.css";
import { Button } from "react-bootstrap";
import {
  LogoutOutlined,
  PersonOutlineOutlined,
  PinDropOutlined,
  TuneOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";



const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    setMenuOpen(false); // Close menu on link click
    navigate(path);
  };

  const handleOrderPage = () => navigate("/order-tracking");
  const handleDashboard = () => navigate("/dashboard");
  const handleSign = () => {
    localStorage.removeItem('token')
navigate('/login')  }

  return (
    <header className="header-area">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <a href="/home">
              <img src={Logo} alt="Logo" />
            </a>
          </div>

          {/* Hamburger Menu Icon (visible on mobile) */}
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>

          {/* Navigation Links */}
          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <a onClick={() => handleNavigation("/home ")}>Home</a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/about")}>About</a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/shop")}>Shop</a>
              </li>
              <li>
                <a onClick={() => handleNavigation("/contact")}>Contact</a>
              </li>
            </ul>
          </nav>

          {/* Cart and Account Icons (Visible on both Desktop and Mobile) */}
          <div className="icons">
            <img
              src={CartIcon}
              alt="Cart"
              className="icon cart-icon"
              onClick={() => handleNavigation("/cart")}
            />
           <div className="dropdown">
                  <button className="btn dropdown-toggle account-btn" type="button" data-bs-toggle="dropdown">
                    <img src={AccountIcon} alt="Account" className="h-img" />
                  </button>
                  <ul className="dropdown-menu account-dropdown">
                    <li><Button onClick={handleDashboard}><PersonOutlineOutlined /> My Account</Button></li>
                    <li><Button onClick={handleOrderPage}><PinDropOutlined /> Order Track</Button></li>
                    <li><Button onClick={() => navigate("/myorders")}><FavoriteBorderOutlined /> My Orders</Button></li>
                    <li><Button  onClick={() => navigate("/not-found")}><TuneOutlined /> Settings</Button></li>
                    <li><Button onClick={handleSign}><LogoutOutlined /> Logout</Button></li>
                  </ul>
                </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
