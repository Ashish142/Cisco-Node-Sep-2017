var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	if (req.urlData.pathname === '/calculator') {
		var calculatorData = req.method === 'GET' ? req.query : req.body;
		var op = calculatorData.op,
			n1 = parseInt(calculatorData.n1, 10),
			n2 = parseInt(calculatorData.n2, 10),
			result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	}  else {
		next();
	}
}