var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	if (req.urlData.pathname === '/calculator' && req.method === 'GET') {
		var calculatorData = querystring.parse(req.urlData.query);
		var op = calculatorData.op,
			n1 = parseInt(calculatorData.n1, 10),
			n2 = parseInt(calculatorData.n2, 10),
			result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (req.urlData.pathname === '/calculator' && req.method === 'POST') {
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var calculatorData = querystring.parse(rawData);
			var op = calculatorData.op,
				n1 = parseInt(calculatorData.n1, 10),
				n2 = parseInt(calculatorData.n2, 10),
				result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
		});
	}
}