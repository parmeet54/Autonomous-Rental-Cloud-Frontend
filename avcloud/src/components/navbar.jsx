import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import logo from "../images/logo.png";

const Navbar = ({ signOut }) => {
  return (
    <Row className="text-center mb-5">
      <Col>
        <Link to="/">
          <Image src={logo} className="mb-3 logo" />
        </Link>
        <h5>Hello {localStorage.getItem("token")}</h5>
        <Link to="/usermain" className="navigation-link me-5">
          Book Ride
        </Link>
        <Link to="/ridehistory" className="navigation-link me-5">
          Ride History
        </Link>
        <Link to="/profile" className="navigation-link me-5">
          User Profile
        </Link>
        <Link to="/" onClick={signOut} className="navigation-link">
          Sign Out
        </Link>
      </Col>
    </Row>
  );
};

export default Navbar;
