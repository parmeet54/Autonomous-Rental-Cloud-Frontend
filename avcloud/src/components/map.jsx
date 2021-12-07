import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 37.335241,
  lng: -121.881074,
};

const Map = ({ origin, destination, newRequest, requestHandled }) => {
  const [response, setResponse] = useState(null);
  const directionsCallback = (response) => {
    requestHandled();

    if (response === null) {
      return;
    }

    if (response.status === "OK") {
      setResponse(response);
    } else {
      setResponse(null);
    }
  };

  return (
    <React.Fragment>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {newRequest && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        )}
        {response !== null && (
          <DirectionsRenderer
            directions={response}
            panel={document.getElementById("panel")}
          />
        )}
        <div id="panel"></div>
      </GoogleMap>
    </React.Fragment>
  );
};

export default Map;
