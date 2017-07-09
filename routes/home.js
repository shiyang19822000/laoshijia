var express = require('express');
var router = express.Router();
var handler = require('../controllers/handler');

/* GET home page. */
router.get('/', function(req, res, next) {
    var h = new handler();
    var profile = h.getProfiles(req.query, function (error, profiles) {
        res.render('home', profiles);
    });
});


module.exports = router;
