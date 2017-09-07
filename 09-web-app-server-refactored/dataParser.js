var url = require('url');

module.exports = function(req, res, next){
	req.urlData = url.parse(req.url);
	next();
}