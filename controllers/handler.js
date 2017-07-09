var rest = require('../controllers/rest');

function handler() {
    this.getRecalls = function (params, callback) {
        var r = new rest();
        var request = r.brokeUnirestGet(baseURL + '/recalls/', params, function (error, res) {
            callback(null, res);
        });
    };
    this.getProfiles = function (params, callback) {
        var r = new rest();
        var request = r.brokeUnirestGet(baseURL + '/profiles/1/', params, function (error, res) {
            callback(null, res);
        });
    };
    this.getWordsWall = function (params, callback) {
        var r = new rest();
        var request = r.brokeUnirestGet(baseURL + '/wordswall/', params, function (error, res) {
            callback(null, res);
        });
    };
    this.postWordsWall = function (params, callback) {
        var r = new rest();
        var request = r.brokeUnirestPost(baseURL + '/wordswall/', params, function (error, res) {
            callback(null, res);
        });
    }
};

module.exports = handler;

var baseURL = 'http://localhost:8000';
// var baseURL = 'http://114.215.29.0:8000';