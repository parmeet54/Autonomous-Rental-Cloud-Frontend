const mysql = require('mysql');

// Setup mysql DB
const db = mysql.createConnection({
    user: 'admin',
    host: 'av-rds1.cwxznx25gadk.us-east-2.rds.amazonaws.com',
    password: 'cmpe281DB',
    database: 'av'

});

db.connect(function(err){
    if(err) throw err;
    console.log("Database connected!")
});

module.exports = db;