import React from "react";

import "./App.scss";
import {
  Login,
  Register,
  UserMain,
  ServiceMain,
  RideHistory,
  Profile,
} from "./components/index";
import SensorViewCompleted from "./components/SensorViewCompleted/SensorViewCompleted";
import SensorViewActive from "./components/SensorViewActive/SensorViewActive";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/usermain" component={UserMain}></Route>
          <Route path="/servicemain" component={ServiceMain}></Route>
          <Route path="/ridehistory" component={RideHistory}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route
            exact
            path="/sensorviewcompleted/:booking_id"
            component={SensorViewCompleted}
          ></Route>
          <Route
            exact
            path="/sensorviewactive/:booking_id"
            component={SensorViewActive}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
