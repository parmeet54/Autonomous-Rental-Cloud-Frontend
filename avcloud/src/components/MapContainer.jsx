import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: this.props.start,
      address2: '',

      showingInfoWindow: false,
      
      selectedPlace: {},
  
      mapCenter: this.props.marker1,
      mapCenter2: this.props.marker2,

      activeMarker: [],
    };
    console.log(this.state.address)
    console.log(this.state.mapCenter)
  }
  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ address: nextProps.start });
    this.setState({ mapCenter: nextProps.marker1 });
    console.log(this.props.start)
  };

  handleChange = address => {
    this.setState({ address });
    console.log(this.props.start)
    this.handleSelect();
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        

        // update center state
        this.setState({ mapCenter: latLng });
        console.log(this.state.address)
        console.log("I did it");
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <div id='googleMaps'>
        
        <Map 
          google={this.props.google}
          containerStyle={{
            width: '600px',
            height: '500px'
          }
          }
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
        >
          <Marker 
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }} />
          <Marker 
            position={{
              lat: this.state.mapCenter2.lat,
              lng: this.state.mapCenter2.lng
            }} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAj9rr5qIfGBpBXduinn8ttfUBykn3O3EM')
})(MapContainer)