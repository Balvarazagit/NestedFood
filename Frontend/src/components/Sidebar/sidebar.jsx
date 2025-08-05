import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import "./sidebar.css";

const Sidebar = ({ setPriceRange, setSelectedCategories, categories }) => {
  const [selectedCategoryState, setSelectedCategoryState] = useState({});
  const [priceRangeState, setPriceRangeState] = useState([0, 400]); // Default price range

  // Default categories if no categories are passed
  const defaultCategories = [
    "MEN'S CLOTHING",
    "JEWELERY",
    "ELECTRONICS",
    "WOMEN'S CLOTHING",
  ];

  // Use the categories prop if available, otherwise use default categories
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRangeState(newValue);
    setPriceRange(newValue);
  };

  // Handle category checkbox change
  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategoryState({ ...selectedCategoryState, [id]: checked });
  };

  // Automatically apply filters based on selected categories
  useEffect(() => {
    const selectedCategories = Object.keys(selectedCategoryState).filter(
      (key) => selectedCategoryState[key]
    );
    setSelectedCategories(selectedCategories);
  }, [selectedCategoryState, setSelectedCategories]);

  return (
    <div className="sidebar w-100">
      <div className="filter-category shadow">
        <div className="card border-0 mb-0 p-4">
          <h3 className="mb-4">Filter by price</h3>
          <div className="mb-4">
            <Slider
              onChange={handlePriceChange}
              value={priceRangeState}
              valueLabelDisplay="auto"
              min={0}
              max={400}
              step={10}
              sx={{ color: "#3bb77e" }}
            />
            <div className="d-flex justify-content-between">
              <span>
                From:{" "}
                <strong style={{ color: "#3bb77e" }}>₹{priceRangeState[0]}</strong>
              </span>
              <span>
                To:{" "}
                <strong style={{ color: "#3bb77e" }}>₹{priceRangeState[1]}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        {/* <div className="card border-0 mb-5">
          <h3>Category</h3>
          <div className="catList">
            {displayCategories.map((category) => (
              <div key={category} className="catItem d-flex align-items-center">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategoryState[category] || false}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={category} className="ml-2">
                  {category.replace("-", " ").toUpperCase()}
                </label>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setPriceRange: PropTypes.func.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  categories: PropTypes.array, // categories is now optional
};

Sidebar.defaultProps = {
  categories: [], // Default empty array if no categories prop is provided
};

export default Sidebar;
