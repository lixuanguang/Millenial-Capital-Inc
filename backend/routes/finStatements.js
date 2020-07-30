const express = require("express");
const connection = require("../database");

finStatRouter = express.Router();

// to run python codes
let { PythonShell } = require("python-shell");

// localhost:3000/finstat/
finStatRouter.get("/", (req, res) => {
  connection.query("select * from finstatements", (err, rows) => {
    if (err) {
      console.log(err);
      res.send("Some error occurred");
    } else {
      res.send(rows);
    }
  });
});

// localhost:3000/finstat/stockTicker
finStatRouter.get("/:value", (req, res) => {
  connection.query(
    `select * from finstatements where stock = '${req.params.value}'`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Some error occurred");
      } else {
        res.send(rows);
      }
    }
  );
});

// localhost:3000/finstat/recommendations/stockTicker
finStatRouter.get("/recommendations/:value", (req, res) => {
  connection.query(
    `select * from finstatements where stock = '${req.params.value}';
    select * from finstatements2 where stock = '${req.params.value}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Some error occurred");
      } else {
        sendReceivePyData(rows, "runCompute.py", res, "recommendations");
      }
    }
  );
});

// localhost:3000/finstat/actions/stockTicker
finStatRouter.get("/actions/:value", (req, res) => {
  connection.query(
    `select * from finstatements where stock = '${req.params.value}';
    select * from finstatements2 where stock = '${req.params.value}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Some error occurred");
      } else {
        sendReceivePyData(rows, "runCompute.py", res, "actions");
      }
    }
  );
});

// localhost:3000/finstat/price/stockTicker
finStatRouter.get("/price/:value", (req, res) => {
  connection.query(
    `select * from finstatements where stock = '${req.params.value}';
    select * from finstatements2 where stock = '${req.params.value}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Some error occurred");
      } else {
        sendReceivePyData(rows, "runCompute.py", res, "price");
      }
    }
  );
});

// localhost:3000/finstat/calendar/stockTicker
finStatRouter.get("/calendar/:value", (req, res) => {
  connection.query(
    `select * from finstatements where stock = '${req.params.value}';
    select * from finstatements2 where stock = '${req.params.value}';`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("Some error occurred");
      } else {
        sendReceivePyData(rows, "runCompute.py", res, "calendar");
      }
    }
  );
});

// function to allow python to parse the data
function sendReceivePyData(data, scriptName, res, required) {

  let options = {
    pythonPath: '/Users/lxg/Documents/NUS Fintch Program/Developers Toolkit Middleware/app/backend/venv/bin/python',
    scriptPath: '/Users/lxg/Documents/NUS Fintch Program/Developers Toolkit Middleware/app/backend/scripts',
    args: [required]
  };

  let pyshell = new PythonShell(scriptName, options);

  // sends a message to the Python script via stdin
  pyshell.send(JSON.stringify(data));

  pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    res.send(message);
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished");
  });
}

module.exports = finStatRouter;
