let express = require('express');
let router = express.Router();
let Like = require('../models/like');
let mongo = require('mongodb').MongoClient;
let objectId = require('mongodb').ObjectID;
let assert = require('assert');
let url = 'mongodb://localhost:27017/votedb';

//fetch like data
router.get('/likes/:id', (req, res, next) => {
	Like.find({_id: req.params.id}).then(like => res.send(like))
});

//update like data
router.post('/likes/596ae8f969e0bb816dc04773', (req, res) => {
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection('likes')
	.updateOne({"_id": objectId('596ae8f969e0bb816dc04773')}, {$set: req.body}, (err, result) => {
      assert.equal(null, err);
      db.close();
    });
  });
});

module.exports = router;