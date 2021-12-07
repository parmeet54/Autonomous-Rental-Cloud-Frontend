const UserModel = require('../models/user.model')


// get all users 
exports.getUsersList = (req, res) =>{
    //console.log("All users list");
    UserModel.getAllUsers((err, users) => {
        console.log('Users here');
        if(err)
        res.send(err);
    
        console.log('Users:', users)
        res.send(users)
    })
}

// get user by username
exports.getUser = (req, res) =>{
    UserModel.getUser(req.params.username, (err,user) => {
        if(err)
        res.send(err);

        console.log('User by username: ', user)
        res.send(user)
    })
}

// create user
exports.createUser = (req, res) => {
    const userReqData= new UserModel(req.body);

    UserModel.createUser(userReqData, (err,user) => {
        if(err)
        res.send(err);

        console.log('User Created successfully', user)
        res.send(user)
    })
    console.log("Request Data", req.body);
}

// update user by username
exports.updateUser = (req, res) => {
    const userReqData= new UserModel(req.body);
    const pass = req.body.password;
    console.log("userReqData update", userReqData);

    if(pass == ""){
        UserModel.updateUserNoPw(req.params.username, userReqData, (err,user) => {
            if(err)
            res.send(err);
    
            console.log('User Updated successfully', user)
            res.send(user)
        })
    }
    else{
        UserModel.updateUser(req.params.username, userReqData, (err,user) => {
            if(err)
            res.send(err);
    
            console.log('User Updated successfully', user)
            res.send(user)
        })

    }
    
    console.log("Request Data", req.body);
}



// delete user by username
exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.username, (err, user) =>{
        if(err)
        res.send(err);

        res.json({success: true, message: "User deleted"});
    });
}
