// *******************************************
// Comments Route
// *******************************************
var express = require("express");
// Add meregeParams to get :id
var router  = express.Router({mergeParams: true});
var Hof = require("../models/hof");
var Comment = require("../models/comment");
var middleware = require("../middleware")

//Add new comment
router.get("/add", middleware.isLoggedIn,  function(req, res){
  // find player by id
  Hof.findById(req.params.id, function(err, foundPlayer){
    if(err){
      req.flash("error", "Something went wrong!!");
    } else {
      res.render("comments/add", {player: foundPlayer});
    }
  })
});

// Comments creation for form post method
router.post("/", middleware.isLoggedIn,function(req, res){
  Hof.findById(req.params.id, function(err, foundPlayer) {
    if (err) {
      console.log(err);
      res.redirect("/index");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          foundPlayer.comments.push(comment);
          foundPlayer.save();
          req.flash("success", "Added a new comment");
          res.redirect('/index/' + foundPlayer._id);
        }
      })
    }
  })
});

// Comment Edit
router.get("/:comment_id/edit", middleware.authComment, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err) {
       res.redirect("back");
    }
    else {
      res.render("comments/edit", { player_id: req.params.id, comment: foundComment });
    }
  })
});

// Update Comment
router.put("/:comment_id", middleware.authComment, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if (err) {
      res.redirect("back");
    }
    else {
      console.log("updated comment", updatedComment);
      res.redirect("/index/" + req.params.id);
    }
  });
});

// Delete Comment
router.delete("/:comment_id", middleware.authComment, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect("back");
    }
    req.flash("success", "Deleted a comment");
    res.redirect("/index/" + req.params.id);
  });
});

// User authorizations middleware




module.exports = router;
