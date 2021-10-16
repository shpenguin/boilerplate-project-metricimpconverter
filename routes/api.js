'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let { input } = req.query;
    input = input.toLowerCase();
    console.log(req.query);

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if (!initNum && !initUnit) {
      res.json("invalid number and unit");
    }

    if (!initNum) {
      res.json("invalid number");
    }

    if (!initUnit) {
      res.json("invalid unit");
    }

    res.json({
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": toString
    });
  })

};
