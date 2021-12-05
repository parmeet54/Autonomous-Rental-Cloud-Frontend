var db = require('../../config/db.config');

var Car = function(car){
    this.car_id = car.car_id;
    this.status = car.status;
    this.car_type = car.car_type;
}

//get all cars
Car.getAllCars = (result) => {
    db.query('SELECT * FROM cars', (err, res) => {
        if(err){
            console.log('Error while fetching cars', err);
            result(null, err);
        }
        else{
            console.log('Cars fetched successfully');
            result(null, res);
        }
    })
}

// get Car by ID
Car.getCar = (car_id, result) => {
    db.query('SELECT * FROM cars WHERE car_id=?', car_id , (err, res) => {
        if(err){
            console.log('Error while fetching Car by car_id', err);
            result(null, err);
        }
        else{
            console.log('Car fetched successfully');
            result(null, res);
        }
    })
}


// create new car
Car.createCar = (carReqData, result) => {
    db.query('INSERT INTO cars SET ?', carReqData, (err, res) => {
        if(err){
            console.log('Error while creating car', err);
            result(null, err);
        }
        else{
            result(null, {status: true, message: 'Car created'});
        }
    })
}


// update status by car_id
Car.updateStatus = (car_id, carReqData, result) => {
    db.query('UPDATE cars SET status = ? WHERE car_id=?', 
    [carReqData.status,  car_id], 
    (err, res) => {
        if(err){
            console.log('Error while updating car status', err);
            result(null, err);
        }
        else{
            console.log("Car Status  updated successfully");
            result(null, {status: true, message:"Car status udated"});
        }
    })
}


// update car
Car.updateCar = (car_id, carReqData, result) => {
    db.query('UPDATE cars SET car_id = ?, status = ?, car_type = ? WHERE car_id=?', 
    [carReqData.car_id , carReqData.status, carReqData.car_type, car_id], 
    (err, res) => {
        if(err){
            console.log('Error while updating car', err);
            result(null, err);
        }
        else{
            console.log("car  updated successfully");
            result(null, {status: true, message:"Car udated"});
        }
    })
}



// Delete car
Car.deleteCar = (car_id, result) =>{
    db.query('DELETE FROM cars WHERE car_id = ? ', [car_id], (err,res) =>{
        if(err){
            console.log('Error Deleting car', err);
            result(null, err);
        }
        else{
            result(null, {status: true, message:"Car deleted"});
        }
    });
}

module.exports = Car;