const express = require('express');
const app = express();
const router = express.Router();
const indexpages = require("./route/page.js");
const radiopages = require("./route/radios.js");
const categorypages = require('./route/category.js');
const session  = require('express-session')
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify', 'email'];
var prompt = 'consent'

passport.use(new Strategy({
    clientID: process.env.clientid,
    clientSecret: process.env.clientsecret,
    callbackURL: 'https://www.jasper.tk/discord/callback',
    scope: scopes,
    prompt: prompt
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'JasperIsCool',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/') } // auth success
);
app.get('/discord/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.use(express.static(__dirname+"/public"))
app.use(express.static(__dirname+"/bower_components"))
app.use("/", indexpages);
app.use("/radio", radiopages);
app.use("/category", categorypages);
app.listen(3000);