import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu"; 
import CloseIcon from "@mui/icons-material/Close"; 
import GridViewIcon from "@mui/icons-material/GridView";
import Headphone from "../../../assets/images/icon-headphone.svg";
import HotIcon from "../../../assets/images/icon-hot.svg";

const ResponsiveNavBar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar bg="light" expand="md" sticky="top" expanded={expanded} className="navbar-custom">
      <Container fluid>
        {/* Mobile Menu Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}>
          {expanded ? <CloseIcon /> : <MenuIcon />}
        </Navbar.Toggle>

        {/* Category Button */}
        {/* <Navbar.Brand className="d-none d-md-block">
          <Button className="bg-green text-white">
            <GridViewIcon /> &nbsp; Browse All Categories
          </Button>
        </Navbar.Brand> */}

        {/* Main Navigation */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate("/deals")}>
              <img className="HotIcon" src={HotIcon} alt="" /> Deals
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>

            {/* Shop Dropdown */}
            <NavDropdown title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/shop-grid")}>
                Shop Grid
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/shop-list")}>
                Shop List
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/product")}>
                Single Product
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/wishlist")}>
                My Order
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/cart")}>Cart</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Contact Section */}
        {/* <div className="contact-section d-none d-md-flex align-items-center">
          <img src={Headphone} alt="support" className="mr-2" />
          <div className="info">
            <h6 className="mb-0">1900 - 888</h6>
            <p className="mb-0 text-muted">24/7 Support Center</p>
          </div>
        </div> */}
      </Container>
    </Navbar>
  );
};

export default ResponsiveNavBar;
