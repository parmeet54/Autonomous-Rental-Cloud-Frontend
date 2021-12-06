import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Navbar } from "./index";
import MapContainer from './MapContainer';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export class UserMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      car_id: 0,
      startingLocation: "",
      destinationLocation: "",

      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      },
      mapCenter2: {
        lat: 49.2827291,
        lng: -123.1207375
      },
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


  handleChange = startingLocation => {
    this.setState({ startingLocation });
    console.log(this.state.startingLocation)
  };
 
  handleSelect = startingLocation => {
    this.setState({ startingLocation });
    console.log(this.state.startingLocation)
    geocodeByAddress(startingLocation)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Error', error));
  };

  handleChange2 = destinationLocation => {
    this.setState({ destinationLocation });
  };
 
  handleSelect2 = destinationLocation => {
    this.setState({ destinationLocation });
    geocodeByAddress(destinationLocation)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Error', error));
  };


  render() {
    return (
      <Container>
        <div > <Navbar /> </div>
        
        <h1 className="py-5">Book a Ride!</h1>
        <hr className="solid"/>
        <Row>
        <Col>
        <Form
          className="flex-column align-items-center py-5"
          onSubmit={this.handleOnSubmit}
        >
          
            <Col>
            
            <Form.Group className="pb-5">
            <Form.Label className="fw-bold">Starting Location</Form.Label>
            
            <PlacesAutocomplete
              name="startingLocation"
              value={this.state.startingLocation}
              
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Form.Control
                    {...getInputProps({
                      placeholder: '1 Washington Sq',
                      className: 'location-search-input',
                    })}            
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
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

            </Col>
            <Col>
            <Form.Group className="pb-5">
            <Form.Label className="fw-bold">Destination Location</Form.Label>
            
            <PlacesAutocomplete
              name="startingLocation"
              value={this.state.destinationLocation}
              
              onChange={this.handleChange2}
              onSelect={this.handleSelect2}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Form.Control
                    {...getInputProps({
                      placeholder: '200 E Santa Clara st',
                      className: 'location-search-input',
                    })}            
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
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
            </Col>
          
          <Form.Group className="pb-5">
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
          <br/>
          <Button variant="primary" type="submit">
            Book ride
          </Button>
        </Form>


        </Col>
        <Col>
        
        <MapContainer start={this.state.startingLocation} end={this.state.destinationLocation} marker1={this.state.mapCenter} marker2={this.state.mapCenter}/>  
        </Col>
        </Row>
      </Container>
    );
  }
}
