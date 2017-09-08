var chalk = require('chalk');

module.exports = function(req, res, next){
	console.log(chalk.bold.red(req.method) + '\t' + chalk.blue(req.urlData.pathname));
	next();
};