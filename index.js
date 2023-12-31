// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/:pdate?", function(req, res) {
  const { pdate } = req.params;
  console.log(pdate);
  const myDate = pdate? isNaN(pdate) ? new Date(pdate) : new Date(+pdate) : new Date();
  if (myDate.toString() === 'Invalid Date') {
    res.json({
      error : "Invalid Date"
    })
  }
  res.json({
    "unix":myDate.valueOf(),
    "utc":myDate.toUTCString()
  })
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
