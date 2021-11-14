import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export class UserMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      car_id: 0,
      startingLocation: "",
      destinationLocation: "",
    };
  }

  componentDidMount() {
    // Get available cars from database
    axios.get("cars").then((response) => {
      this.setState({
        cars: response.data,
        car_id: response.data[0].car_id,
      });
    });
  }

  handleOnChange = (e) => {
    // Update state from form
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: name === "car_id" ? parseInt(value) : value });
  };

  handleOnSubmit = (e) => {
    // Don't reload page
    e.preventDefault();

    // Create new booking in database
    // TODO: booking_id
    const booking_id = Math.floor(Math.random() * 9999);
    axios
      .post("bookings", {
        booking_id: booking_id,
        username: localStorage.getItem("token"),
        car_id: this.state.car_id,
        curr_location: this.state.startingLocation,
        destination: this.state.destinationLocation,
        trip_status: "active",
        cost: Math.floor(Math.random() * 20 + 10),
      })
      .then((response) => {
        // Set car status to active
        return axios.put(
          `cars/status/${this.state.car_id}`,
          {
            status: "active",
          }
        );
      })
      .then((response) => {
        // Start CARLA simulation
        axios.post("http://ec2-52-15-174-182.us-east-2.compute.amazonaws.com", {
          booking_id: booking_id,
          car_id: this.state.car_id,
          vehicle: this.state.cars.find(
            (element) => element.car_id === this.state.car_id
          ).car_type,
          start: this.state.startingLocation,
          end: this.state.destinationLocation,
        });

        // Change page
        this.props.history.push("/ridehistory");
      });
  };

  render() {
    return (
      <Container className="py-5">
        <h1 className="mb-4">Book a Ride!</h1>

        <Form
          className="flex-column align-items-center"
          onSubmit={this.handleOnSubmit}
        >
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold">Starting location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1 Washington Sq"
                  name="startingLocation"
                  value={this.state.startingLocation}
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold">
                  Destination location
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="200 E Santa Clara St"
                  name="destinationLocation"
                  value={this.state.destinationLocation}
                  onChange={this.handleOnChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Available vehicles</Form.Label>
            <Form.Select name="car_id" onChange={this.handleOnChange}>
              {this.state.cars.map((car) => (
                <option
                  value={car.car_id}
                  key={car.car_id}
                >{`${car.car_id} : ${car.car_type}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Book ride
          </Button>
        </Form>

        <div className="mt-4">
          <Link to="/" className="me-2">
            logout
          </Link>
          <Link to="/ridehistory" className="ms-2">
            ride history
          </Link>
        </div>
      </Container>
    );
  }
}
