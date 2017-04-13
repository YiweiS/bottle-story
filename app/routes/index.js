var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 'password',
    database: 'bottlestory'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Bottle Story'
    });
});

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

router.get('/bottles/new', function(req, res, next) {

    var sql = "INSERT INTO bottles VALUES ( null, 'welcome to bottles story', '2017-04-03 00:00:00', 0)";

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;

        console.log(results);

        res.send('New bottle added');
    });
});





router.get('/bottles/throw', function(req, res, next) {
    res.render('throwBottle');
});

router.post('/bottles/throw', function(req, res, next) {
    var sql = `INSERT INTO bottles VALUES ( null, '${ req.body.message }', '2017-04-03 00:00:00', 0)`;

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        res.send('Bottle thrown');
    });
});



router.get('/bottles/new/pick', function(req, res, next) {

    var sql = "INSERT INTO bottles VALUES ( null, 'pick a bottle', '2017-04-03 00:00:00', 0)";

    connection.query(sql, function(error, results, fields) {
        if (error) throw error;

        console.log(results);

        res.send('Pick a bottle');
    });
});



module.exports = router;
