import React from "react";
import "./T&C.css";

function TermsConditions() {
  return (
    <div className="terms-container">
      <h2 className="terms-heading">Terms and Conditions</h2>
      <div className="terms-content">
        <ol>
          <li>
            <strong>Introduction</strong><br />
            Welcome to Nest Food, your trusted online grocery shopping destination. These Terms & Conditions govern your use of our website and services. By accessing or using our site, you agree to be bound by these terms.
          </li>
          <li>
            <strong>Account Registration</strong><br />
            You must be at least 18 years old to register. Provide accurate and complete information. You are responsible for maintaining confidentiality of your login credentials.
          </li>
          <li>
            <strong>Products and Pricing</strong><br />
            All products listed are subject to availability. We reserve the right to change pricing or discontinue products at any time. Images are for representation only; actual product may vary.
          </li>
          <li>
            <strong>Orders and Payments</strong><br />
            Orders are confirmed only upon successful payment. Accepted payment methods may include UPI, credit/debit cards, and wallets. In case of payment failure, no order will be processed.
          </li>
          <li>
            <strong>Delivery</strong><br />
            We strive for timely delivery but do not guarantee delivery times. Orders may be delayed due to unforeseen circumstances.
          </li>
          <li>
            <strong>Cancellations & Refunds</strong><br />
            Cancellations must be requested within a limited time. Refunds will be processed through the original payment method within 7–10 business days.
          </li>
          <li>
            <strong>Use of Website</strong><br />
            You agree not to misuse the website or its content. Unauthorized copying or resale is prohibited.
          </li>
          <li>
            <strong>Termination</strong><br />
            We may suspend or terminate accounts violating terms without prior notice.
          </li>
          <li>
            <strong>Governing Law</strong><br />
            These Terms are governed by the laws of India. Disputes will be handled in courts of Ahmedabad, India.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default TermsConditions;
