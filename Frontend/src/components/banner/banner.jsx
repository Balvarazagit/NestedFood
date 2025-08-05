import "./banner.css";
import banner1 from "../../assets/images/banner-1.png";
import banner2 from "../../assets/images/banner-2.png";
import banner3 from "../../assets/images/banner-3.png";
import Button from "@mui/material/Button";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const Banners = () => {
  return (
    <div className="bannerSection">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="box">
              <img
                src={banner1}
                className="banner1 transition"
                alt="Banner 1"
              />
            </div>
            <div className="h4-btn">
              <h4 className="transition">
                Everyday Fresh & <br />
                Clean with Our <br />
                Products
              </h4>
              <Link to={`/shop`}>
              <Button className="move">
                Shop Now <EastIcon />{" "}
              </Button>
              </Link>
            </div>
          </div>

          <div className="col-4">
            <div className="box">
              <img
                src={banner2}
                className="banner2 transition"
                alt="Banner 2"
              />
            </div>
            <div className="h4-btn ">
              <h4 className="transition">
                Make your Breakfast <br /> Healthy and Easy
              </h4>{" "}
              <Link to={`/shop`}>
              <Button className="move">
                Shop Now <EastIcon />{" "}
              </Button>
              </Link>
            </div>
          </div>

          <div className="col-4">
            <div className="box">
              <img
                src={banner3}
                className="banner3 transition"
                alt="Banner 3"
              />
            </div>
            <div className="h4-btn">
              <h4 className="transition">
                The best Organic <br />
                Products Online
              </h4>
              <Link to={`/shop`}>
              <Button className="move">
                Shop Now <EastIcon />{" "}
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
