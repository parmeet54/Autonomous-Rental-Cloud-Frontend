import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";

export class Navbar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <nav className="Navbar">
            <h1><Link to='/usermain' className="nav-icon">AVRental</Link></h1>
        
        <ul className={this.props.isSensorView ? 'nav-menu-sensor-view' : 'nav-menu'}>
            
            <li><Link to='/usermain' className="nav-i">Rent Car</Link></li>
            <li><Link to='/ridehistory' className="nav-i">Ride History</Link></li>
            <li><Link to='/profile' className="nav-i">User Profile</Link></li>
            <li><Link to='/' className="nav-i">Log Out</Link></li>
            
        </ul>
        
    </nav>
    );
  }
}
