var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/notes', db.getAllNotes);
router.get('/api/notes/:id', db.getAnote);
router.post('/api/notes', db.createAnote);
module.exports = router;
