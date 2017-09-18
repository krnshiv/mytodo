var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//connect db

mongoose.connect('mongodb://test:Qwerty99@ds139964.mlab.com:39964/karanstodoappdb');

//schema
 var todoschema = new mongoose.Schema({
   item: String
 });

 var todo = mongoose.model('todo',todoschema);




var urlencodedparser = bodyparser.urlencoded({extended: false});
module.exports = function(server){

server.get('/todo',function(req, res){
  //get data from mongodb and passing it
  todo.find({},function(err,data){
    if (err) throw err;
   res.render('todo',{todos: data});
 });
});

server.post('/todo',urlencodedparser,function(req, res){
  //getting data from view and adding it to mongodb
  var newtodo = todo(req.body).save(function(err,data){
  if (err) throw err;
  res.json(data);
  });
});

server.delete('/todo/:item',function(req, res){
  //delete from mongodb
  todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  });

});

};
