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

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      showSpinner: false,
    };
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({ message: "", showSpinner: true });

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("login", data).then((response) => {
      this.setState({ showSpinner: false });
      if (response.data.message) {
        this.setState({ message: "Invalid username/password" });
      } else {
        localStorage.setItem("token", this.state.username);
        if (this.state.username == "admin") {
          this.props.history.push("/servicemain");
        } else {
          this.props.history.push("/usermain");
        }
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
            <Form className="account-form" onSubmit={this.handleOnSubmit}>
              <h3 className="text-center mb-3">Sign in to your account</h3>
              {this.state.showSpinner && (
                <div className="text-center">
                  <Spinner animation="border" variant="primary"></Spinner>
                </div>
              )}
              {this.state.message !== "" && (
                <Alert variant="danger">{this.state.message}</Alert>
              )}
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
  }
}
