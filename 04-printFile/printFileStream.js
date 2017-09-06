var fs = require('fs');

var stream = fs.createReadStream('./calculator.dat', {encoding : 'utf8'});

var readCount = 0;

stream.on('data', function(chunk){
	++readCount;
	console.log(chunk);	
});

stream.on('error', function(err){
	console.log(err);
});

stream.on('end', function(){
	console.log('readCount = ', readCount);
});


