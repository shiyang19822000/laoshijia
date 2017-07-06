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
        res.send(profiles)
    });
});

module.exports = router;
