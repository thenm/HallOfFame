var express = require("express");
var router  = express.Router();
var User = require("../models/user");

var passport = require("passport");

router.get("/", function(req, res) {
  res.render("landing");
});

// =========================================
// AUTH ROUTES
// =========================================

//Show the sign up form

router.get("/signup", function(req, res){
  res.render("signup")
});

// Signup  logic
router.post("/signup", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      req.flash("error", err.message);
      return res.render("signup")
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to HOF" + user.username);
      res.redirect("/index")
    });
  });
});

//Show Login form

router.get("/signin", function(req, res){
  res.render("signin");
});

//signin logic

router.post("/signin",passport.authenticate("local",
  {
    successRedirect:"/index",
    failureRedirect:"/signin"
  }), function(req, res){
  // res.send("Login!!");
});

// loguot

router.get("/signout", function(req, res){
  req.logout();
  req.flash("error", "Signed Out!!")
  res.redirect("signin");
});

module.exports = router;
