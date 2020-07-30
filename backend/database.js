const mysql = require("mysql");

let params = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "NUSMoney",
  multipleStatements: true
};

mysqlConnection = mysql.createConnection(params);

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Failed to Connect");
  } else {
    console.log("Connection successful");
  }
});

module.exports = mysqlConnection;
