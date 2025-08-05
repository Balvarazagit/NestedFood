import { useState, useEffect } from "react";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { CircularProgress } from "@mui/material";
import './Listing.css'
import Sidebar from "../Sidebar/sidebar.jsx";
import Products from "../product/product.jsx";
import axios from "axios";

const Listing = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const allProducts = response.data;

      const uniqueCategories = [...new Set(allProducts.map((product) => product.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch {
      setError("Error fetching categories. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="listingPage">
      <div className="container-fluid">
        <div className="breadcrumb flex-column">
          <h1>Listing</h1>
          <ul className="list list-inline mb-0">
            <li className="list-inline-item">
              <a href="/" className="text-green">
                <HomeOutlinedIcon />
                Home <NavigateNextOutlinedIcon />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">Listing </a>
            </li>
          </ul>
        </div>

        <div className="listingData">
        <div className="row">

        <div className="col-6 my-5 mx-3">
              <Sidebar
                setPriceRange={setPriceRange}
                setSelectedCategories={setSelectedCategories}
                categories={categories}
              />
            </div>
            </div>
          <div className="row">

            <div className="col-12 right-content homeProducts container-fluid">
              <div className="productFilterTitle">
                <h4>All Products</h4>
              </div>

              {loading && <CircularProgress />} {/* Display loading spinner */}
              {error && <p>{error}</p>}

              {/* Display filtered products */}
              {!loading && (
                <Products priceRange={priceRange} selectedCategories={selectedCategories} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;
