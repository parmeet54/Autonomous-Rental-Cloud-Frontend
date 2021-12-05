const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path =  require("path")
const mongoose = require("mongoose");
require("dotenv").config();

const router = express.Router();
var db = require("./config/db.config");

// Express setup
const app = express();

app.use(cors());

//app.use(bodyParser.urlencoded({encoded: false}))
//app.use(bodyParser.json())

// parse request data content type application/x-www-form-rulencoded
app.use(express.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(express.json());

// Server Port
const port = process.env.PORT || 5000;


// Root route
// app.get("/", (req, res) => {
//   res.send("Connected to Server on port: 5000");
// });

// import user routes
const userRoutes = require("./src/routes/user.route");

// get user routes
app.use("/users", userRoutes);

// import car routes
const carRoutes = require("./src/routes/cars.route");

// get car routes
app.use("/cars", carRoutes);

// import car routes
const bookingRoutes = require("./src/routes/booking.route");

// get car routes
app.use("/bookings", bookingRoutes);

// sensor routes
const sensorRoutes = require("./src/routes/sensors.route");
app.use("/api/sensors", sensorRoutes);

// User Login
/**
 * POST /login/
 */
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
  console.log(username, password);
});



// Serving frontend
app.use(express.static(path.join('/home/ec2-user/Frontend/dashboard-frontend/avcloud/build/')));


app.get('/*', (req, res) => {
  res.sendFile(path.join('/home/ec2-user/Frontend/dashboard-frontend/avcloud/build/','index.html'));
});



// Listen to port
// connect to mongodb cluster, then start server
mongoose
  .connect(process.env.MONGO_CONNECTION_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log("Backend is running at port:", port);
    });
  })
  .catch(err => {
    console.error("Failed to connect to mongo database: ", err);
  });
