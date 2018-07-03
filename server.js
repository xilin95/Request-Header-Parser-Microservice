// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var accepts = require('accepts');
//var useragent = require('express-useragent');
app.enable('trust proxy');
//app.use(useragent.express());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// [base url]/api/whoami
app.get("/api/whoami", function (req, res) {
  
   var accept = accepts(req)
   /* I can get the IP address, preferred languages (from header Accept-Language)
   and system infos (from header User-Agent) for my device.
   
   {"ipaddress":"::ffff:159.20.14.100","language":"en-US,en;q=0.5",
  "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"} */

  res.json({ipaddress: req.ip, language: accept.languages(), software: req.headers['user-agent']});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
