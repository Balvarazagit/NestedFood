import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const hasPlacedOrder = useRef(false); // prevents double execution

  const placeOrder = async () => {
    if (hasPlacedOrder.current) return; // already placed
    hasPlacedOrder.current = true;

    const token = localStorage.getItem("token");
    const address = localStorage.getItem("pendingAddress");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress: address }),
      });

      if (!res.ok) throw new Error("Order failed");
      localStorage.removeItem("pendingAddress");
      console.log("Order placed successfully");
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  useEffect(() => {
    placeOrder();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="text-center border p-5 rounded shadow" style={{ maxWidth: "500px" }}>
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
        </div>
        <h2 className="fw-bold text-success">Payment Successful!</h2>
        <p className="mt-3">Your order has been placed successfully. Thank you for shopping with us!</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
