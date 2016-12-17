var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
mongoose.connect('mongodb://localhost/rest_test2');
require('./config/passport')(passport);

var app = express();
app.use(express.static(__dirname));
app.use(morgan('dev')); //log every request
app.use(cookieParser()); //read cookies for auth
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'cutiepie',
    resave: true,
    saveUnitiliazed: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/api', require('./routes/api'));

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

// process the signup form
app.post('/', passport.authenticate('local-signup', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/*', isLoggedIn, function(req,res){
    res.sendFile(__dirname+'/index.html');
    //__dirname : It will resolve to your project folder.
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
        return next();

}


app.listen(8080, '0.0.0.0');
console.log('Listening on port 8080');