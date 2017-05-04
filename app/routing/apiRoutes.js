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
        friendsData.push(req.body);
        let userScore = friendsData[friendsData.length - 1].scores,
            matchIndex;

        for (let i = 0; i < friendsData.length - 1; i++) {
            let matchCount = 100,
                total = 0;
            for (let j in friendsData[i].scores) {
                total += Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(userScore[j]));
            }
            if (total < matchCount) matchIndex = i;
        }
        res.json(friendsData[matchIndex]);
    });

};