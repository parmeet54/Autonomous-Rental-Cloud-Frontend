import React from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

class Sensor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSensorValues: [],
      shouldPollSensors: false,
      currentKeys: [],
    };
  }

  getCurrentSensorData = () => {
    // if ride/booking completed, get all sensor information
    if (this.props.completed) {
      if (this.props.bookingId > 0) {
        const apiSensorURL = `/api/sensors/${this.props.sensor}/booking/${this.props.bookingId}`;
        axios
          .get(apiSensorURL)
          .then((res) => {
            if (res.data) {
              let newSensorValues = [...res.data];
              newSensorValues = newSensorValues.map((value) => {
                if (value) {
                  // remove __v key
                  delete value["__v"];
                  Object.keys(value).forEach((key) => {
                    // remove single and double quote
                    if (typeof value[key] === "string") {
                      value[key] = value[key].replace(/["']/g, "");
                    }
                  });
                }
                return value;
              });
              this.setState({
                currentSensorValues: newSensorValues,
              });
            }
            // get keys from results
            if (this.state.currentKeys.length === 0 && res.data.length > 0) {
              this.setState({
                currentKeys: Object.keys(res.data[0]),
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      // initiate polling for active booking
      this.getCurrentSensorDataPolling();
    }
  };

  // for active ride/booking, make continuous requests to track sensors
  getCurrentSensorDataPolling = () => {
    setInterval(() => {
      if (this.props.bookingId > 0) {
        const apiSensorURL = `/api/sensors/${this.props.sensor}/current/${this.props.bookingId}`;
        axios
          .get(apiSensorURL)
          .then((res) => {
            if (res.data) {
              let newSensorValues = [...this.state.currentSensorValues];
              // remove __v key
              delete res.data["__v"];
              Object.keys(res.data).forEach((key) => {
                // remove single and double quote
                if (typeof res.data[key] === "string") {
                  res.data[key] = res.data[key].replace(/["']/g, "");
                }
              });
              if (newSensorValues.length > 0) {
                // record found not the same as previous one
                if (res.data["_id"] !== newSensorValues[0]["_id"]) {
                  newSensorValues = [res.data, ...newSensorValues];
                }
              } else {
                // not same value, add new (initial)
                newSensorValues.push(res.data);
              }
              this.setState({
                currentSensorValues: newSensorValues,
              });
              // get keys of data
              if (this.state.currentKeys.length === 0) {
                this.setState({
                  currentKeys: Object.keys(res.data),
                });
              }
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }, 1000);
  };

  componentDidMount() {
    this.getCurrentSensorData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookingId !== this.props.bookingId) {
      this.getCurrentSensorData();
    }
  }
  render() {
    const tableRows = this.state.currentKeys.map((row) => {
      return (
        <th key={row + Math.random()}>
          {row === "booking_id"
            ? "Booking ID"
            : row === "_id"
            ? "ID"
            : row === "other_actor"
            ? "Other Actor"
            : row === "normal_impulse"
            ? "Normal Impulse"
            : row === "crossed_lane_markings"
            ? "Crossed Lane Markings"
            : row === "horizontal_angle"
            ? "Horizontal Angle"
            : row.charAt(0).toUpperCase() + row.slice(1)}
        </th>
      );
    });
    const tableResults = this.state.currentSensorValues.map((value) => {
      return (
        <tr key={value + Math.random()}>
          {this.state.currentKeys.map((currentKey) => {
            return (
              <td key={currentKey + Math.random()}>{value[currentKey]}</td>
            );
          })}
        </tr>
      );
    });
    return (
      <Table responsive striped hover>
        <thead>
          <tr>{tableRows}</tr>
        </thead>
        <tbody>{tableResults}</tbody>
      </Table>
    );
  }
}

export default Sensor;
