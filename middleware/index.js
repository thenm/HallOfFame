var Hof = require("../models/hof");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.authComment = function (req, res, next) {
  // checks user is logged in
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err) {
        res.redirect("back");
      }
      else {
        // Does the logged in user has created the player?
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please login!!");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login!!");
  res.redirect("/signin");
};


// User authorizations middleware
middlewareObj.userAuth = function(req, res, next) {
  // checks user is logged in
  if(req.isAuthenticated()) {
    Hof.findById(req.params.id, function(err, foundPlayer){
      if (err) {
        req.flash("error", "Player not found");
        res.redirect("back");
      }
      else {
        // Does the logged in user has created the player?
        if(foundPlayer.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You don't have the permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Please login!!");
    res.redirect("back");
  }
}

module.exports = middlewareObj
