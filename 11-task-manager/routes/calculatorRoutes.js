var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a form for calculator');
  res.render('calculator');
});

module.exports = router;
