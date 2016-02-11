var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");
var crypto = require('crypto');

var config = require('../config/config');
var superSecret = config.secret;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setup', function(req, res) {

  // create a sample user

  var hash = crypto
        .createHmac("md5", superSecret)
        .update("password")
        .digest('hex');

  var nick = new User({
    name: 'Will Alexander',
    password: hash,
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
