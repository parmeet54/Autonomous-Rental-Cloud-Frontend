import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import logo from "../images/logo.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (e.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setMessage("");
    setShowSpinner(true);

    const newUser = {
      name: name,
      email: email,
      username: username,
      password: password,
      address: address,
      city: city,
      credit_card: cardnumber,
    };

    axios.post("users", newUser).then((response) => {
      setShowSpinner(false);
      if (response.data.errno === 1062) {
        setMessage("Username taken");
      } else {
        navigate("/");
      }
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Row>
            <Col className="text-center mb-3">
              <Link to="/">
                <Image src={logo} className="logo" />
              </Link>
            </Col>
          </Row>
          <Form
            className="account-form"
            onSubmit={handleOnSubmit}
            noValidate
            validated={validated}
          >
            <h3 className="text-center mb-3">Create your account</h3>
            {showSpinner && (
              <div className="text-center">
                <Spinner animation="border" variant="primary"></Spinner>
              </div>
            )}
            {message !== "" && <Alert variant="danger">{message}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="John Doe"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="^[a-zA-Z][a-zA-Z ,.'-]*$"
                maxLength="254"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="john.doe@gmail.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                maxLength="254"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="john.doe"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength="254"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="**********"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="^[ -~]{6,}$"
                maxLength="254"
              />
              <Form.Text muted>- Must be at least 6 characters long</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="123 Main Street"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength="254"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="San Jose"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength="254"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="0123456789012345"
                name="cardnumber"
                value={cardnumber}
                onChange={(e) => setCardNumber(e.target.value)}
                pattern="^\d{16}$"
                maxLength="16"
              />
            </Form.Group>
            <Button className="button-oval w-100" type="submit">
              Sign Up
            </Button>
          </Form>
          <h6 className="text-center mt-3">Already have an account?</h6>
          <Row className="account-button-container">
            <Col className="text-center">
              <Link to="/">
                <Button className="button-oval button-orange w-100">
                  Sign In
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
