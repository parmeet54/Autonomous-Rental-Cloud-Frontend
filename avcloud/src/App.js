import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/login";
import Register from "./components/register";
import UserMain from "./components/usermain";
import RideHistory from "./components/ridehistory";
import Profile from "./components/profile";
import SensorViewCompleted from "./components/SensorViewCompleted/SensorViewCompleted";
import SensorViewActive from "./components/SensorViewActive/SensorViewActive";
import ServiceMain from "./components/servicemain";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("token");
    if (username !== null) {
      setIsSignedIn(true);
      axios.get("users/" + username).then((response) => {
        const user = response.data[0];
        setIsAdmin(user.is_admin === 1);
        setIsAuthenticating(false);
      });
    } else {
      setIsSignedIn(false);
      setIsAdmin(false);
      setIsAuthenticating(false);
    }
  }, []);

  const signIn = (username) => {
    localStorage.setItem("token", username);

    axios.get("users/" + username).then((response) => {
      const user = response.data[0];
      setIsSignedIn(true);
      if (user.is_admin === 1) {
        setIsAdmin(true);
        navigate("/servicemain");
      } else {
        setIsAdmin(false);
        navigate("/usermain");
      }
    });
  };
  const signOut = () => {
    localStorage.removeItem("token");
    setIsSignedIn(false);
    setIsAdmin(false);
  };

  if (isAuthenticating) {
    return "";
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isSignedIn ? (
            <Login signIn={signIn} />
          ) : isAdmin ? (
            <Navigate to="/servicemain" />
          ) : (
            <Navigate to="/usermain" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isSignedIn ? (
            <Register />
          ) : isAdmin ? (
            <Navigate to="/servicemain" />
          ) : (
            <Navigate to="/usermain" />
          )
        }
      />
      <Route
        path="/usermain"
        element={
          isSignedIn && !isAdmin ? (
            <UserMain signOut={signOut} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/servicemain"
        element={
          isSignedIn && isAdmin ? (
            <ServiceMain signOut={signOut} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/ridehistory"
        element={
          isSignedIn && !isAdmin ? (
            <RideHistory signOut={signOut} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isSignedIn && !isAdmin ? (
            <Profile signOut={signOut} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/sensorviewcompleted/:bookingId"
        element={
          isSignedIn && !isAdmin ? <SensorViewCompleted /> : <Navigate to="/" />
        }
      />
      <Route
        path="/sensorviewactive/:bookingId"
        element={
          isSignedIn && !isAdmin ? <SensorViewActive /> : <Navigate to="/" />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
