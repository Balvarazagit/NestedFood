import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import "./cart.css";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const stripePromise = loadStripe("pk_test_51RJBIBE6dFEmdQgLVWyoMWdnPyXYi67gw9xZtSKHauPB3zAk72glw3sqkfS2JGz6wmCFDXuTllLGG4UOh03H0rTM00TrrfnpMG");

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const res = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems: cart,
          address,
        }),
      });

      const data = await res.json();
      if (data.url) {
        localStorage.setItem("pendingAddress", address);
        window.location.href = data.url;
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const updateCart = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}/${action}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Update failed");
      const updatedData = await res.json();
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product._id === id
            ? { ...item, quantity: updatedData.cart.find((i) => i.product._id === id).quantity }
            : item
        )
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (!res.ok) throw new Error("Delete failed");
      const updatedData = await res.json();
      setCart(updatedData.items || []);
      fetchCart();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  if (loading) return <div>Loading your cart...</div>;

  return (
    <div className="cartPage">
      <h2>Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul className="cartList">
            {cart.map((item) => (
              <li key={item.product._id} className="cartItem">
                <img src={item.product.image} alt={item.product.name} className="productImage" />
                <div className="productDetails">
                  <h4>{item.product.name}</h4>
                  <p>₹{item.product.price.toFixed(2)}</p>
                  <div className="quantityControl">
                    <IconButton
                      color="primary"
                      onClick={() => updateCart(item.product._id, "decrease")}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton color="primary" onClick={() => updateCart(item.product._id, "increase")}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </div>
                  <IconButton color="error" onClick={() => removeItem(item.product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>

          <TextField
            label="Shipping Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="cartTotal">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          </div>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </>
      ) : (
        <p className="emptyCart">Your cart is empty. Start shopping now!</p>
      )}
    </div>
  );
};

export default Cart;