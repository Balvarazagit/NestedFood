import "./section3.css";
import Logo from "../../../assets/images/logo.svg";
import TelegramIcon from "@mui/icons-material/Telegram";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import visaCard from "../../../assets/images/payment-method-visa.png";  
import appStore from "../../../assets/images/app-store.jpg";
import playStore from "../../../assets/images/google-play.jpg";
import { Link } from "react-router-dom";

const Section3 = () => {
  return (
    <section className="section-last">
      <div className="container-fluid">
        <div className="row">
          <div className="img-para col-2">
            <div className="main-logo">
              <a href="/home"><img src={Logo} alt="Image Loading" /></a>
            </div>
            <div className="more-info">
              <ul className="footer-para allUl-footer">
                <li>
                  <RoomOutlinedIcon />
                  Address: Ahmedabad, <br /> Gujarat,India
                </li>
                <li className="me-3">
                  <HeadphonesOutlinedIcon /> Call Us:<Link to={"tel:+917698528935"}>(+91)-769-852-893-5</Link>
                </li>
                <li>
                  <TelegramIcon />Email:211260116007<br/>setiit@gmail.com
                </li>
                <li>
                  <AccessAlarmOutlinedIcon />
                  Hours:10:00 - 18:00, Mon - Sat
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-company col-2">
            <ul className="allUl-footer ">
              <h4> Company</h4>

              <li><Link to={"/about"}>About Us</Link></li>
              <li><Link to={"/about"}>Delivery Information</Link></li>
              <li><Link to={"/privacy_policy"}>Privacy Policy</Link></li>
              <li><Link to={"/term&conditions"}>Terms & Conditions</Link></li>
              <li><Link to={"/contact"}>Contact Us</Link></li>
              <li><Link to={"/contact"}>Support Center</Link></li>
              <li><Link to={"/contact"}>Careers</Link></li>
            </ul>
          </div>
          <div className="footer-account col-2">
            <ul className="allUl-footer">
              {" "}
              <h4>Account</h4>
              <li><Link to={"/register"}>Sign In</Link></li>
              <li><Link to={"/cart"}>View Cart</Link></li>
              <li><Link to={"/not-found"}>My Wishlist</Link></li>
              <li><Link to={"/order-tracking"}>Track My Order</Link></li>
              <li><Link to={"/contact"}>Help Ticket</Link></li>
              <li><Link to={"/contact"}>Shipping Details</Link></li>
              <li><Link to={"/contact"}>Compare products</Link></li>
            </ul>
          </div>
          <div className="footer-corporate col-2">
            <ul className="allUl-footer">
              <h4>Corporate</h4> 
              <li><Link to={"/contact"}>Become a Vendor</Link></li>
              <li><Link to={"/contact"}>Affiliate Program</Link></li>
              <li><Link to={"/contact"}>Farm Business</Link></li>
              <li><Link to={"/contact"}>Farm Careers</Link></li>
              <li><Link to={"/contact"}>Our Suppliers</Link></li>
              <li><Link to={"/contact"}>Accessibility</Link></li>
              <li><Link to={"/contact"}>Promotions</Link></li>
            </ul>
          </div>
          <div className="footer-popular col-2">
            <ul className="allUl-footer">
              <h4>Popular</h4>
              <li><Link to={"/shop"}>Tomato</Link></li>
              <li><Link to={"/shop"}>Bell Pepper</Link></li>
              <li><Link to={"/shop"}>Broccoli</Link></li>
              <li><Link to={"/shop"}>Peach</Link></li>
              <li><Link to={"/shop"}>Red Apple</Link></li>
              <li><Link to={"/shop"}>Laddu</Link></li>
              <li><Link to={"/shop"}>Gulab Jamun</Link></li>
            </ul>
          </div>
          <div className="play-store col-2">
            <h3>Install App</h3>
            <p>From App Store or Google Play</p>
            <div className="appDownloadImg">
              <img src={appStore} alt="" className="app-store" />
              <img src={playStore} alt="" className="play-store" />
            </div>
            <div className="visa-box">
              <p>Secured Payment Gateways</p>
              <img src={visaCard} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Section3;
