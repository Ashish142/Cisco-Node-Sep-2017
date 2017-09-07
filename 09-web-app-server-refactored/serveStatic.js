var path = require('path'),
	fs = require('fs');
	
var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.xml', '.json'];
function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) !== -1;
}
module.exports = function(staticResourcePath){
	return function(req, res, next){
		var resourceName = req.urlData.pathname === '/' ? '/index.html' : req.urlData.pathname;
		if (isStatic(resourceName)){
			var resource = path.join(staticResourcePath, resourceName);
			if (!fs.existsSync(resource)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resource).pipe(res);
		} else {
			next();
		}
	}
}