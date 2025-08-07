// server/routes/payment.js or similar
const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY); // Replace with your real Stripe Secret Key

  router.post("/create-checkout-session", async (req, res) => {
    const { cartItems, address } = req.body;
  
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${import.meta.env.VITE_BACKEND_URL}/success`,
        cancel_url: `${import.meta.env.VITE_BACKEND_URL}/cart`,
        metadata: {
          address,
        },
      });
  
      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: err.message});
  }
  });

module.exports = router;
