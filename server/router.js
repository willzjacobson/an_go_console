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
router.put('/:namespace', function(req, res, next) {
	req.body._id = new mongodb.ObjectID(req.body._id);
	dbProm.then(function(db) {
		db.collection('buildings').update({namespace: req.params.namespace}, req.body, {new:true, w:1}, function(err, result) {
			if (err) throw err;
			res.json(result);
		});
	});
});

router.delete('/:namespace', function(req, res, next) {
	dbProm.then(function(db) {
		db.collection('buildings').deleteOne({namespace: req.params.namespace}, function(err, object) {
			if (err) throw err;
			res.send('Building deleted');
		});
	})
	.then(null, next);
});

module.exports = router;


