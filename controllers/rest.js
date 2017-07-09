var http = require('http');
var url = require('url');
var util = require('util');
var unirest = require('unirest');

function rest() {
    this.brokeUnirestGet = function (url, params, callback) {
        console.log('brokeUnirest', url);
        var request = unirest.get(url).encoding('utf-8');
        console.log('rest params', params);
        if (params != undefined)
            request.qs(params);
        request.end(function (res) {
            if (res.error) {
                callback(res.error, null);
            }
            console.log('res.body', res.body);
            callback(null, res.body);
        });
    };
    this.brokeUnirestPost = function (url, params, callback) {
        unirest.post(url)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .send(params)
            .end(function (res) {
                console.log(res.body);
                callback(null, res.body)
            });
    };
};

module.exports = rest;
