import { useState, useEffect, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { CartContext } from "../../components/cart/cartContext";
import { toast } from "react-toastify";
import "./detail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setProduct(data); // Directly set the single product
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  const handleAddToCart = async (id) => {
    if(localStorage.getItem('token')){
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${localStorage.getItem('token')}`
          },
  
          body: JSON.stringify({productId : id,
            quantity:1
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to add product to cart");
        }
    
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        console.error("Add to cart failed:", error);
        toast.error("Failed to add product to cart.");
      }
    }
    else{
      navigate('/login')
    }
  };
  

  if (!product) {
    return <div>Loading or Product not found...</div>;
  }

  return (
    <div className="productDetail">
      <div className="productDetailHeader">
        <img className="productImage" src={product.image} alt={product.name} />
        <h1>{product.name}</h1>
      </div>
      <div className="productDetailInfo">
        <p className="productDescription">
          {product.description || "No description available."}
        </p>
        <p>
          <strong>Price:</strong> ₹{product.price.toFixed(2)}
        </p>
        <p>
          <strong>Category:</strong> {product.category || "N/A"}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating} / 5
        </p>
        <p>
          <strong>Weight:</strong> {product.weight || "N/A"}
        </p>
        <button className="addToCartButton" onClick={() => handleAddToCart(product._id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
