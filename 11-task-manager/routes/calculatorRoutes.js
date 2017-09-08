var express = require('express');
var router = express.Router();
var calculator = require('../services/calculator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a form for calculator');
  var viewData = {
		n1 : 0,
		n2 : 0,
		op : '',
		result : ''
	};
  res.render('calculator', viewData);
});

router.post('/', function(req, res, next){
	var n1 = parseInt(req.body.n1, 10),
		n2 = parseInt(req.body.n2, 10),
		op = req.body.op;
	var result = calculator[op](n1, n2);
	var viewData = {
		n1 : n1,
		n2 : n2,
		op : op,
		result : result
	};
	res.render('calculator', viewData);

})
module.exports = router;
