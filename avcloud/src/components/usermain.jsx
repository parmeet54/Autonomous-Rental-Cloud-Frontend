import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "./navbar";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Map from "./map";
import { useLoadScript } from "@react-google-maps/api";

const CARLA_URL = "http://carla-1490864021.us-east-2.elb.amazonaws.com";

const UserMain = ({ signOut }) => {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState(0);
  const [startingLocation, setStartingLocation] = useState("");
  const [startingCenter, setStartingCenter] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState("");
  const [destinationCenter, setDestinationCenter] = useState(null);
  const [newRequest, setNewRequest] = useState("");
  const navigate = useNavigate();

  const [libraries] = useState(["places", "geometry"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAj9rr5qIfGBpBXduinn8ttfUBykn3O3EM",
    libraries: libraries,
  });

  useEffect(() => {
    // Get available cars from database
    axios.get("cars").then((response) => {
      const cars = response.data.filter((car) => car.status === "inactive");
      if (cars.length > 0) {
        setCars(cars);
        setCarId(cars[0].car_id);
      }
    });
  }, []);

  const handleOnSubmit = (e) => {
    // Don't reload page
    e.preventDefault();

    // Create new booking in database
    // TODO: booking_id
    const bookingId = Math.floor(Math.random() * 9999);

    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(startingCenter.lat, startingCenter.lng),
        new window.google.maps.LatLng(
          destinationCenter.lat,
          destinationCenter.lng
        )
      );
    const cost = Math.round(distance) / 1000;

    const newBooking = {
      booking_id: bookingId,
      username: localStorage.getItem("token"),
      car_id: carId,
      curr_location: startingLocation,
      destination: destinationLocation,
      trip_status: "active",
      cost: cost,
    };

    axios
      .post("bookings", newBooking)
      .then((response) => {
        // Set car status to active
        return axios.put(`cars/status/${carId}`, {
          status: "active",
        });
      })
      .then((response) => {
        // Start CARLA simulation
        axios.post(CARLA_URL, {
          booking_id: bookingId,
          car_id: carId,
          vehicle: cars.find((element) => element.car_id === carId).car_type,
          start: startingLocation,
          end: destinationLocation,
        });

        // Change page
        navigate("/sensorviewactive/" + bookingId);
      });
  };

  const handleSelectStarting = (startingLocation) => {
    setStartingLocation(startingLocation);
    setNewRequest(true);
    geocodeByAddress(startingLocation)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setStartingCenter(latLng);
      });
  };

  const handleSelectDestination = (destinationLocation) => {
    setDestinationLocation(destinationLocation);
    setNewRequest(true);
    geocodeByAddress(destinationLocation)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setDestinationCenter(latLng);
      });
  };

  if (!isLoaded) {
    return "";
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col>
          <Navbar signOut={signOut} />
          <h1 className="fw-bold mb-4">Book Ride</h1>
          <Row>
            <Col>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group className="pb-4">
                  <Form.Label className="fw-bold">Starting Location</Form.Label>
                  <PlacesAutocomplete
                    name="startingLocation"
                    value={startingLocation}
                    onChange={(startingLocation) =>
                      setStartingLocation(startingLocation)
                    }
                    onSelect={handleSelectStarting}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <Form.Control
                          {...getInputProps({
                            placeholder: "1 Washington Sq",
                            className: "location-search-input",
                          })}
                          required
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                key={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    Destination Location
                  </Form.Label>
                  <PlacesAutocomplete
                    name="startingLocation"
                    value={destinationLocation}
                    onChange={(destinationLocation) =>
                      setDestinationLocation(destinationLocation)
                    }
                    onSelect={handleSelectDestination}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <Form.Control
                          {...getInputProps({
                            placeholder: "200 E Santa Clara st",
                            className: "location-search-input",
                          })}
                          required
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                key={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </Form.Group>
                <Form.Group className="pb-4">
                  <Form.Label className="fw-bold">
                    Available Vehicles
                  </Form.Label>
                  <Form.Select
                    name="carId"
                    onChange={(e) => setCarId(parseInt(e.target.value))}
                    disabled={cars.length === 0}
                    required
                  >
                    {cars.map((car) => (
                      <option
                        value={car.car_id}
                        key={car.car_id}
                      >{`${car.car_id} : ${car.car_type}`}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button type="submit" disabled={cars.length === 0}>
                  Book Ride
                </Button>
                {cars.length === 0 && (
                  <h5 className="mt-3" style={{ color: "red" }}>
                    All vehicles in use
                  </h5>
                )}
              </Form>
            </Col>
            <Col>
              <Map
                origin={startingLocation}
                destination={destinationLocation}
                newRequest={newRequest}
                requestHandled={() => setNewRequest(false)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserMain;
