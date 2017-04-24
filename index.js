var http = require('http');
var fs = require('fs');

/*How to call other modules*/
var extract = require('./extract');
var wss = require('./websockets-server');
//Assignment 9: Silver Challenge
var mime = require('mime');

/*url.substring(1) takes off the first char of the string
fileName = url.substring(1);*/

var handleError = function(err, res) {
    res.writeHead(404);
    res.end();
};


var server = http.createServer(function(req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
    var type = mime.lookup(filePath);
    fs.readFile(filePath, function(err, data) {

        if (err) {
            handleError(err, res);
            return;
        } else {

            console.log(type);

            //Assignment 9 - Silver Challenge
            res.setHeader('Content-Type', type);
            res.end(data);
        }
    });
});
server.listen(3000);
