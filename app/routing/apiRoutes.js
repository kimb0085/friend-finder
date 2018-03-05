// // ===============================================================================
// // LOAD DATA
// // We are linking our routes to a series of "data" sources. 
// // These data sources hold arrays of information on table-data, waitinglist, etc.
// // ===============================================================================
var friends = require("../data/friends.js");
//export data
module.exports = function(app){
	//set api route
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post("/api/friends", function(req, res){
		var matchDiff = 40;
		var matchName = "";
		var matchImg = "";

		friends.forEach(function(friend){
			var matchArray = [];
			var totalDiff = 40;

			function add(total, num){
				return total + num;
			}
			for (var i = 0; i < friend.scores.length; i++) {
				matchArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

				totalDiff = matchArray.reduce(add, 0);

				if (totalDiff < matchDiff) {
					matchDiff = totalDiff;

					matchName = friend.name;
					matchImg = friend.photo;
				}
			}
		});
		res.json({
				name: matchName,
				photo: matchImg,
			});
		friends.push(req.body);
	});
}

