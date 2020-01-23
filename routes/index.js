var express = require('express'),
router 		= express.Router(),
passport 	= require('passport'),
User 		= require("../models/user");


// root route
router.get("/", function(req, res){
	res.render("landing");
});

// show register form
router.get("/register", function(req, res){
	res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + user.username);
			res.redirect("/pages");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});
// handling login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/pages", 
		failureRedirect: "/login"
}), function(req, res){
});

// logic logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You logged out!");
	res.redirect("/pages");
});

// ADDITIONAL ROUTES, APPS

// colorgame app
router.get("/colorgame", function(req, res){
	res.render("colorgame");
});

// drums app
router.get("/drums", function(req, res){
	res.render("drums");
});

// TODOs app
router.get("/todos", function(req, res){
	res.render("todos");
});

module.exports = router;


