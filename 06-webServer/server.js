var http = require('http'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req, res){
	var resourceName = req.url === '/' ? '/index.html' : req.url;
	var resource = path.join(__dirname, resourceName);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resource).pipe(res);
});
server.listen(8080);