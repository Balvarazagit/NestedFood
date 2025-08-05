const express = require("express");
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCart } = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.delete("/", authMiddleware, removeFromCart);
router.put('/:productId/:action', authMiddleware, updateCart);

module.exports = router;
