import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import logo from "../images/logo.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
};

const getRandomValue = () => {
  const min = 0;
  const max = 255;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ServiceMain = ({ signOut }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState("");
  const [carStatus, setCarStatus] = useState("");
  const [carType, setCarType] = useState("");
  const [carMessage, setCarMessage] = useState("");

  const [numBookings, setNumBookings] = useState(0);
  const [numActiveCars, setNumActiveCars] = useState(0);
  const [numInactiveCars, setNumInactiveCars] = useState(0);
  const [carStatusData, setCarStatusData] = useState(null);
  const [carTypeData, setCarTypeData] = useState(null);

  useEffect(() => {
    axios.get("users").then((response) => {
      setUsers(response.data);
    });
    axios.get("cars").then((response) => {
      setCars(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("cars").then((response) => {
      const cars = response.data;
      const numActive = cars.filter((car) => car.status === "active").length;
      const numInactive = cars.filter(
        (car) => car.status === "inactive"
      ).length;
      setNumActiveCars(numActive);
      setNumInactiveCars(numInactive);
      setCarStatusData({
        labels: ["Active", "Inactive"],
        datasets: [
          {
            label: "Autonomous Vehicle Statuses",
            data: [numActive, numInactive],
            backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
            borderColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
            borderWidth: 1,
          },
        ],
      });

      const typeCount = {};
      for (const car of cars) {
        const type = car.car_type;
        if (type in typeCount) {
          typeCount[type]++;
        } else {
          typeCount[type] = 1;
        }
      }
      const types = Object.keys(typeCount);
      const counts = Object.values(typeCount);
      const colors = types.map((_) => getRandomColor());
      setCarTypeData({
        labels: types,
        datasets: [
          {
            label: "Autonomous Vehicle Types",
            data: counts,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      });
    });
    axios.get("bookings").then((response) => {
      setNumBookings(response.data.length);
    });
  }, [users, cars]);

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      name: name,
      password: password,
      address: address,
      city: city,
      credit_card: cardnumber,
    };
    axios.post("users", newUser).then((response) => {
      if (response.data.errno === 1062) {
        setUserMessage("Username taken");
      } else {
        setUserMessage("");
        setUsers([...users, newUser]);
      }
    });
  };

  const handleDeleteUser = (userId) => {
    const usersCopy = [...users];
    const index = usersCopy.findIndex((user) => user.username === userId);
    usersCopy.splice(index, 1);
    setUsers(usersCopy);
    axios
      .delete("users/" + userId, {
        userId,
      })
      .then((response) => {});
  };

  const handleAddCar = (e) => {
    e.preventDefault();
    const newCar = {
      car_id: carId,
      status: carStatus,
      car_type: carType,
    };
    axios.post("cars", newCar).then((response) => {
      if (response.data.errno === 1062) {
        setCarMessage("Car ID taken");
      } else {
        setCarMessage("");
        setCars([...cars, newCar]);
      }
    });
  };

  const handleDeleteCar = (carId) => {
    const carsCopy = [...cars];
    const index = carsCopy.findIndex((car) => car.id === carId);
    carsCopy.splice(index, 1);
    setCars(carsCopy);
    axios
      .delete("cars/" + carId, {
        carId,
      })
      .then((response) => {});
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col>
          <div className="text-center">
            <Image src={logo} className="logo" />
            <div className="mb-5">
              <h1 className="fw-bold">Admin Dashboard</h1>
              <h5>Hello {localStorage.getItem("token")}</h5>
              <Link to="/" onClick={signOut} className="navigation-link">
                Sign Out
              </Link>
            </div>
          </div>
          <div className="mb-5">
            <h3 className="fw-bold">Users</h3>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Card Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.address}</td>
                    <td>{user.city}</td>
                    <td>{user.credit_card}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.username)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form className="d-flex" onSubmit={handleAddUser}>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="^[a-zA-Z][a-zA-Z ,.'-]*$"
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="Email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="^[ -~]{6,}$"
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="Card Number"
                name="cardnumber"
                value={cardnumber}
                onChange={(e) => setCardNumber(e.target.value)}
                pattern="^\d{16}$"
                maxLength="16"
                className="me-1"
              />
              <Button type="submit">Add</Button>
            </Form>
            {userMessage !== "" && (
              <Alert variant="danger" className="mt-3">
                {userMessage}
              </Alert>
            )}
          </div>
          <div className="mb-5">
            <h3 className="fw-bold">Autonomous Vehicles</h3>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Car ID</th>
                  <th>Status</th>
                  <th>Car Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.car_id}>
                    <td>{car.car_id}</td>
                    <td>{car.status}</td>
                    <td>{car.car_type}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCar(car.car_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form className="d-flex" onSubmit={handleAddCar}>
              <Form.Control
                required
                type="text"
                placeholder="Car ID"
                name="car_id"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                pattern="^\d+$"
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="Status"
                name="status"
                value={carStatus}
                onChange={(e) => setCarStatus(e.target.value)}
                maxLength="254"
                className="me-1"
              />
              <Form.Control
                required
                type="text"
                placeholder="Car Type"
                name="car_type"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                maxLength="254"
                className="me-1"
              />
              <Button type="submit">Add</Button>
            </Form>
            {carMessage !== "" && (
              <Alert variant="danger" className="mt-3">
                {carMessage}
              </Alert>
            )}
          </div>
          <div className="mb-5">
            <h3 className="fw-bold">Statistics</h3>
            <h5>Total bookings: {numBookings}</h5>
            <h5>Registered users: {users.length}</h5>
            <h5>Registered autonomous vehicles: {cars.length}</h5>
            <h5>Active autonomous vehicles: {numActiveCars}</h5>
            <h5>Inactive autonomous vehicles: {numInactiveCars}</h5>
            <div className="d-flex" style={{ width: 300, height: 300 }}>
              {carStatusData && <Pie data={carStatusData} />}
              {carTypeData && <Pie data={carTypeData} />}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceMain;
