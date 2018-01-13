var mongoose  = require("mongoose")
var Hof = require("./models/hof")
var Comment = require("./models/comment")

var data = [
  {
    name : "David Beckham",
    image : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Beckswimbledon.jpg/220px-Beckswimbledon.jpg",
    description : "David Robert Joseph Beckham, born 2 May 1975 is an English former professional footballer. He played for Manchester United, Preston North End, Real Madrid, Milan, LA Galaxy, Paris Saint-Germain and the England national team for which he held the appearance record for an outfield player until 2016 when Wayne Rooney surpassed his total. He is the first English player to win league titles in four countries: England, Spain, the United States and France. He announced his retirement in May 2013 after a 20-year career, during which he won 19 major trophies."
  },
  {
    name : "Zinedine Zidane",
    image : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Zinedine_Zidane_by_Tasnim_01.jpg/232px-Zinedine_Zidane_by_Tasnim_01.jpg",
    description : "Zinedine Yazid Zidane, born 23 June 1972 nicknamed Zizou, is a French retired professional footballer and current manager of Real Madrid. He played as an attacking midfielder for the France national team, Cannes, Bordeaux, Juventus and Real Madrid.[3][4] An elite playmaker, renowned for his elegance, vision, ball control and technique, Zidane was named the best European footballer of the past 50 years in the UEFA Golden Jubilee Poll in 2004. He is regarded as one of the greatest players of all time."
  },
  {
    name : "Ronaldo",
    image : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ronaldo-14-05-2013.jpg/220px-Ronaldo-14-05-2013.jpg",
    description : "Ronaldo Luís Nazário de Lima (locally born 18 September 1976[2]), commonly known as Ronaldo, is a retired Brazilian professional footballer who played as a striker. Popularly dubbed (The Phenomenon), he is widely considered to be one of the greatest football players of all time.[3][4][5][6][7] In his prime, he was known for his dribbling at speed, feints, and clinical finishing."
  }
]

function seedDb () {
  Hof.remove({}, function(err){
    // if(err){
    //   console.log(err);
    // }
    // console.log("Removed players!!");
    // data.forEach(function(seed){
    //   Hof.create(seed, function(err, player){
    //     if(err){
    //       console.log(err);
    //     } else {
    //       console.log("Added a player")
    //       Comment.create({
    //         text: "He was a Legend. Wished he was still playing internationals.",
    //         author: "GameKida"
    //       }, function(err, comment){
    //         player.comments.push(comment);
    //         player.save();
    //         console.log("Pushing Comment");
    //       });
    //     }
    //   });
    // });
  });
}

module.exports = seedDb;
