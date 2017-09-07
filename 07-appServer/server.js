var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var server = http.createServer(function(req, res){
	var urlData = url.parse(req.url);
	if (urlData.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var queryData = querystring.parse(urlData.query);
	var op = queryData.op,
		n1 = parseInt(queryData.n1, 10),
		n2 = parseInt(queryData.n2, 10),
		result = calculator[op](n1, n2);
	res.write(result.toString());
	res.end();
});
server.listen(8080);