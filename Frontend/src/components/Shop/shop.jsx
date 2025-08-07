import React, { useState, useEffect, useContext } from "react";
import styles from "./shop.css"; // CSS styles
import { CartContext } from "../cart/cartContext";
import { Link,useNavigate} from "react-router-dom";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]); // Flat array of products
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate()

  // Filters
  const [priceRange, setPriceRange] = useState(500);
  const [selectedCategories, setSelectedCategories] = useState({
    vegetables: true,
    fruits: true,
    sweets: true,
  });
  const [addedProduct, setAddedProduct] = useState(null);
  const [addedItems, setAddedItems] = useState({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const data = await res.json();
        setAllProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const productWithId = { ...product, id: product.id || product.name };
    addToCart(productWithId);
    setAddedProduct(product.name);
    setTimeout(() => setAddedProduct(null), 2000);
    setAddedItems((prev) => ({ ...prev, [productWithId.id]: true }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

    console.log(category);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  // Filtered products
  const getFilteredProducts = (category) => {
    return allProducts
    .filter((p) => p.category?.toLowerCase() === category)
    .filter((p) => p.price <= priceRange);
      
  };

  const categories = ["vegetables", "fruits", "sweets"];

  return (
    <div className="shop-page">
      <h1 className="shop-title">Shop Our Fresh Products</h1>

      {/* Filters */}
      <div className="filters">
        <h4>Filter by Category</h4>
        {categories.map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              value={cat}
              checked={selectedCategories[cat]}
              onChange={handleCategoryChange}
            />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        ))}

        <h4>Filter by Price</h4>
        <label>
          Max Price: ₹{priceRange}
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange}
            onChange={handlePriceChange}
          />
        </label>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {categories.map(
          (cat) =>
            selectedCategories[cat] && (
              <div key={cat}>
                <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
                <div className="category-grid">
                  {getFilteredProducts(cat).length > 0 ? (
                    getFilteredProducts(cat).map((product, idx) => (
                      <div key={idx} className="product-card">
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-img"
                        />
                        </Link>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                          <p>
                            <strong>Price:</strong> ₹{product.price}
                          </p>
                          <p>
                            <strong>Weight:</strong> {product.weight}
                          </p>
                          <p className="rating">⭐ {product.rating}</p>
                          <button
                            className="add-to-cart"
                          onClick={()=>{
                            navigate(`/product/${product._id}`)
                          }}
                          >
                            View Product
                          </button>
                          {addedProduct === product.name && (
                            <span className={styles.addedMessage}>Added</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="loading-text">
                      No {cat} found within the price range.
                    </p>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Shop;
