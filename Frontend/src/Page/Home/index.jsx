import { useState, useEffect, useContext } from "react";
import {CartContext} from '../../components/cart/cartContext.jsx'
import { Link , useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Slider from ".//slider/slider.jsx";
import CategorizeSlider from "../../components/CategorizeSlider/catSlider.jsx";
import Banners from "../../components/banner/banner.jsx";
import styles from "../../components/product/product.module.css"

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("Vegetables"); // State to track the selected category
  const [products, setProducts] = useState([]); // State to store fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [addedItems, setAddedItems] = useState({}); // Track added items
  const [addedProduct, setAddedProduct] = useState(null);
  const navigate = useNavigate()

  // Fetch products based on selected category
  const fetchProducts = async () => {
    try {
      const url =
        selectedCategory === "All"
          ? "http://localhost:5000/api/products"
          : `http://localhost:5000/api/products?category=${selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data); // Store fetched products

      // Filter products by category
      setFilteredProducts(data.slice(0, 10)); // Show first 10 products for the selected category
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products initially or when category changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const productWithId = { ...product, id: product._id || product.name };
    addToCart(productWithId);
    setAddedProduct(product.name);
    setTimeout(() => setAddedProduct(null), 2000);

    // Update state to show "Added" message only for this product
    setAddedItems((prev) => ({
      ...prev,
      [productWithId.id]: true,
    }));

    // Remove "Added" message after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [productWithId.id]: false,
      }));
    }, 2000);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Update the category when clicked
  };

  return (
    <>
      <Slider />
      <CategorizeSlider />
      <Banners />

      <section className="homeProductsSection">
        <div className="container-fluid">
        <div className={`homeProducts d-flex align-items-center justify-content-between mb-4 ${styles.homeProductsWrapper}`}>
  <h3 className="text-edge hd mb-0">Popular Products</h3>

  <ul className={`d-flex ${styles.homeProductsLink}`}>
    {["Fruits", "Vegetables", "Sweets"].map((category) => (
      <li key={category}>
        <button
          className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ""}`}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </button>
      </li>
    ))}
  </ul>
</div>


          <div className="productContainer">
            <div className="product-1">
              {/* Render the filtered products */}
              <div className={styles.productList}>
                {filteredProducts.map((product) => (
                  <div key={product._id} className={styles.productThumb}>
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                      />
                    </Link>

                    <div className={styles.info}>
                      <h4 className={styles.title}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </h4>
                      <h5 className={styles.description}>{product.description}</h5>
                      <Rating
                        name="read-only"
                        value={product.rating}
                        precision={0.5}
                        readOnly
                      />
                      <div className={styles.foot}>
                        <span className={styles.price}>₹{product.price.toFixed(2)}</span>
                        <h6 className={styles.weight}>{product.weight}</h6>
                        <div className={styles.buttonWrapper}>
                          <Button
                            variant="contained"
                            className={`${styles.addToCartBtn} ${
                              addedItems[product._id] ? styles.added : ""
                            }`}
                            onClick={()=>{
                            navigate(`/product/${product._id}`)
                          }}
                          >
                           View Product
                          </Button>

                          {addedProduct === product.name && (
                            <span className={styles.addedMessage}>Added</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
