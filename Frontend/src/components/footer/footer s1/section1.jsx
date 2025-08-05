import footerImage from "../../../assets/images/banner-9.png";
import "./section1.css";

import Button from "@mui/material/Button";
import TelegramIcon from "@mui/icons-material/Telegram";
const Section1 = () => {
  return (
    <section className="footerBanner">
     
      <div className="info-banner">
        <h1>
          Stay home & get your daily <br />
          needs from our shop{" "}
        </h1>
        <h4>
          Start Your Daily Shopping with{" "}
          <span className="text-green">Nest Mart</span>
        </h4>
        <div className="email-input">
          <TelegramIcon />
          <input type="text" placeholder="Your email address" />
          <Button className="bg-green">Subscribe</Button>
        </div>
      </div>

      <div className="footerImg">
        <img src={footerImage} alt="" />
      </div>
      
    </section>
  );
};
export default Section1;
