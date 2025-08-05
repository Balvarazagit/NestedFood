const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Step 1: Merge duplicate products by product ID
    const mergedItemsMap = new Map();

    cart.items.forEach(item => {
      const productId = item.product._id.toString();

      if (mergedItemsMap.has(productId)) {
        // Add to existing quantity
        mergedItemsMap.get(productId).quantity += item.quantity;
      } else {
        // Add new entry
        mergedItemsMap.set(productId, {
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        });
      }
    });

    const mergedItems = Array.from(mergedItemsMap.values());

    // Step 2: Calculate total amount
    const totalAmount = mergedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Step 3: Create and save order
    const order = new Order({
      user: req.user.id,
      items: mergedItems,
      totalAmount,
      shippingAddress: req.body.shippingAddress,
    });

    await order.save();

    // Step 4: Clear the cart
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("user", "name")            // optional: populate user name even for user-specific view
      .populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")            // 👈 populate only the name of the user
      .populate("items.product");          // 👈 populate product details
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status value
    const validStatuses = ["pending", "shipped", "delivered", "canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate("user", "name")
      .populate("items.product");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};


module.exports = { placeOrder, getUserOrders, getAllOrders , updateOrderStatus };
