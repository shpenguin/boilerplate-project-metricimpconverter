function ConvertHandler() {

  this.getNum = function (input) {
    let num = input.replace(/[a-z].*$/i, '') || '1';

    if (/\s/.test(num)) {
      return false;
    }

    let arr = num.split("/");

    if (arr.length > 2) {
      return false;
    }

    arr.forEach(val => parseFloat(val));
    const result = eval(arr.join('/'));
    const odd = (isNaN(result) || result === 0 || result === Infinity);
    return odd ? false : result;
  };

  this.getUnit = function (input) {
    let unit = /[a-z].*$/i.exec(input)[0].toLowerCase();

    if (unit === 'l') {
      return 'L';
    }

    let result = /^(gal|km|mi|lbs|kg)$/.test(unit);

    if (!result) {
      return result;
    }

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    const pairMap = {
      "gal": "L",
      "L": "gal",
      "mi": "km",
      "km": "mi",
      "lbs": "kg",
      "kg": "lbs"
    };

    return pairMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const nameMap = {
      "gal": "gallons",
      "L": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "pounds",
      "kg": "kilograms"
    };

    return nameMap[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }

    return Math.round(result * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let str_head = initNum + ' ' + this.spellOutUnit(initUnit),
        str_body = ' converts to ',
        str_foot = returnNum + ' ' + this.spellOutUnit(returnUnit);

    return str_head + str_body + str_foot;
  };

}

module.exports = ConvertHandler;
