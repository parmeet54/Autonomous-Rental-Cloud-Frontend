import React from "react";

import udata from "./dummydata.json"
import cdata from "./cardummydata.json"
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";
  

export class ServiceMain extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            users: udata,
            adduData: {
                name: '',
                username: '',
                password: '',
                address:'',
                city:'',
                cardnumber:'',
                email:''
            } ,
            cars: cdata,
            addcData: {
                
                car_id:'',
                status:'',
                car_type:''
            }  
        };
        axios.get('users').then((response) => {
               
            console.log(response.data);

            this.setState({
                users: response.data
              });
        });
        axios.get('cars').then((response) => {
               
            console.log(response.data);

            this.setState({
                cars: response.data
              });
        });
    }
    
    
    render() {
   

        
        const handleAddFormChange = (event) =>{
            event.preventDefault();

            const fieldname = event.target.getAttribute('name');
            const fieldvalue = event.target.value;

            const newformdata = this.state.adduData;
            newformdata[fieldname] = fieldvalue;

            this.state.adduData = {...this.state.adduData, ...newformdata};
            

        };

        const handleAddFormSubmit = (event) => {
            event.preventDefault();

            const newUser = {
                
                username: this.state.adduData.username,
                name: this.state.adduData.name,
                password: this.state.adduData.password,
                address: this.state.adduData.address,
                city: this.state.adduData.city,
                credit_card: this.state.adduData.cardnumber,
                email: this.state.adduData.email
            };
            
            this.setState({
                users: [...this.state.users, newUser]
              });
              axios.post('users', {
                  
                username: this.state.adduData.username,
                name: this.state.adduData.name,
                password: this.state.adduData.password,
                address: this.state.adduData.address,
                city: this.state.adduData.city,
                credit_card: this.state.adduData.cardnumber,
                email: this.state.adduData.email
                  
              }).then((response) => {
                 
                  
                      console.log(response);
                 
              });

        };

        const handleDelete =(userId) => {
            const newUsers = [...this.state.users];

            const index = this.state.users.findIndex((user)=> user.username ===userId);
            newUsers.splice(index, 1);
            
            this.setState({
                users: newUsers
              });
              
              axios.delete('users/'+userId, {
                  
                userId

              }
              ).then((response) => {
 
                      console.log(response);
                 
              });
        }


        const handleAddFormChange2 = (event) =>{
            event.preventDefault();

            const fieldname = event.target.getAttribute('name');
            const fieldvalue = event.target.value;

            const newformdata = this.state.addcData;
            newformdata[fieldname] = fieldvalue;

            this.state.addcData = {...this.state.addcData, ...newformdata};
            

        };

        const handleAddFormSubmit2 = (event) => {
            event.preventDefault();
            
            const newCar = {
                
                car_id: this.state.addcData.car_id,
                status: this.state.addcData.status,
                car_type: this.state.addcData.car_type,
            };
            console.log(this.state.addcData.car_id);
            
            this.setState({
                cars: [...this.state.cars, newCar]
              });
              axios.post('cars', {
                  
                car_id: this.state.addcData.car_id,
                status: this.state.addcData.status,
                car_type: this.state.addcData.car_type,
                  
              }).then((response) => {
                 
                  
                      console.log(response);
                 
              });
        };
        const handleDelete2 =(carId) => {
            const newCars = [...this.state.cars];

            const index = this.state.cars.findIndex((car)=> car.id === carId);
            newCars.splice(index, 1);
            
            this.setState({
                cars: newCars
              });
              axios.delete('cars/'+carId, {
                  
                carId

              }
              ).then((response) => {
 
                      console.log(response);
                 
              });
        }


        return <div className="base-container container-s">
            <h1 className="header mb-4 py-5">Service</h1>
            <h2 className="header">Users</h2>
            <div className="content">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Card Number</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                <tbody>
                    {this.state.users.map((user)=>(
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.address}</td>
                            <td>{user.city}</td>
                            <td>{user.credit_card}</td>
                            <td>{user.email}</td>
                            <td><button type ="button" className="btn2" onClick ={()=>handleDelete(user.username)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button></td>
                        </tr>
                    ))}

                </tbody>
                </Table>

                <h3>Add User</h3>
                <form onSubmit={handleAddFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input type ="text" name="name" placeholder ="fullname" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username"></label>
                        <input type ="text" name="username" placeholder ="username" onChange={handleAddFormChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input type ="password" name="password" placeholder ="password" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address"></label>
                        <input type ="text" name="address" placeholder ="address" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city"></label>
                        <input type ="text" name="city" placeholder ="city" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardnumber"></label>
                        <input type ="text" name="cardnumber" placeholder ="cardnumber" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input type ="text" name="email" placeholder ="email" onChange={handleAddFormChange}/>
                    </div>
                        <button type="submit">Add</button>
                </form>
                </div>

                <text>
                <br />
                <br />
                </text>

                <h2 className="header">Autonomous Vehicles</h2>
                <div className="content">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Car ID</th>
                        <th>Status</th>
                        <th>Car Type</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                <tbody>
                    {this.state.cars.map((car)=>(
                        <tr>
                            <td>{car.car_id}</td>
                            <td>{car.status}</td>
                            <td>{car.car_type}</td>
                            <td><button type ="button" className="btn2" onClick ={()=>handleDelete2(car.car_id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button></td>
                        </tr>
                    ))}

                </tbody>
                </Table>

                <h3>Add Cars</h3>
                
                <form className="center" onSubmit={handleAddFormSubmit2}>
                   
                    <div className="form-group">
                        <label htmlFor="username"></label>
                        <input type ="text" name="car_id" placeholder ="Car ID" onChange={handleAddFormChange2}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status"></label>
                        <input type ="text" name="status" placeholder ="status" onChange={handleAddFormChange2}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Car Type"></label>
                        <input type ="text" name="car_type" placeholder ="Car Type" onChange={handleAddFormChange2}/>
                    </div>
 
                        <button type="submit">Add</button>
                </form>
                
                </div>
 
                <div className="pads">
                    <Link to="/"> logout </Link>
                </div>

        </div>
        
    }
}