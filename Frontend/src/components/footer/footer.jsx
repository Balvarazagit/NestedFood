import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";
import Section1 from "./footer s1/section1";
import Section2 from "./footer s2/section2";
import Section3 from "./footer s3/section3";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  YouTube,
  LocalPhone,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <Section1 />
      <Section2 />
      <Section3 />
      <div className="container">
        <div className="row text-center text-lg-start align-items-center">
          {/* Footer Border */}
          {/* <div className="col-12 mb-3">
            <hr className="border-success" />
          </div> */}

          {/* Copyright Section */}
          <div className="col-lg-4 col-md-6 mb-3">
            <p className="text-muted small mb-0">
              © 2024, <strong className="text-success">Nest </strong> - Mart & Grocery
              <br />
              All rights reserved By BAR
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
            <div className="d-flex flex-row align-items-center justify-content-between align-items-lg-start w-100">
              <div className="d-flex align-items-center mb-2">
                <LocalPhone className="text-success me-2" />
                <p className="mb-0 small">
                <Link to={"tel:+917698528935"}>(+91)-769-852-893-5</Link><span className="d-block small">Working 8:00 - 22:00</span>
                </p>
              </div>
              <div className="d-flex align-items-center">
                <LocalPhone className="text-success me-2" />
                <p className="mb-0 small">
                <Link to={"tel:+917698528935"}>(+91)-769-852-893-5</Link> <span className="d-block small">24/7 Support Center</span>
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="col-lg-4 text-center text-md-end">
            <h6 className="small fw-bold mb-2">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-2">
              <Facebook className="text-primary" />
              <Twitter className="text-info" />
              <Instagram className="text-danger" />
              <Pinterest className="text-danger" />
              <YouTube className="text-danger" />
            </div>
            <p className="small text-muted mt-2">
              Up to 15% discount on your first subscribe
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
