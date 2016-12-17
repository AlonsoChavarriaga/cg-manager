var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');

var configAuth = require('./auth');

module.exports = function(passport){

  //setup passport session
  //this part is for persistent login sessions

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  //Local login
  passport.use('local-login', new LocalStrategy({
    //override default username with email instead
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //allows us to pass request from route, see if user logged
  },
  function(req, email, password, done){
    if(email)
        email = email.toLowerCase(); //avoid case sensitive errors

    //dat async goodness
    process.nextTick(function(){
      User.findOne({ 'local.email' : email }, function(err, user){
        //if errors, return them
        if(err)
            return done(err);

        //if no user found, return msg
        if (!user)
            return done(null, false, req.flash('loginMessage', 'User does not exist.'));

        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Wrong password. Try again.'));

        //success, return user
        else
            return done(null, user);
      })
    })
  }));

  //Local signup
  passport.use('local-signup', new LocalStrategy({
    //again, override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //check if user is logged in
  },
  function(req, email, password, done) {
    if (email)
      email = email.toLowerCase();

    process.nextTick(function () {
      //if user is not logged in
      if (!req.user) {
        User.findOne({'local.email': email}, function (err, user) {
          if (err)
            return done(err);

          if (user) {
            return done(null, false, req.flash('signupMessage', 'Email already in use.'));
          } else {

            //time to create the user
            var newUser = new User();

            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function (err) {
              if (err)
                return done(err)

              return done(null, newUser);
            });
          }
        });
      } else if (!req.user.local.email) {
        //see if emails being used anywhere else
        User.finOne({'local.email': email}, function (err, user) {
          if (err)
            return done(err);

          if (user) {
            return done(null, false, req.flash('loginMesage', 'Email already in use.'));
            // Using login message instead of signup message because its used b connect/local
          } else {
            var user = req.user;
            user.local.email = email;
            user.local.password = user.generateHash(password);
            user.save(function (err) {
              if (err)
                return done(err);
              return done(null, user);
            });
          }
        });
      } else {
        //user is logged in and already has a local account, ignore signup.
        return done(null, req.user);
      }
    });
  }));

};