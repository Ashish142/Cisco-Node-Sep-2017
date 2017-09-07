
var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.json'];
function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) !== -1;
}
var server = http.createServer(function(req, res){
	var urlData = url.parse(req.url);
	var resourceName = urlData.pathname === '/' ? '/index.html' : urlData.pathname;
	if (isStatic(resourceName)){
		var resource = path.join(__dirname, resourceName);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resource).pipe(res);
	} else if (urlData.pathname === '/calculator' && req.method === 'GET') {
		var calculatorData = querystring.parse(urlData.query);
		var op = calculatorData.op,
			n1 = parseInt(calculatorData.n1, 10),
			n2 = parseInt(calculatorData.n2, 10),
			result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlData.pathname === '/calculator' && req.method === 'POST') {
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
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}
});
server.listen(8080);