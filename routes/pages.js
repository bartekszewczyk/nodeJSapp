var express = require('express'),
	router = express.Router(),
	Page = require("../models/page"),
	middleware = require("../middleware");


// INDEX - show all pages
router.get("/", function(req, res){
	//Get all page from DB
	Page.find({}, function(err, allPages){
		if(err){
		   console.log(err);
		} else {
			res.render("pages/index", {pages: allPages, currentUser: req.user});
		}
	});
});

// CREATE - add new pages to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and add to pages array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newPage = {name: name, price: price, image: image, description: desc, author: author};
	//Create a new page and save to DB
	Page.create(newPage, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to pages page
			console.log(newlyCreated);
			res.redirect("/pages");
		}
	});
});

// NEW - show form to create new page
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("pages/new");
});

// SHOW - shows more info about one page
router.get("/:id", function(req, res){
	//find the page with provided ID
	Page.findById(req.params.id).populate("comments").exec(function(err, foundPage){
		if(err){
			console.log(err);
		} else {
			console.log(foundPage);
			//render show template with that page
			res.render("pages/show", {page: foundPage});
		}
	});
});

// EDIT PAGE ROUTE
router.get("/:id/edit", middleware.checkPageOwnership, function(req, res){
	Page.findById(req.params.id, function(err, foundPage){
			res.render("pages/edit", {page: foundPage});
		});
});

// UPDATE PAGE ROUTE
router.put("/:id", function(req, res){
	// find and update the correct page
	Page.findByIdAndUpdate(req.params.id, req.body.page, function(err, updatedPage){
		if(err){
			res.redirect("/pages");
		} else {
			// redirect somewhere(show page)
			res.redirect("/pages/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkPageOwnership, function(req, res){
	Page.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/pages");
		} else {
			res.redirect("/pages");
		}
	});
});


module.exports = router;


