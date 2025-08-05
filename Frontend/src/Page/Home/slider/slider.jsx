import Slider from "react-slick";
import "./slider.css";
import s1Image from "../../../assets/images/slider-1.png";
import s2Image from "../../../assets/images/slider-2.png";
import Button from "@mui/material/Button";
import TelegramIcon from "@mui/icons-material/Telegram";
const HomeSlider = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scrolling
    speed: 700, // Transition speed in ms
    slidesToShow: 1, // Number of slides visible
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true,
    autoplaySpeed: 2000,
    fade: false,
    arrow: true,
  };
  return (
    <section className="home-slider">
      <div className="container-fluid position-relative">
        <Slider {...settings} className="home-slider-main">
          <div className="item item-1">
            <img src={s1Image} alt="Slide 1" />
            <div className="info">
              <h1>
                Don’t miss amazing <br />
                grocery deals
              </h1>
              <p>Sign up for the daily newsletter</p>
            </div>
          </div>
          <div className="item item-2">
            <img src={s2Image} alt="Slide 2" />
            <div className="info">
              <h1>
                Fresh Vegetables
                <br />
                Big discount
              </h1>
              <p>Save up to 50% off on your first order</p>
            </div>
          </div>
        </Slider>
        <div className="email-input">
          <TelegramIcon />
          <input type="text" placeholder="Your email address" />
          <Button className="bg-green">Subscribe</Button>
        </div>
      </div>
    </section>
  );
};
export default HomeSlider;
