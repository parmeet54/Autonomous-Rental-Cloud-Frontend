import React from "react";
import axios from "axios";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

  

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            usernameL: "",
            passwordL: ""
        };
    }
    
    render() {
        
        const login = (event) => {
            event.preventDefault();

            axios.post('login', {
                
                    username : this.state.usernameL,
                    password : this.state.passwordL,
                
            }).then((response) => {
               
                if(response.data.message){
                    console.log(response);
                }
                else{
                    console.log(this.state.usernameL)
                    localStorage.setItem('token', this.state.usernameL);

                    
                    if(this.state.usernameL=="admin"){
                        this.props.history.push("/servicemain");
                    }
                    else{
                        this.props.history.push("/usermain");
                        console.log("im in");
                        
                    }
                }
                

            });

        }
        return <div className="base-container container" ref={this.props.containerRef}>
            <h1 className="header mb-4 py-5">Login</h1>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type ="text" name="username" placeholder ="username" onChange={(e) =>{this.state.usernameL = e.target.value}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type ="password" name="password" placeholder ="password" onChange={(e) =>{this.state.passwordL = e.target.value}}/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn" onClick={login} >Submit</button>
            </div>
            
            
                <Link to="register"> register </Link>
                
              
            
        </div>
    }
}