// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sal_staging_public',
  password: 'root'
});

connection.connect(()=>{
    console.log('connection db successfull')
})

module.exports = connection;