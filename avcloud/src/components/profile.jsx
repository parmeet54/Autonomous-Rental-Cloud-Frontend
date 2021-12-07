import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Profile = ({ signOut }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    axios.get("users/" + localStorage.getItem("token")).then((response) => {
      const user = response.data[0];
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setAddress(user.address);
      setCity(user.city);
      setCardNumber(user.credit_card);
    });
  }, []);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setMessage("");

    const updatedUser = {
      name: name,
      email: email,
      username: username,
      password: newPassword,
      address: address,
      city: city,
      credit_card: cardnumber,
    };

    axios.put("users/" + username, updatedUser).then((response) => {
      setMessage("Profile updated");
    });
  };

  const handleDeleteUser = () => {
    axios
      .delete("users/" + username, {
        username,
      })
      .then((response) => {
        signOut();
      });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col>
          <Navbar signOut={signOut} />
          <h1 className="fw-bold mb-4">User Profile</h1>
        </Col>
        <Form
          className="account-form"
          onSubmit={handleUpdateUser}
          noValidate
          validated={validated}
        >
          {message !== "" && <Alert variant="success">{message}</Alert>}
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
              disabled={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leave blank to keep current password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            Update Profile
          </Button>
        </Form>
        <Button
          variant="danger"
          className="button-oval mt-5 w-auto"
          onClick={handleDeleteUser}
        >
          Delete Account
        </Button>
      </Row>
    </Container>
  );
};

export default Profile;
