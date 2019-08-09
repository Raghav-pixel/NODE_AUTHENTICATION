//get all tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//connect to the database
mongoose.connect('mongodb+srv://raghav:khanna@cluster0-psret.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

//pass passport for configuration
require('./config/passport')(passport);

//set up our express application
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies(needed for auth)
app.use(bodyParser.urlencoded({extended: false})); //get info from HTMl forms

app.use('view engine', 'ejs'); //set up ejs for templating

//required for passport
app.use(session({
	secret: 'ilovewine'
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

//routes
require('./app/routes.js')(router); //load our routes and pass in our app and fully configured passport

//launch
app.listen(port);
console.log('the magic happens on port' + port);