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

    // New Variable to hold the current bestMatch, as the logic below loops through all friends
    var bestMatch = {name: "", photo: "", scores: [], diff: 1000},
        surveyObj = req.body,
        difference = 0;

    // For loop to parse survey score string into integers for comparison
    for (var i = 0; i < surveyObj.scores.length; i++) {
        surveyObj.scores[i] = parseInt(surveyObj.scores[i]);
    }

    // For loop to loop through each friend in JSON data, another for loop inside to loop through each question and get absolute value
    for (var i = 0; i < friendsData.length; i++) {
        for (var j = 0; j < friendsData[i].scores.length; j++) {
            difference = difference + (Math.abs(surveyObj.scores[j] - friendsData[i].scores[j]));
        }
        // If the current friend beats the current best match, then rewrite the object with the new friend data
        if (bestMatch.diff >= difference) {
            bestMatch.name = friendsData[i].name;
            bestMatch.photo = friendsData[i].photo;
            bestMatch.scores = friendsData[i].scores;
            bestMatch.diff = difference;
        }
        // Set the difference back to zero to compare the next friend.
        difference = 0;
    }

    // Send the result to the front end, passing through the lasting bestMatch object
    res.json(bestMatch);
    });

};