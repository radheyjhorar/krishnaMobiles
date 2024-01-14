const mysql = require("mysql");
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'seller',
})

connect.connect((err) => {
  if (err) {
    console.warn("Error: ", err);
  } else {
    console.log("MySQL Connect successfully");
  }
})

module.exports = connect;