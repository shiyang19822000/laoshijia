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
        var request = r.brokeUnirestGet(baseURL + '/profiles/3/', params, function (error, res) {
            callback(null, res);
        });
    };
};

module.exports = handler;

var baseURL = 'http://localhost:8000';
