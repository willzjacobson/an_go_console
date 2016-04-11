var router = require('express').Router();
var dbProm = require('./mongo');


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
  		console.log(result);
  		res.json(result.ops[0]);
  	})
  })
  .then(null, next);
});

router.put('/:buildingId', function(req, res, next) {
	dbProm.then(function(db) {
		db.collection('buildings').update({_id: req.params.buildingId}, req.body);
		// db.collection('buildings').update({_id: req.params.buildingId}, req.body, {new:true, w:1}, function(err, result) {
		// 	if (err) throw err;
		// 	console.log(result);
		// 	res.json(result);
		// });
		res.end()
	});
});

router.delete('/:buildingId', function(req, res, next) {
	dbProm.then(function(db) {
		db.collection('buildings').deleteOne({_id:req.params.id}, {remove:true}, function(err, object) {
			if (err) throw err;
			console.log('document deleted');
			res.end();
		});
	})
	.then(null, next);
});

module.exports = router;


