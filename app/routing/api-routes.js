
// Dependencies
var bodyParser = require('body-parser');
var path = require('path');
var usersData = require('../data/friends.js')

module.exports = function(app) {

  app.get("/api/friends", function(req,res) {
    res.json(usersData);
  });

  app.post("/api/friends", function (req, res)  {

    var finalDiff = 0;
    var yourMatch;
    var diffNow = 0;

    usersData.forEach(function(ele) {

      diffNow = eval(ele.scores.map(function (num, idx) {
        return Math.abs(num - req.body.scores[idx]);
      }).join('+')); 

      if (diffNow <= finalDiff) {
        finalDiff = diffNow;
        yourMatch = ele;
      }

    });

    res.json(yourMatch);
    usersData.push(req.body);

  });

}