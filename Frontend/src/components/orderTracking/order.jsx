import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./order.css";

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cancelReason, setCancelReason] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? { ...order, orderStatus: "Cancelled", cancelReason: cancelReason || "No reason provided" }
        : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setIsCanceling(false);
  };

  const handleShoppingPage = () => {
    navigate("/shop");
  };

  return (
    <div className="orderPage">
      <h2>
        Order History{" "}
        <button onClick={handleShoppingPage} className="continueShoppingButton">
          Continue Shopping
        </button>
      </h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        [...orders].reverse().map((order) => (
          <div key={order.orderId} className="orderDetails">
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Time:</strong> {order.time}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Products:</strong>{" "}
              {order.orderedItems.map((item) => item.name || item.productName).join(", ")}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>
            {order.orderStatus === "Placed" && (
              <div>
                {isCanceling ? (
                  <div>
                    <textarea
                      className="cancelReasonInput"
                      placeholder="Enter reason for cancellation..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      required
                    />
                    <button
                      className="cancelButton"
                      onClick={() => handleCancelOrder(order.orderId)}
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                ) : (
                  <button
                    className="cancelButton"
                    onClick={() => setIsCanceling(true)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
