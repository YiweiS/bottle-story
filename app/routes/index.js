var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'clairegui',
    password: '',
    database: 'bottlestory'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* GET home page. */
router.get('/bottles', function(req, res, next) {

    connection.query('SELECT * FROM bottles', function(error, results, fields) {
        if (error) throw error;

        console.log(results);

        res.render('bottles', {
            'message': 'here is a message',
            'bottles': results
        });
    });
});

module.exports = router;
