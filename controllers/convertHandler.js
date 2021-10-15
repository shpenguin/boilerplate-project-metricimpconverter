function ConvertHandler() {

  this.getNum = function (input) {
    let num = input
      .toLowerCase()
      .replace(/[a-z]+$/, '') || '1';
    let result = /^(\d)?(\.)?(\d)+(\/\d+)?$/.test(num);

    if (!result) {
      return result;
    }

    return eval(num);
  };

  this.getUnit = function (input) {
    let unit = /[a-z]+$/.exec(input.toLowerCase())[0];
    let result = /^(gal|l|km|mi|lbs|kg)$/.test(unit);

    if (!result) {
      return result;
    }

    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const pairs = {
      "gal": "L",
      "L": "gal",
      "mi": "km",
      "km": "mi",
      "lbs": "kg",
      "kg": "lbs"
    };

    return pairs[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const formalNames = {
      "gal": "gallons",
      "L": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "pounds",
      "kg": "kilograms"
    };

    return formalNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case gal:
        result = initNum * galToL;
        break;
      case L:
        result = initNum / galToL;
        break;
      case mi:
        result = initNum * miToKm;
        break;
      case km:
        result = initNum / miToKm;
        break;
      case lbs:
        result = initNum * lbsToKg;
        break;
      case kg:
        result = initNum / lbsToKg;
        break;
    }

    return Math.round(result * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let part1 = initNum + ' ' + this.spellOutUnit(initUnit);
    let part2 = returnNum + ' ' + this.spellOutUnit(returnUnit);
    return part1 + ' converts to ' + part2;
  };

}

module.exports = ConvertHandler;
