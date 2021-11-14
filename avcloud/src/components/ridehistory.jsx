import React from "react";
import Select from 'react-select';
import cdata from "./cardummydata.json"
import axios from "axios";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";
  

export class RideHistory extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            bookings: cdata,
        }
        console.log(localStorage.getItem('token'));
        axios.get('bookings').then((response) => {
               
            console.log(response.data);


        });
        axios.get('bookings/userbookings/'+ localStorage.getItem('token')).then((response) => {
               
            console.log(response.data);
            console.log(localStorage.getItem('token'));
            this.setState({
                bookings: response.data
              });

        });
    }
    
    
    render() {
        const handleRoute =(bookingId,status) => {
            if(status=="active"){
                this.props.history.push("/sensorviewactive/"+bookingId);
            }
            else{
                this.props.history.push("/sensorviewcompleted/"+bookingId);
            }
  
        }
        return <div className="base-container" >
            <h1 className="header">RideHistory</h1>
            <div className="content">

                <table>
                    <tr>
                        <th>Booking ID</th>
                        <th>Username</th>
                        <th>Car ID</th>
                        <th>Starting Location</th>
                        <th>Destination</th>
                        <th>Trip Status</th>
                        <th>Cost</th>
                        <th>Action</th>

                    </tr>
                <tbody>
                    {this.state.bookings.map((booking)=>(
                        <tr>
                            <td>{booking.booking_id}</td>
                            <td>{booking.username}</td>
                            <td>{booking.car_id}</td>
                            <td>{booking.curr_location}</td>
                            <td>{booking.destination}</td>
                            <td>{booking.trip_status}</td>
                            <td>{booking.cost}</td>
                            <td><button type ="button" onClick ={()=>handleRoute(booking.booking_id, booking.trip_status)}>More Info</button></td>
                        </tr>
                    ))}

                </tbody>
                </table>

                
            </div>
            <div className="footer">
            <Link to="/usermain"><button type="button" className="btn">Back</button></Link>
            </div>
            <div className="pads">
                <Link to="/"> logout </Link>
            </div>

        </div>
        
    }
}