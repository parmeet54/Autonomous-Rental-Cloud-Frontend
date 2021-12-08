import React from "react";
import { useParams } from "react-router-dom";
import { Container, Tabs, Tab } from "react-bootstrap";
import Navbar from "../navbar";
import Sensor from "../Sensor/Sensor";

const SensorViewActive = () => {
  const { bookingId } = useParams();
  return (
    <div>
      <Container fluid="md">
        <Navbar isSensorView={true} />
        <h1 className="fw-bold mb-4">Booking ID: {bookingId}</h1>
        <Tabs>
          <Tab eventKey="location" title="Location">
            <Sensor sensor="location" bookingId={bookingId} />
          </Tab>
          <Tab eventKey="movement" title="Movement">
            <Sensor sensor="movement" bookingId={bookingId} />
          </Tab>
          <Tab eventKey="obstacle" title="Obstacle">
            <Sensor sensor="obstacle" bookingId={bookingId} />
          </Tab>
          <Tab eventKey="collision" title="Collision">
            <Sensor sensor="collision" bookingId={bookingId} />
          </Tab>
          <Tab eventKey="lane invasion" title="Lane Invasion">
            <Sensor sensor="lane_invasion" bookingId={bookingId} />
          </Tab>
          <Tab eventKey="lidar" title="LIDAR">
            <Sensor sensor="lidar" bookingId={bookingId} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default SensorViewActive;
