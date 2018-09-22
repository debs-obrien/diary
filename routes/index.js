var express = require('express');
var router = express.Router();
const date = require('../public/javascripts/getDate');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      date: date,
      msg: ' hello xxxxxxx'
  });
});

module.exports = router;
