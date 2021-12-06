import React from "react";
import Select from 'react-select';
import cdata from "./cardummydata.json"
import axios from "axios";
import { Navbar } from "./index";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
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
            sum: 0,
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
              const SumValue = this.state.bookings && this.state.bookings.reduce((a, v) => a + v.cost, 0)
              var rounded = SumValue.toFixed(2);
              const total = "$"+rounded;
              console.log("SumValue:")
            this.setState({
                sum: total,
              });
            console.log(this.state.sum)
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
        return <div className="container" >
            
            <div > <Navbar /> </div>
            <div className="base-container mb-4 py-5" >
            <h1 className="header ">RideHistory</h1>
            <hr className="solid"/>
            <div className="content py-5">

                <Table hover responsive="lg">
                    <tr>
                        <th>Booking ID</th>
                        <th>Username</th>
                        <th>Car ID</th>
                        <th>Starting Location</th>
                        <th>Destination</th>
                        <th>Trip Status</th>
                        <th>Cost</th>
                        

                    </tr>
                <tbody>
                    {this.state.bookings.map((booking)=>(
                        
                        <tr onClick ={()=>handleRoute(booking.booking_id, booking.trip_status)}>
                            <td>{booking.booking_id}</td>
                            <td>{booking.username}</td>
                            <td>{booking.car_id}</td>
                            <td>{booking.curr_location}</td>
                            <td>{booking.destination}</td>
                            <td>{booking.trip_status}</td>
                            <td>${booking.cost}</td>
                            
                        </tr>
                        
                    ))}

                </tbody>
                </Table>

                
            </div>
            </div>
           
            <div className="container"><h2>Total Cost Charged: {this.state.sum}</h2></div>
            <br></br>
            <div className="footer">
                
            
            </div>
            
            <div className="pads">
                
            </div>
            
        </div>
        
    }
}