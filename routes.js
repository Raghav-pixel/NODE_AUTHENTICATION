var express = require('express');
const router = express.Router();

	//HOME page(with login links)

	router.get('/', function(req,res){
		res.render('index.ejs');
	});

	//LOGIN Show the login form

	router.get('/login', function(req,res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	//process the login form

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));


	//SIGNUP show the signup form
	router.get('/signup', function(req,res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	//process the signup form

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', //redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages 
	}));


	//PROFILE SECTION
	//we will want this protected so you have to be logged in to visit
	//we will use route middleware to verify this (the isLoggedIn function)

	router.get('/profile', isLoggedIn, function(req,res){
		res.render('profile.ejs', {user: req.user // get the user out of session and pass to template
		});
	});


	//LOGOUT
	router.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});


//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){

	// if user is authenticated in session, carry on
	if(req.isAuthenticated())
		return next();

	//if they aren't redirected to the home page
	res.redirect('/');
}

module.exports = router;
