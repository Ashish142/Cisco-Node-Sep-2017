var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tasks/index');
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
})

module.exports = router;
