var fs = require('fs');

fs.readFile('./sample.txt', {encoding : 'utf8'}, function(error, fileConents){
	if (error){
		console.log(error);
		return;
	}
	console.log(fileConents);	
});
