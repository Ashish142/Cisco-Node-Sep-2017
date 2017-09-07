var path = require('path'),
	fs = require('fs');
	
var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.json'];
function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) !== -1;
}
module.exports = function(req, res){
	var resourceName = req.urlData.pathname === '/' ? '/index.html' : req.urlData.pathname;
	if (isStatic(resourceName)){
		var resource = path.join(__dirname, resourceName);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		//fs.createReadStream(resource).pipe(res);
		var stream = fs.createReadStream(resource);
		stream.on('data', function(chunk){
			console.log('[@serveStatic] - serving one chunk of data');
			res.write(chunk);
		});
		stream.on('end', function(chunk){
			console.log('[@serveStatic] - serving end of stream');
			res.end();
		});
	}
}