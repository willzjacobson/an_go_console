var MongoClient = require('mongodb').MongoClient;


function mongoConnPromise() {
	return new Promise(function(resolve, reject) {
		MongoClient.connect('mongodb://127.0.0.1:27017/admin-console', function(err, db) {
			if (err) reject(err);
			else {
				console.log('Connected to mongoDB!');
				buildings = db.collection('buildings');
		  		resolve(db);
			}
		});
	});
}


module.exports = mongoConnPromise();