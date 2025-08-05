const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        const duplicate = cart.items.find(item => item.product.toString() === productId);
        if (!duplicate) {
          cart.items.push({ product: productId, quantity });
        }
      }

      await cart.save();
    } else {
      const newCart = new Cart({
        user: req.user.id,
        items: [{ product: productId, quantity }],
      });
      await newCart.save();
    }

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from cart" });
  }
};

const updateCart = async (req, res) => {
  const { productId, action } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (action === "increase") {
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrease") {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        // Quantity 1 se kam ho rahi hai, toh item hata do
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await cart.save();
    await cart.populate("items.product"); // Populate product details again after saving

    // Calculate new total price
    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.json({ cart: cart.items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update cart" });
  }
};


module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
};
