import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./catSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing multiple images
import Banana from "../../assets/images/banana (3).png";
import Stawberry from "../../assets/images/strawberry.png";
import Peach from "../../assets/images/peach.png";
import Blackplum from "../../assets/images/blackplum.png";
import Kiwi from "../../assets/images/kiwi.png";
import Chocolate from "../../assets/images/chocolate.png";
import Cabbage from "../../assets/images/cabbage.png";
import Custradapple from "../../assets/images/custradapple.png";
import Redapple from "../../assets/images/redapple.png";

const CategorizeSlider = () => {
  // Dynamic items array with multiple images
  const categories = [
    { name: "Banana", items: 26, img: Banana, bg: "#fffceb" },
    { name: "Stawberry", items: 30, img: Stawberry, bg: "#ecffec" },
    { name: "Peach", items: 22, img: Peach, bg: "#feefea" },
    { name: "Blackplum", items: 15, img: Blackplum, bg: "#fff3eb" },
    { name: "Kiwi", items: 18, img: Kiwi, bg: "#fff3ff" },
    { name: "Chocolate", items: 25, img: Chocolate, bg: "#f2fce4" },
    { name: "Cabbage", items: 20, img: Cabbage, bg: "#feefea" },
    { name: "Custradapple", items: 19, img: Custradapple, bg: "#fffceb" },
    { name: "Redapple", items: 28, img: Redapple, bg: "#ecffec" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Adjust based on how many items you want visible
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    fade: false,
    arrows: false,
  };

  return (
    <div className="catSliderContainer">
      <div className="container-fluid">
        <h2 className="hd">Featured Categories</h2>
        <Slider {...settings} className="cat-slider-main">
          {categories.map((category, index) => (
            <div className="item" key={index}>
              {/* Link to the shop page with the category name as a parameter */}
              <Link id="a" to={`/shop/${category.name.toLowerCase()}`}>
                <div className="info" style={{ background: category.bg }}>
                  <img src={category.img} alt={category.name} />
                  <h5>{category.name}</h5>
                  <p>{category.items} items</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorizeSlider;
