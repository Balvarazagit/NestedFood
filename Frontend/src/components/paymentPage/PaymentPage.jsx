import { useContext, useState } from "react";
import { CartContext } from "../cart/cartContext.jsx";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, product) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity, 10);
    if (!isNaN(price) && !isNaN(quantity)) {
      return acc + price * quantity;
    }
    return acc;
  }, 0);

  const handleOrderDetail = () => {
    const orderDetails = {
      orderId: `ORD-${Date.now()}`,
      time: new Date().toLocaleString(),
      paymentMethod,
      totalAmount: totalPrice,
      orderedItems: cart,
      orderStatus: "Placed",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setError("");
    setFormErrors({});
    setCardNumber("");
    setUpiId("");
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    setFormErrors({});
  };

  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!paymentMethod) {
      errors.paymentMethod = "Please select a payment method.";
    }

    if (paymentMethod === "card") {
      const cleanCardNumber = cardNumber.replace(/\s+/g, "");
      if (!/^\d{16}$/.test(cleanCardNumber)) {
        errors.cardNumber = "Enter a valid 16-digit card number.";
      }
    }

    if (paymentMethod === "upi") {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        errors.upiId = "Enter a valid UPI ID (e.g., yourname@bank).";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsPaid(true);
    handleOrderDetail();
    clearCart();
    setFormErrors({});

    setTimeout(() => {
      navigate("/order-tracking");
    }, 2000);
  };

  return (
    <div className="paymentPage">
      <h2>Proceed to Payment</h2>
      {isPaid ? (
        <div className="paymentMessage">
          <span className="successIcon">✔️</span>
          <p>Ordered Successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="paymentMethod">
            <label>Select Payment Method</label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="paymentSelect"
            >
              <option value="">-- Select Payment Method --</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            {formErrors.paymentMethod && (
              <p className="error">{formErrors.paymentMethod}</p>
            )}
          </div>

          {paymentMethod === "card" && (
            <>
              <div>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="Enter your card number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
                {formErrors.cardNumber && (
                  <p className="error">{formErrors.cardNumber}</p>
                )}
              </div>
              <div>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" placeholder="Enter CVV" required />
              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <div>
              <label htmlFor="upiId">UPI ID</label>
              <input
                type="text"
                id="upiId"
                placeholder="Enter your UPI ID"
                value={upiId}
                onChange={handleUpiIdChange}
                required
              />
              {formErrors.upiId && (
                <p className="error">{formErrors.upiId}</p>
              )}
            </div>
          )}

          {paymentMethod === "cod" && (
            <div>
              <p>Cash on Delivery selected. No additional details needed.</p>
            </div>
          )}

          <div>
            <button type="submit">Pay Now</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
