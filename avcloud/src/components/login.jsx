import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import logo from "../images/logo.png";

const Login = ({ signIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setShowSpinner(true);

    const credentials = {
      username: username,
      password: password,
    };

    axios.post("login", credentials).then((response) => {
      setShowSpinner(false);
      if (response.data.message) {
        setMessage("Invalid username/password");
      } else {
        signIn(username);
      }
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Row>
            <Col className="text-center mb-3">
              <Image src={logo} className="logo" />
            </Col>
          </Row>
          <Form className="account-form" onSubmit={handleOnSubmit}>
            <h3 className="text-center mb-3">Sign in to your account</h3>
            {showSpinner && (
              <div className="text-center">
                <Spinner animation="border" variant="primary"></Spinner>
              </div>
            )}
            {message !== "" && <Alert variant="danger">{message}</Alert>}
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
                maxLength="254"
              />
            </Form.Group>
            <Button className="button-oval w-100" type="submit">
              Sign In
            </Button>
          </Form>
          <h6 className="text-center mt-3">Don't have an account?</h6>
          <Row className="account-button-container">
            <Col className="text-center">
              <Link to="/register">
                <Button className="button-oval button-orange w-100">
                  Sign Up
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
