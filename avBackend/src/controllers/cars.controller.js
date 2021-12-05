const CarModel = require('../models/cars.model')



// get all cars 
exports.getCarsList = (req, res) =>{
    //console.log("All cars list");
    CarModel.getAllCars((err, cars) => {
        console.log('cars here');
        if(err)
        res.send(err);
    
        console.log('cars:', cars)
        res.send(cars)
    })
}

// get cars by id
exports.getCar = (req, res) =>{
    CarModel.getCar(req.params.car_id, (err,car) => {
        if(err)
        res.send(err);

        console.log('Car by ID: ', car)
        res.send(car)
    })
}

// create car
exports.createCar = (req, res) => {
    const carReqData= new CarModel(req.body);

    CarModel.createCar(carReqData, (err,car) => {
        if(err)
        res.send(err);

        console.log('Car Created successfully', car)
        res.send(car)
    })
    console.log("Request Data", req.body);
}


// update status by car_id
exports.updateStatus = (req, res) => {
    const carReqData= new CarModel(req.body);
    console.log("carReqData update", carReqData);

    CarModel.updateStatus(req.params.car_id, carReqData, (err,car) => {
        if(err)
        res.send(err);

        console.log('Car Status updated successfully', car)
        res.send(car)
    })
    console.log("Request Data", req.body);
}


// update car by car_id
exports.updateCar = (req, res) => {
    const carReqData= new CarModel(req.body);
    console.log("carReqData update", carReqData);

    CarModel.updateCar(req.params.car_id, carReqData, (err,car) => {
        if(err)
        res.send(err);

        console.log('Car Updated successfully', car)
        res.send(car)
    })
    console.log("Request Data", req.body);
}


// delete car by car_id
exports.deleteCar = (req, res) => {
    CarModel.deleteCar(req.params.car_id, (err, car) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "Car deleted"});
    });
}