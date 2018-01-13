var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Hof = require("./models/hof");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var seedDB = require("./seeds");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var commentRoutes = require("./routes/comments"),
    hofRoutes     = require("./routes/hof"),
    indexRoutes   = require("./routes/index")

// connection to the mongo server keep the mongod running - connect to mongod://localhost/{db-name}
// if db is not created mongod will create a one but if already created it will use the preexisting one.
mongoose.connect("mongodb://localhost/hof_db", {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
passport.use(new LocalStrategy(User.authenticate()));  //Right there
app.use(require("express-session")({
  secret: "Liverpool is best club in the world!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for making available the logged in user mentioned in the header.ejs
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/index", hofRoutes);
app.use("/index/:id/comments", commentRoutes);


app.listen(3000, function() {
  console.log('Yelp sever has started');
});
