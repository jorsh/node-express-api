var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
  res.render('index', {title: 'To Do API'});
});


// Importing Schema
var Task = require('./app/models/Tasks.js');

// Connecting to the mongodb importing the url from config
mongoose.connect(require('./config/db.js').url);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB')
});


app.get('/tasks', function (req, res, next) {
    Task.find(function(err, tasks){
      if(err){return next(err)}
        console.log(tasks);
      res.json(tasks);
    })
  });


// POST
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/task', function (req, res, next) {
  var task = new Task(req.body);
  console.log(req.body);
  task.save(function(err, tasks){
    if(err){return next(err)}
      console.log(tasks);
    res.json(tasks);
  })
  });

app.put('/task/:id', function (req, res) {
Task.findById(req.params.id, function(err, task){
        task.name = req.body.name;

        task.save(function(err){
            if(err){res.send(err)}
            
            res.json(task);
        })
    })
});

app.delete('/task/:id', function (req, res) {
  Task.findByIdAndRemove(req.params.id, function(err){
      if(err){res.send(err)}
          res.json({message: 'Task has been removed'});
  })
});

app.listen(3000, function () {
  console.log('API on port 3000');
});
