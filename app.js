const express = require('express');
const path = require('path');
const logger = require('morgan');
const assert = require('assert');
const CRUD = require("./CRUD");
const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;

const app = express();

const DB_URL = "http://localhost:27017";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));

//External API Example
app.get("/API/food/:name", function (req, res) {
    // CALL API HERE
    request("https://api.nal.usda.gov/ndb/search/?format=json&q=" + req.params.name + "&max=25&offset=0&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).list) {
                    res.send(JSON.parse(body).list.item);
                }
                else {
                    res.send([]);
                }
            }
        })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

//Post Example
/*
app.post("/API/myWeight/:userId/:value", function (req, res) {
    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertWeight(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), Number(req.params.value));
    });
});*/

module.exports = app;
