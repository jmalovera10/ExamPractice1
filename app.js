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

const DB_URL = "mongodb://localhost:27017";

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
app.get("/API/frequent/:hashtag", function (req, res) {
    // CALL API HERE

    request("https://www.instagram.com/explore/tags/"+req.params.hashtag+"/?__a=1",
        function (error, response, body) {
            if (error) {
                console.log(error);
                res.send(error);
                return;
            }
            MongoClient.connect(DB_URL, function (err, db) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                CRUD.insertSearch(db, (result) => {
                    db.close();
                }, req.params.hashtag);
            });
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body)) {
                    let top = JSON.parse(body);
                    res.send(top.graphql.hashtag.edge_hashtag_to_top_posts);
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

module.exports = app;
