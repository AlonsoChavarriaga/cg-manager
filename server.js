var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rest_test2');

var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

app.get('/*',function(req,res){
    res.sendFile(__dirname+'/index.html');
    //__dirname : It will resolve to your project folder.
});


app.listen(8080, '0.0.0.0');
console.log('Listening on port 8080');