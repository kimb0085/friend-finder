// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");

module.exports = function(app){
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});


	app.post("/api/friends", function(req, res){
		var bestMatch = {
			name: "",
			photo: "",
			friendDiff: 1000
		}
	})

	app.post("/api/friends", function(req, res){
		var bestMatch = {
			name: "",
			photo: "",
			friendDiff: 1000
		};
	
	console.log(req.body);
	
	//Survey Results
	var userData = req.body;
	var userScores = userData.scores;

	console.log(userScores);

	//Calculate differences between users score and friends score
	var totalDiff = 0;

	for (var i = 0; i < friends.length; i++){
		console.log(friends[i]);
		totalDiff = 0;

		for (var j = 0; j < friends[i].scores[j]; j++){
			totalDiff = Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

			if (totalDiff == bestMatch.friendDiff) {
				bestMatch.name = friends[i].name;
				bestMatch.phot = friends[i].photo;
				bestMatch.friendDiff = totalDiff;
			}
		}
	}


friend.push(userData);

res.json(bestMatch);
	});
}


