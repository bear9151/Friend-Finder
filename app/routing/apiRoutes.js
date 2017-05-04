// Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friendsData = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

// Logic to find closest match for new survey user
    app.post("/api/friends", function (req, res) {

        friendsData.push(req.body); // Pushing new survey results to the api object

        var userScores = friendsData[friendsData.length - 1].scores; // Assigning a variable for logic use

        for (var i = 0; userScores.length > i; i++) {
            userScores[i] = parseInt(userScores[i]);
        } // This is a for loop to parse the entire array from strings into integers, for comparison with the api data

        var matchPoints = 100;


        // res.json(friendsData[3]);
    });

};