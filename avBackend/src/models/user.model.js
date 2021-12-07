const bcrypt = require("bcrypt");
const salt = 10;

var db = require('../../config/db.config');

var User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.address = user.address;
    this.city = user.city;
    this.credit_card = user.credit_card;
    this.is_admin = user.is_admin;
}

//get all users
User.getAllUsers = (result) => {
    db.query('SELECT * FROM users', (err, res) => {
        if(err){
            console.log('Error while fetching Users', err);
            result(null, err);
        }
        else{
            console.log('Users fetched successfully');
            result(null, res);
        }
    })
}

// get user by username
User.getUser = (username, result) => {
    db.query('SELECT * FROM users WHERE username=?', username , (err, res) => {
        if(err){
            console.log('Error while fetching User by username', err);
            result(null, err);
        }
        else{
            console.log('User fetched successfully');
            result(null, res);
        }
    })
}


// create new user
User.createUser = async function (userReqData, result) {
    userReqData.password = await bcrypt.hash(userReqData.password, salt);
    db.query('INSERT INTO users SET ?', userReqData, (err, res) => {
        if(err){
            console.log('Error while creating user', err);
            result(null, err);
        }
        else{
            result(null, {status: true, message: 'User created'});
        }
    })
}


// update user
User.updateUser = async function (username, userReqData, result) {
   
    encryptedPass= await bcrypt.hash(userReqData.password, salt);
    db.query('UPDATE users SET password = ?, name = ?, email = ?, address = ?, city = ?, credit_card = ?, is_admin = ? WHERE username=?', 
    [encryptedPass, userReqData.name , userReqData.email , userReqData.address , userReqData.city , userReqData.credit_card, userReqData.is_admin, username], 
    (err, res) => {
        if(err){
            console.log('Error while updating user', err);
            result(null, err);
        }
        else{
            console.log("user  updated successfully");
            result(null, {status: true, message:"User udated"});
        }
    })
    
}

// update w/o password
User.updateUserNoPw = (username, userReqData, result) => {
    
    db.query('UPDATE users SET name = ?, email = ?, address = ?, city = ?, credit_card = ?, is_admin = ? WHERE username=?', 
    [userReqData.name , userReqData.email , userReqData.address , userReqData.city , userReqData.credit_card, userReqData.is_admin, username], 
    (err, res) => {
        if(err){
            console.log('Error while updating user', err);
            result(null, err);
        }
        else{
            console.log("user  updated successfully");
            result(null, {status: true, message:"User udated"});
    }
    })
    
}




// Delete user
User.deleteUser = (username, result) =>{
    db.query('DELETE FROM users WHERE username = ? ', [username], (err,res) =>{
        if(err){
            console.log('Error Deleting user', err);
            result(null, err);
        }
        else{
            result(null, {status: true, message:"User deleted"});
        }
    });
}



module.exports = User;