var db = require('../../config/db.config');

var User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.address = user.address;
    this.city = user.city;
    this.credit_card = user.credit_card;
    
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
User.createUser = (userReqData, result) => {
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
User.updateUser = (username, userReqData, result) => {
    db.query('UPDATE users SET password = ?, name = ?, email = ?, address = ?, city = ?, credit_card = ? WHERE username=?', 
    [userReqData.password , userReqData.name , userReqData.email , userReqData.address , userReqData.city , userReqData.credit_card, username], 
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