var express = require("express");
var router  = express.Router();
var Hof = require("../models/hof");
var middleware = require("../middleware");

// Show all the players
router.get("/", function(req, res) {
  // res.render("hof", {players: players})
  Hof.find({}, function(err, allPlayers){
    if(err){
      console.log('Error has occured!')
    } else {
      res.render("hof/index", {players: allPlayers, currentUser: req.user});
    }
  })
});

// Post request for adding the new player
router.post("/", middleware.isLoggedIn, function(req, res) {
  // players.push({
  //   name: req.body.name,
  //   image: req.body.image
  // });
  var author = {
    id: req.user._id,
    username: req.user.username
  }

  var newPlayer = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: author
  };

  Hof.create(newPlayer, function(err, newlyCreated){
    if(err) {
      console.log("Error while creating player")
    } else {
      res.redirect("/index");
    }
  })
});

router.get("/add", middleware.isLoggedIn, function(req, res) {
  res.render("hof/add");
});

// Show page
router.get("/:id", function(req, res) {
  Hof.findById(req.params.id).populate("comments").exec(function(err, foundPlayer) {
    if(err) {
      console.log(err);
    } else {
      // console.log(foundPlayer);
      res.render("hof/show", {player: foundPlayer})
    }
  })
});

// Edit player
router.get("/:id/edit", function(req, res){
  // is user logged in
  Hof.findById(req.params.id, function(err, foundPlayer){
    if (err) {
      res.redirect("/index")
    }
    else {
        res.render("hof/edit", {player: foundPlayer});
      }
  });
});
// Update player

router.put("/:id", middleware.userAuth, function(req, res){
  Hof.findByIdAndUpdate(req.params.id, req.body.player, function(err, updatedPlayer){
      if (err) {
        res.redirect("/index");
      }
      else {
        req.flash("success", "Player updated successfully");
        res.redirect("/index/"+ req.params.id);
      }
  });
});

//Destroy players

router.delete("/:id/delete", middleware.userAuth, function(req, res){
  Hof.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect("/index");
    }
    else {
      res.redirect("/index");
    }
  })
})


module.exports = router;
