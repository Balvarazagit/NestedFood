import React from "react";
import secure from "../../assets/images/secure.jpg";
import delivery from "../../assets/images/delivery.jpg";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Nest Mart & Grocery Website</h1>
        <p className="about-description">
          Welcome to Nest Mart, your one-stop destination for online grocery shopping! 
          Our platform is designed to offer a seamless shopping experience, allowing customers 
          to browse a wide range of fresh products, including vegetables, fruits, and sweets. 
          Whether you're looking for everyday essentials or specialty items, Nest Mart ensures 
          that your groceries are just a click away.
        </p>

        <div className="feature">
          <img
            className="aboutimg"
            src={delivery}
            alt="Fast Delivery"
          />
          <div className="feature-content">
            <h2 className="feature-title">Fast Delivery</h2>
            <p className="feature-description">
              We prioritize timely delivery to make sure your groceries arrive fresh 
              and on time, every time.
            </p>
          </div>
        </div>

        <div className="feature">
          <img
            className="aboutimg"
            src={secure}
            alt="Secure Payment"
          />
          <div className="feature-content">
            <h2 className="feature-title">Secure Payments</h2>
            <p className="feature-description">
              Shop with confidence using our secure payment gateways, ensuring your 
              transactions are safe and protected.
            </p>
          </div>
        </div>

        <div className="why-shop">
          <h3 className="why-shop-title">Why Shop with Us?</h3>
          <ul className="why-shop-list">
            <li>• Wide range of fresh groceries at competitive prices</li>
            <li>• Convenient product filtering and sorting options</li>
            <li>• Fast and reliable delivery service</li>
            <li>• Secure payment options for a safe shopping experience</li>
            <li>• User-friendly platform optimized for mobile and desktop</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
