const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const mysqlConnection = require("./database");

let app = express();
app.use(bodyParser.json());

app.get("/customer", (req, rep) => {
    mysqlConnection.query("Select * from customer", (err, rows) => {
        if (err) {
            console.log(err);
            rep.send("Some error occured");
        } else {
            rep.send(rows);
        }
    })
});

app.listen(3000);