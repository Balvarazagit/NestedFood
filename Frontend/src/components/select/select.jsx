import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import './select.css'; // Assuming you have custom styles

export const CountrySelect = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Surat", "Nagpur",
    "Indore", "Patna", "Vadodara", "Chandigarh", "Coimbatore", "Mysore"
  ];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="country-select-container">
      <div className="select-with-icon">
        <FaMapMarkerAlt className="map-icon" />
        <select
          className="country-select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option className="Country-option" value="">
            Your Location
          </option>
          <option className="Country-option" value="India">
            India
          </option>
          {cities.map((city, index) => (
            <option key={index} className="Country-option" value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
