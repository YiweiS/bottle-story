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

/* GET throw a new bottle. */
router.get('/bottles/throw', function(req, res, next) {
    res.render('throwBottle');
});

/* POST throw a new/edited bottle. */
router.post('/bottles/throw', function(req, res, next) {
    var sql = null;
    if (req.body.bottleid) {
        sql = `UPDATE bottles SET bottleImage = '${ req.body.message }' WHERE bottleid = ${req.body.bottleid}`;
    } else {
        sql = `INSERT INTO bottles VALUES ( null, '${ req.body.message }', '2017-04-03 00:00:00', 0)`;
    }
    
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        res.send('Bottle thrown');
    });
});

/* GET display random bottle. */
router.get('/bottles/pickup', function(req, res, next) {
    var sql = 'SELECT * FROM bottles ORDER BY RAND() LIMIT 1';
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            var bottle = results[0];
            res.render('pickBottle', { 
                bottleid: bottle.bottleid,
                bottleimage: bottle.bottleimage 
            });
        } else {
            res.redirect('/');
        }
    });
});


module.exports = router;
