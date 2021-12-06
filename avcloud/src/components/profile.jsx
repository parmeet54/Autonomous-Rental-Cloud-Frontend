import React from "react";
import udata from "./dummydata.json"
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
  

export class Profile extends React.Component {

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
        };

        axios.get('users/'+ localStorage.getItem('token')).then((response) => {
               
            console.log(response.data);
            
            this.setState({
                users: response.data
              });
              console.log("here")
              console.log(localStorage.getItem('token'));  
            this.setState({
                adduData: {
                    name: response.data[0].name,
                    username: response.data[0].username,
                    password: response.data[0].password,
                    address: response.data[0].address,
                    city: response.data[0].city,
                    cardnumber:response.data[0].credit_card,
                    email: response.data[0].email
                } ,
            })
           
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
            

              axios.put('users/'+localStorage.getItem('token'), {
                  
                name: this.state.adduData.name,
                password: this.state.adduData.password,
                address: this.state.adduData.address,
                city: this.state.adduData.city,
                credit_card: this.state.adduData.cardnumber,
                email: this.state.adduData.email
                  
              }).then((response) => {
                 
                  
                      console.log(response);

                      window.location.reload();
                 
              });


        };
        const handleDelete =(userId) => {

              console.log(userId);
              axios.delete('users/'+userId, {
                  
                userId

              }
              ).then((response) => {
 
                      console.log(response);
                      //return to login
                      this.props.history.push("/");
                 
              });
        }


        return <div className="container" >
            <div > <Navbar /> </div>
            <div className="base-container py-5" >
            <h1 className="header ">User Profile</h1>
            <hr className="solid"/>
            <Form onSubmit={handleAddFormSubmit}>
            <div className="content">
                
                    
                    {this.state.users.map((user)=>(
                        <div >
                            <center className ="py-5"><svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></center>
                           
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label>Username </Form.Label>
                                
                                <Form.Control type ="text" name="username" Value={user.username} onChange={handleAddFormChange} readOnly/>
                                
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label >Password </Form.Label>
                                
                                <Form.Control type ="password" name="password"  onChange={handleAddFormChange}/>
                                
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label >Full Name</Form.Label>
                                
                                <Form.Control type ="text" name="name" Value={user.name} onChange={handleAddFormChange}/>
                                
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label >Email </Form.Label>
                                
                                <Form.Control type ="email" name="email" Value={user.email} onChange={handleAddFormChange}/>
                                
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label >Address </Form.Label>
                                
                                <Form.Control type ="text" name="address" Value={user.address} onChange={handleAddFormChange}/>
                                
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label >City </Form.Label>
                                
                                <Form.Control type ="text" name="city" Value={user.city} onChange={handleAddFormChange}/>
                                
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label >Card Number</Form.Label>
                                
                                <Form.Control type ="text" name="cardnumber" Value={user.credit_card} onChange={handleAddFormChange}/>
                                
                            </Form.Group>
    
                            <Button className="mt-3" variant ="primary" type ="submit">Edit Profile</Button>
                        </div>
                    ))}
                        
                        
                   
                    

                
                <div className="footer py-4">
                    <button type="submit" className="btn2" onClick ={()=>handleDelete(localStorage.getItem('token'))}>Delete Account</button>
                </div>
                <br></br>
            </div>
            
            </Form>
            
            </div>
        </div>
        
    }
}