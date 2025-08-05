import React from "react";
import "./Privacy.css";

function Privacy() {
  return (
    <div className="privacy-container">
      <h2 className="privacy-title">Privacy Policy</h2>
      <div className="privacy-content">
        <ol>
          <li>
            <strong>Information We Collect</strong><br />
            We collect personal data including: <br />
            - Name, email, phone number<br />
            - Delivery address<br />
            - Payment information<br />
            - Browsing behavior (via cookies)
          </li>
          <li>
            <strong>How We Use Your Information</strong><br />
            We use your data to: <br />
            - Process and deliver orders<br />
            - Send order updates and promotional offers<br />
            - Improve our services and user experience
          </li>
          <li>
            <strong>Data Sharing</strong><br />
            We do not sell your personal data to third parties.<br />
            Data may be shared with trusted partners (like delivery and payment providers) solely for fulfilling your order.
          </li>
          <li>
            <strong>Cookies</strong><br />
            We use cookies to enhance your browsing experience and analyze site traffic. You can modify your browser settings to control cookie usage.
          </li>
          <li>
            <strong>Data Security</strong><br />
            We use secure encryption and other measures to protect your personal data. However, we cannot guarantee complete security over the internet.
          </li>
          <li>
            <strong>Your Rights</strong><br />
            You can update or delete your account at any time.<br />
            You can unsubscribe from promotional communications through the link provided in emails.
          </li>
          <li>
            <strong>Policy Updates</strong><br />
            We reserve the right to modify this policy at any time. Changes will be posted on this page.
          </li>
          <li>
            <strong>Contact Us</strong><br />
            📧 Email: 211260116007setiit@gmail.com<br />
            🌐 Website: www.nestfood.com
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Privacy;
