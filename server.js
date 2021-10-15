'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/api/convert', (req, res) => {
  let { input } = req.query;
  input = input.toLowerCase();
  let num = input.replace(/[a-z]+$/, '');
  let unit = /[a-z]+$/.match(input);
  num = (num.length === 0) ? '1' : num;

  let str = input.replace(/^(.+)([a-z]+)$/, (match, num, unit) => {
    num = (num.length === 0) ? '1' : num;
    let err1 = /^(\d)?(\.)?(\d)+(\/\d+)?$/.test(num);
    let err2 = /^gal|l|km|mi|lbs|kg$/.test(unit);

    if (!err1 && !err2) {
      return "invalid number and unit";
    } else if (!err1) {
      return "invalid number";
    } else if (!err2) {
      return "invalid unit";
    } else {
      return {
        num: eval(num),
        unit: unit
      };
    }
  });


  /*const reg = /^(\d)?(\.)?(\d)+(\/\d+)?gal|l|km|mi|lbs|kg$/;
  console.log(req.query);
  res.json({
    "initNum": 1,
    "initUnit": "kg",
    "returnNum": 2.20462,
    "returnUnit": "lbs",
    "string": "1 kilograms converts to 2.20462 pounds"
  })*/
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
