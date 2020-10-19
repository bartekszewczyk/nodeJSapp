var express 	= require('express'),
	router 		= express.Router({mergeParams: true}),
	Page 	= require("../models/page"),
	Comment 	= require("../models/comment"),
	middleware 	= require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
	// find page by id
	Page.findById(req.params.id, function(err, page){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {page: page});
		}
	});
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup page using ID
	Page.findById(req.params.id, function(err, page){
		if(err){
			console.log(err);
			res.redirect("/pages");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong..");
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username
					//save comment
					comment.save();
					page.comments.push(comment);
					page.save();
					console.log(comment)
					req.flash("success", "Successfully added comment");
					res.redirect("/pages/" + page._id);
				}
			})
		}
	});
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {page_id: req.params.id, comment: foundComment});
		}
	});
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/pages/" + req.params.id );
		}
	});
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//findbyIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted")
			res.redirect("/pages/" + req.params.id);
		}
	});
});



module.exports = router;

