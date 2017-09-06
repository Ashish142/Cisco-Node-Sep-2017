var fs = require('fs');

var fileConents = fs.readFileSync('./sample.txt', {encoding : 'utf8'});
console.log(fileConents);