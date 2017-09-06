function divideSync(x,y){
	if (y === 0)
		throw new Error('Invalid arguments');
	return x / y;
}

function doDivideSync(x,y){
	try {
		var result = divideSync(x,y);
		console.log(result);
	}
	catch(err){
		console.log('something went wrong ');
	}
}

function divide(x,y, onResult){
	setTimeout(function(){
		if (y === 0){
			onResult(new Error('Invalid arguments'), null);
			return;
		}
		onResult(null, x/y);
	}, 5000);
}

function doDivide(x,y){

	divide(x,y, function(err, result){
		if(err){
			console.log('something went wrong ');
			return;		
		}
		console.log(result);
	});
}

console.log('sync....');
doDivideSync(100,5);
doDivideSync(100,0);

console.log('async......');
doDivide(100,5);
doDivide(100,0);
