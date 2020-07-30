const express = require("express");
const bodyParser = require("body-parser");

var cors = require('cors');

const finStatRouter = require("./routes/finStatements");

let app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/finstat", finStatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(3000);
