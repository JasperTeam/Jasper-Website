const express = require('express');
const app = express();
const router = express.Router();
const indexpages = require("./route/page.js");
const radiopages = require("./route/radios.js");
const categorypages = require('./route/category.js');
const session  = require('express-session')
  , passport = require('passport')
  , Strategy = require('passport-discord').Strategy;
const nodemailer = require("nodemailer");
 
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
    callbackURL: 'https://jasper.tk/discord/callback',
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
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { 
      res.redirect('/')
      async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.user, // generated ethereal user
      pass: process.env.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Jasper Auth" <auth@jaspermail.ga>', // sender address
    to: req.user.email, // list of receivers
    subject: "Hey " +req.user.username+ ", did you logged in?", // Subject line
    html: `<body style="width:100%; height: 50vh; background: #202033; color:white; font-family: 'Poppins', sans-serif;">
<center>
<img src="https://camo.githubusercontent.com/de411b0a317e5abe1c7758302e02e39326050775463796d7733272e2cec4b4c9/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3931303533343731373434353636303732352f3931363532313131323630313530353831322f4e6f766f5f70726f6a65746f5f355f453931364234412e706e67" width="100"/>
<br>
We detected a recent login <b>into</b> your <b>Jasper Account</b>, was <b>it you that logged in</b>? If you weren't the one who logged in, please contact <b>our</b> team <b>on</b> discord and <b>we'll</b> temporarily suspend your Jasper Account.
</center>
Logged in at ${new Date()}
</body>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account

}

main().catch(console.error);

    } // auth success
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