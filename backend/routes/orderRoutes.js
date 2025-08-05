const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders ,updateOrderStatus} = require("../controllers/orderController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, placeOrder);
router.get("/user", authMiddleware, getUserOrders);
router.get("/", authMiddleware, isAdmin, getAllOrders);
router.patch("/:orderId/status", updateOrderStatus);

module.exports = router;
