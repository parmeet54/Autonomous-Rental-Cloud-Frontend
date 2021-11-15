import React from "react";
import axios, { Axios } from "axios";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";
  

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state ={
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
                      // Change page
                    this.props.history.push("/");

        };

        return <div className="base-container" >
            <h1 className="header">Register</h1>
            <form onSubmit={handleAddFormSubmit}>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type ="text" name="username" placeholder ="username" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type ="password" name="password" placeholder ="password" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type ="text" name="name" placeholder ="name" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type ="text" name="email" placeholder ="email" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type ="text" name="address" placeholder ="address" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type ="text" name="city" placeholder ="city" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardnumber">Card Number</label>
                        <input type ="text" name="cardnumber" placeholder ="cardnumber" onChange={handleAddFormChange}/>
                    </div>

                </div>
                <div className="footer">
                    <button type="submit" className="btn">Register</button>
                </div>
            </div>

            </form>
            <Link to="/"> Login </Link>
        </div>
        
    }
}