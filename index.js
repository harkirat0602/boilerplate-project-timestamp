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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function(req,res){
  var date_string = Number(req.params.date) || req.params.date
  console.log(req.params.date);
  if(!req.params.date) { date_string = Number(Date.now()); console.log("Was Empty")}
  try {
    const date = new Date(date_string)
    console.log(date);
    if(date=="Invalid Date") {res.json({error: "Invalid Date"}); return; }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  } catch (error) {
    console.log(error);
    res.json({error: error || "Invalid Date"})
  }
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
