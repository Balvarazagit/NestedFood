import { useContext, useState } from "react";
import { CartContext } from "../cart/cartContext";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import productData from "../../../data.json";
import styles from "./product.module.css";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [addedItems, setAddedItems] = useState({}); // Track added items
  const [addedProduct, setAddedProduct] = useState(null);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const productWithId = { ...product, id: product.id || product.name };
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

  // Consolidate the products from the categories (vegetables, fruits, sweets)
  const allProducts = [
    ...productData.vegetables,
    ...productData.fruits,
    ...productData.sweets,
  ];
console.log(allProducts)
  return (
    <div className={styles.productList}>
      {allProducts.slice(0,10).map((product) => (
        <div key={product.name} className={styles.productThumb}>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </Link>

          <div className={styles.info}>
            <h4 className={styles.title}>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
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
              {/* Button text and added message */}
              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  className={`${styles.addToCartBtn} ${
                    addedItems[product.name] ? styles.added : ""
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedItems[product.name] ? "Added" : "Add to Cart"}
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
  );
};

export default Products;
