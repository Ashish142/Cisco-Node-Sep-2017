var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Fix that bug', isCompleted : true}
];


/* GET home page. */
router.get('/', function(req, res, next) {
  var completedCount = taskList.reduce(function(result, task){
  	return task.isCompleted ? ++result : result;
  },0);
  var viewData = {
  	list : taskList,
  	completedCount : completedCount
  };
  res.render('tasks/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var newTaskId = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}) + 1;
	var newTask = {
		id : newTaskId,
		name : req.body.taskName,
		isCompleted : false
	};
	taskList.push(newTask);
	res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
	var taskToToggle = taskList.filter(function(task){
		return task.id === parseInt(req.params.id);
	})[0];
	if (taskToToggle){
		taskToToggle.isCompleted = !taskToToggle.isCompleted;
	};
	res.redirect('/tasks');
});

router.post('/remove', function(req, res, next){
	taskList = taskList.filter(function(task){
		return !task.isCompleted;
	});
	res.redirect('/tasks');
})
module.exports = router;
