"use strict";

let express = require("express");
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let port = process.env.PORT || 5001;
app.listen(port);
console.log("Server works on port " + port);
console.log("-----------------------------------");

//////////////////////////////////////////////////////////////////

app.post('/*', (request, response) => {
    let body = "";
    request.on('data', (data) => {
        body += data;
    }).on('end', () => {
        const content = body.toString();
        let arr = content.split("&");
        const aaa = arr[0].split("=")[1].toString();
        const bbb = arr[1].split("=")[1].toString();
        const a = parseInt(aaa);
        const b = parseInt(bbb);
        const answer = a + b;
        console.log(body + "     A: " + a + "  B: " + b + "   Answer: " + answer);
        response.end(answer.toString());
    });
});
