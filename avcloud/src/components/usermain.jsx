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
  

export class UserMain extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            
            cars: cdata,
            selectedOption: 0,
            adduData: {
                booking_id: '',
                username: '',
                car_id: '',
                curr_location:'',
                destination:'',
                trip_status:'',
                cost:''
            }
        }
        axios.get('cars').then((response) => {
               
            console.log(response.data);

            this.setState({
                cars: response.data
              });
        });
        

    }
    handleChange = (selectedOption2) => {
        
        this.state.selectedOption = selectedOption2.value ;
        console.log(this.state.selectedOption)
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

              axios.post('bookings', {
                  
                booking_id: Math.floor(Math.random() * 9999),
                username: localStorage.getItem('token'),
                car_id: this.state.selectedOption,
                curr_location: this.state.adduData.curr_location,
                destination: this.state.adduData.destination,
                trip_status: 'active',
                cost: Math.floor(Math.random() * 20+10)

              }).then((response) => {
                 
                  
                      console.log(response);
                      this.props.history.push("/ridehistory");
                 
              });

        };



        const options2 = this.state.cars.map((car)=>(
            ({label: car.car_id +" : "+ car.car_type, value: car.car_id})
            ))


        

        return <div className="base-container" >
            <h1 className="header">User</h1>
            <form onSubmit={handleAddFormSubmit}>
            <div className="content">
            
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="StartingLocation">Starting Location</label>
                        <input type ="text" name="curr_location" placeholder ="address" onChange={handleAddFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Destination</label>
                        <input type ="text" name="destination" placeholder ="address" onChange={handleAddFormChange}/>
                    </div>
                </div>
           


                <Select onChange= {this.handleChange} options={options2} />
                <div className="footer">
                    <button type="submit" className="btn">Rent</button>
                </div>
            </div>
            </form>

            
            <div className="pads">
                <Link to="/"> logout </Link>
            </div>
            <div className="pads">
                <Link to="/ridehistory"><button type="button" className="btn2">Ride History</button></Link>
            </div>

        </div>
        
    }
}