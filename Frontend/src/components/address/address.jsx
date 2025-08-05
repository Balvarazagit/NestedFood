import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./address.css"; // Ensure the correct path for CSS file

const Address = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");  // Added missing state for postalCode
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // After form submission, navigate to payment page
    navigate("/payment"); // Change the route for payment page
  };

  return (
    <div className="addressWrapper"> {/* Updated to match CSS class */}
      <h2>Enter Your Address</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          required
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          required
        />

        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter your postal code"
          required
        />

        <button type="submit">Submit and Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Address;
