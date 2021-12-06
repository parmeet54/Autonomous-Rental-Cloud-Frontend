import React, { Component } from "react";
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

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      address: "",
      city: "",
      cardnumber: "",
      message: "",
      showSpinner: false,
      validated: false,
    };
  }

  handleOnSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (e.currentTarget.checkValidity() === false) {
      this.setState({ validated: true });
      return;
    }

    this.setState({ message: "", showSpinner: true });

    const data = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      address: this.state.address,
      city: this.state.city,
      cardnumber: this.state.cardnumber,
    };

    axios.post("users", data).then((response) => {
      this.setState({ showSpinner: false });
      if (response.data.errno === 1062) {
        this.setState({ message: "Username taken" });
      } else {
        this.props.history.push("/");
      }
    });
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Row>
              <Col className="text-center mb-3">
                <Link to="/">
                  <Image src={logo} />
                </Link>
              </Col>
            </Row>
            <Form
              className="account-form"
              onSubmit={this.handleOnSubmit}
              noValidate
              validated={this.state.validated}
            >
              <h3 className="text-center mb-3">Create your account</h3>
              {this.state.showSpinner && (
                <div className="text-center">
                  <Spinner animation="border" variant="primary"></Spinner>
                </div>
              )}
              {this.state.message !== "" && (
                <Alert variant="danger">{this.state.message}</Alert>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                  pattern="^[a-zA-Z][a-zA-Z ,.'-]*$"
                  maxLength="254"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="john.doe@gmail.com"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
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
                  value={this.state.username}
                  onChange={this.handleOnChange}
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
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  pattern="^[ -~]{6,}$"
                  maxLength="254"
                />
                <Form.Text muted>
                  - Must be at least 6 characters long
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="123 Main Street"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleOnChange}
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
                  value={this.state.city}
                  onChange={this.handleOnChange}
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
                  value={this.state.cardnumber}
                  onChange={this.handleOnChange}
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
  }
}
