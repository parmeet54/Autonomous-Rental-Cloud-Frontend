import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const RideHistory = ({ signOut }) => {
  const [bookings, setBookings] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("bookings/userbookings/" + localStorage.getItem("token"))
      .then((response) => {
        const bookings = response.data;
        setBookings(bookings);
        setTotalCost(bookings.reduce((a, v) => a + v.cost, 0).toFixed(2));
      });
  }, []);

  const handleRoute = (bookingId, status) => {
    if (status === "active") {
      navigate("/sensorviewactive/" + bookingId);
    } else {
      navigate("/sensorviewcompleted/" + bookingId);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col>
          <Navbar signOut={signOut} />
          <h1 className="fw-bold mb-4">Ride History</h1>
        </Col>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Username</th>
              <th>Car ID</th>
              <th>Starting Location</th>
              <th>Destination Location</th>
              <th>Trip Status</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.username}</td>
                <td>{booking.car_id}</td>
                <td>{booking.curr_location}</td>
                <td>{booking.destination}</td>
                <td>{booking.trip_status}</td>
                <td>${booking.cost}</td>
                <td>
                  <Button
                    onClick={() =>
                      handleRoute(booking.booking_id, booking.trip_status)
                    }
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Total Cost: ${totalCost}</h3>
      </Row>
    </Container>
  );
};

export default RideHistory;
