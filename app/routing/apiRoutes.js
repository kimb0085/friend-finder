// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post("/api/friends", function(req, res){
		var bff = {
			name: "",
			photo: "",
			bffDiff: 1000
		};

		console.log(req.body);

		//capture survey results
		var userInput = req.body;
		var userScore = userInput.scores;

		//calculate the differences
		var totalDiff = 0;

		for (var i = 0; i < friends.length; i++) {
			console.log(friends[i]);
			totalDiff = 0;
			//loop through scores
			for (var j = 0; j < friends[i].scores[j]; j++) {
				totalDiff += Math.abs(parseInt(userScore[j]) - parseInt(friends[i].scores[j]));
				 if (totalDiff <= bff.bffDiff) {
				 	bff.name = friends[i].name;
				 	bff.photo = friends[i].photo;
				 	bff.bffDiff = totalDiff;
				 }
			}
		}
		friends.push(userInput);

		res.json(bff);	
	});
}