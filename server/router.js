var router = require('express').Router();
var dbProm = require('./mongo');
var mongodb = require('mongodb');


router.get('/', function(req, res, next) {
	dbProm.then(function(db) {
		db.collection('buildings').find({}).toArray(function(err, buildings) {
			if (err) throw err;
			res.json(buildings);
		});
	})
	.then(null, next);
});

router.post('/', function(req, res, next) {
  dbProm.then(function(db) {
  	db.collection('buildings').insert(req.body, function(err, result) {
  		if (err) throw err;
  		res.json(result.ops[0]);
  	});
  })
  .then(null, next);
});

// Couldn't get update to work, so deleting then inserting new doc (_id will change)
router.put('/:buildingId', function(req, res, next) {
	dbProm.then(function(db) {
		db.collection('buildings').update({_id: new mongodb.ObjectID(req.params.buildingId)}, req.body, {new:true, w:1}, function(err, result) {
			if (err) throw err;
			res.json(result);
		});
	});
});

router.delete('/:buildingId', function(req, res, next) {
	dbProm.then(function(db) {
		db.collection('buildings').deleteOne({_id: new mongodb.ObjectID(req.params.buildingId)}, function(err, object) {
			if (err) throw err;
			res.send('Doc deleted');
		});
	})
	.then(null, next);
});

module.exports = router;


