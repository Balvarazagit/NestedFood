import "./section2.css";
import icon1 from "../../../assets/images/icon-1.svg";
import icon2 from "../../../assets/images/icon-2.svg";
import icon3 from "../../../assets/images/icon-3.svg";
import icon4 from "../../../assets/images/icon-4.svg";
import icon5 from "../../../assets/images/icon-5.svg";
import { Link } from "react-router-dom";
const Section2 = () => {
  return (
    <section>
      <div className=" iconContainer ">
        <div className="row d-flex">
          <div className="col-2 iconBox  ">
          <Link to={"/contact"}>
            <div className="imgBox">
              <img src={icon1} alt="" />
            </div>
            <div className="infoBox">
              <h3>
                Best prices & <br />
                offers
              </h3>
              <p>Orders ₹50 or more</p>
            </div>
            </Link>
          </div>
          <div className="col-2 iconBox">
          <Link to={"/contact"}>
            <div className="imgBox">
              <img src={icon2} alt="" />
            </div>
            <div className="infoBox">
              <h3>Free delivery</h3>
              <p>24/7 amazing services</p>
            </div>
            </Link>
          </div>
          <div className="col-2 iconBox">
          <Link to={"/contact"}>  
            <div className="imgBox">
              <img src={icon3} alt="" />
            </div>
            <div className="infoBox">
              <h3>Great daily deal</h3>
              <p>When you sign up</p>
            </div>
            </Link> 
          </div>
          <div className="col-2 iconBox">
          <Link to={"/contact"}>  
            <div className="imgBox">
              <img src={icon4} alt="" />
            </div>
            <div className="infoBox">
              <h3>Wide assortment</h3>
              <p>Mega Discounts</p>
            </div>
            </Link>
          </div>
          <div className="col-2 iconBox">
          <Link to={"/contact"}>  
            <div className="imgBox">
              <img src={icon5} alt="" />
            </div>

            <div className="infoBox">
              <h3>Easy returns</h3>
              <p>Within 30 days</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Section2;
