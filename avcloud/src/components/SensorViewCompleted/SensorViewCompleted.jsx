import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Navbar from "../navbar";
import Sensor from "../Sensor/Sensor";

const SensorViewCompleted = (props) => {
  const [bookingId, setBookingId] = useState(0);
  // save booking id as state value when component renders
  useEffect(() => {
    if (
      props &&
      props.match &&
      props.match.params &&
      props.match.params.booking_id
    ) {
      setBookingId(parseInt(props.match.params.booking_id, 10));
    }
  }, [props]);
  return (
    <div>
      <Container fluid="md">
        <Navbar isSensorView={true} />
        <h3> Booking ID: {bookingId} </h3>
        <hr></hr>
        <h6> Completed Ride Sensor Information </h6>
        <Tabs>
          <Tab eventKey="location" title="Location">
            <Sensor sensor="location" booking_id={bookingId} completed={true} />
          </Tab>
          <Tab eventKey="movement" title="Movement">
            <Sensor sensor="movement" booking_id={bookingId} completed={true} />
          </Tab>
          <Tab eventKey="obstacle" title="Obstacle">
            <Sensor sensor="obstacle" booking_id={bookingId} completed={true} />
          </Tab>
          <Tab eventKey="collision" title="Collision">
            <Sensor
              sensor="collision"
              booking_id={bookingId}
              completed={true}
            />
          </Tab>
          <Tab eventKey="lane invasion" title="Lane Invasion">
            <Sensor
              sensor="lane_invasion"
              booking_id={bookingId}
              completed={true}
            />
          </Tab>
          <Tab eventKey="lidar" title="LIDAR">
            <Sensor sensor="lidar" booking_id={bookingId} completed={true} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default SensorViewCompleted;
