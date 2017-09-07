
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
	} else if (urlData.pathname === '/calculator') {
		var queryData = querystring.parse(urlData.query);
		var op = queryData.op,
			n1 = parseInt(queryData.n1, 10),
			n2 = parseInt(queryData.n2, 10),
			result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}
});
server.listen(8080);

