var express = require('express');
var router = express.Router();
var handler = require('../controllers/handler');

/* GET recall page. */
router.get('/recall', function(req, res, next) {
    var h = new handler();
    var recall = h.getRecalls(req.query, function (error, recalls) {
        res.send(recalls);
    });
});

router.get('/profile', function (req, res, next) {
    var h = new handler();
    var profile = h.getProfiles(req.query, function (error, profiles) {
        res.send(profiles);
    });
});

router.get('/wordswall', function (req, res, next) {
    var h = new handler();
    var words = h.getWordsWall(req.query, function (error, wordss) {
        res.send(wordss);
    });
});


router.post('/wordswall', function (req, res, next) {
    var h = new handler();
    var words = h.postWordsWall(req.body, function (error, wordss) {
        res.send(wordss);
    });
});

module.exports = router;
