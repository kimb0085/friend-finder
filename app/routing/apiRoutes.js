// // ===============================================================================
// // LOAD DATA
// // We are linking our routes to a series of "data" sources. 
// // These data sources hold arrays of information on table-data, waitinglist, etc.
// // ===============================================================================
var friends = require('../data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	

	app.post('/api/friends', function(req, res){

		
		// We will use this object to hold the best match. 
		var bff = {
			name: "",
			photo: "",
			difference: 100
		};

		// Here we take the result of the user's survey POST 
		var userInput 	= req.body;
		var userName 	= userInput.name;
		var userPhoto 	= userInput.photo;
		var userScores 	= userInput.scores;

		// calculate the difference between the user's scores and the scores of each user in the database
		var totalDiff = 0;

		// loop through all the friend possibilities 
		for  (var i = 0; i < friends.length; i++) {

			console.log(friends[i].name);
			totalDiff = 0;

			// We then loop through all the scores of each friend
			for (var j = 0; j < friends[i].scores[j]; j++){

				// We calculate the difference between the scores and sum them into the totalDifference
				totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDiff <= bff.difference){

					// Reset the bestMatch to be the new friend. 
					bff.name = friends[i].name;
					bff.photo = friends[i].photo;
					bff.difference = totalDiff;
				}
			}
		}

		// save the user's data 
		friends.push(userInput);

		// Return a JSON with the user's bestMatch
		res.json(bff);

	});

}

