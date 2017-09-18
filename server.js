var express = require('express');
var todocontroller = require('./controllers/todocontroller');


var server = express();

//set up template engine
server.set('view engine','ejs');

//static files
server.use(express.static('./public'));

//fire coontrollers

todocontroller(server)

//listen to port
server.listen(3000);
console.log('you are listening to port 3000');
