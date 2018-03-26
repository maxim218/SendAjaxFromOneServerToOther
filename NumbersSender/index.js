"use strict";

let http = require("http");
http.post = require('http-post');

function sendPost(url, body, callback) {
    http.post(url, body, function(res) {
        res.setEncoding('utf8');
        let body = "";
        res.on('data', function(data) {
            body += data;
        }).on('end', () => {
            const result = body.toString();
            callback(result);
        });
    });
}

////////////////////////////////////////////////////////

let express = require("express");
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let port = process.env.PORT || 5000;
app.listen(port);
console.log("Server works on port " + port);
console.log("-----------------------------------");

////////////////////////////////////////////////////////

let inter = setInterval(() => {
    const aa = parseInt(Math.random() * 10000) % 100;
    const bb = parseInt(Math.random() * 10000) % 100;

    sendPost("http://localhost:5001/" + Math.random(), {
        a: aa,
        b: bb
    }, (result) => {
        console.log("A: " + aa + "  B: " + bb + "   Result: " + result);
        if(parseInt(aa) + parseInt(bb) !== parseInt(result)) {
            throw new Error();
        } else {
            console.log("OK");
        }
    });
}, 5);