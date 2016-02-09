var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Projet = mongoose.model("Projet");

router.post('/create', function(req, res, next) {
  var projet = new Projet();
  projet.name = req.body.name;
  projet.family = req.body.family;
  projet.description = req.body.description;
  projet.reference = req.body.reference;
  projet.partner = req.body.partner;
  projet.save(function(err, projet) {
    if(err) {
      return res.send(500, err);
    }
    return res.json(projet);
  });
});

router.get('/', function(req, res, next) {
  Projet.find({
    $query: {},
    $orderby: {created_at: -1}
  }, function(err, data) {
    if(err) {
      res.send(500, err);
    }
    return res.send(data);
  });
});

router.get('/overview', function(req, res, next) {
  return res.render('projets');
});

router.get('/logements', function(req, res, next) {
  Projet.find({
    $query: {family : "logements"},
    $orderby: {created_at: -1}
  }, function(err, data) {
    if(err) {
      res.send(500, err);
    }
    return res.send(data);
  });
});

router.get('/industriel', function(req, res, next) {
  Projet.find({
    $query: {family : "industriel"},
    $orderby: {created_at: -1}
  }, function(err, data) {
    if(err) {
      res.send(500, err);
    }
    return res.send(data);
  });
});

router.get('/bat-public', function(req, res, next) {
  Projet.find({
    $query: {family : "bat-public"},
    $orderby: {created_at: -1}
  }, function(err, data) {
    if(err) {
      res.send(500, err);
    }
    return res.send(data);
  });
});

router.route('/:id')
  .get(function(req, res){
    Projet.findById(req.params.id, function(err, projet) {
      if(err) {
        res.send(500, err);
      }
      res.json(projet);
    });
  })
  .put(function(req, res) {
    Projet.findById(req.params.id, function(err, projet) {
      if(err) {
        res.send(500, err);
      }
      projet.name = req.body.name;
      projet.family = req.body.family;
      projet.description = req.body.description;
      projet.reference = req.body.reference;
      projet.partner = req.body.partner;
      projet.save(function(err, projet) {
        if(err) {
          return res.send(500, err);
        }
        return res.json(projet);
      });
    });
  })
  .delete(function(req, res) {
    Projet.remove({_id: req.params.id}, function(err) {
      if(err) {
        res.send(500, err);
      }
      res.json("Projet supprimé.")
    });
  });


router.get('*', function(req, res, next) {
  res.render('four-oh-four');
});

module.exports = router;
