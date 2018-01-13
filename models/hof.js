var mongoose = require("mongoose")
//Schema Setup
// Defining the hof schema - it is just the pattern
var hofSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})

// var model_name = mongoose.model{"singular version of your collection name" ,Schema Name}
// we took hofSchema and compiled it into model and save into variable "Hof"
// now we can use Hof variable to create, find or update it has all the method
module.exports = mongoose.model("Hof", hofSchema);
