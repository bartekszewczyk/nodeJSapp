var express 	= require("express"),
app 			= express(),
bodyParser 		= require("body-parser"),
mongoose 		= require("mongoose"),
flash			= require("connect-flash"),
passport 		= require("passport"),
LocalStrategy 	= require("passport-local"),
methodOverride 	= require("method-override"),
Page			= require("./models/page"),
Comment			= require("./models/comment"),
User			= require("./models/user"),
seedDB			= require("./seeds");

//requiring routes (ROUTER)
var commentRoutes	 = require("./routes/comments"),
	pageRoutes = require("./routes/pages"),
	indexRoutes 	 = require("./routes/index");

mongoose.connect("mongodb://mongo:27017/nodeJSapp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //remove and seed the database


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "To jest tajny skrypt kamuflujacy hasla !!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/pages", pageRoutes);
app.use("/pages/:id/comments", commentRoutes);


app.listen(3001, process.env.PORT, process.env.IP, function(){
	console.log("Server Has Started!");
});
