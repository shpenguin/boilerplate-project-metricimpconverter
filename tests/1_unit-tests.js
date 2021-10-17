const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite("Function convertHandler.getNum(input)", function () {
        test("Integer input", (done) => {
            const input = "5kg";
            assert.equal(convertHandler.getNum(input), 5);
            done();
        });

        test("Decimal input", (done) => {
            const input = "3.2mi";
            assert.equal(convertHandler.getNum(input), 3.2);
            done();
        });

        test("Fraction input", (done) => {
            const input = "3/4mi";
            assert.equal(convertHandler.getNum(input), 0.75);
            done();
        });

        test("Int/Decimal input", (done) => {
            const input = "12/2.4mi";
            assert.equal(convertHandler.getNum(input), 5);
            done();
        });

        test("Double-slash input", (done) => {
            const input = "12/5/2mi";
            const odd = convertHandler.getNum(input);
            assert.isFalse(odd);
            done();
        });

        test("No number input", (done) => {
            const input = "lbs";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite("Function convertHandler.getUnit(input)", function () {
        test("Valid unit input", (done) => {
            const units = [
                "gal",
                "l",
                "mi",
                "km",
                "lbs",
                "kg",
                "GAL",
                "L",
                "MI",
                "KM",
                "LBS",
                "KG"
            ];
            units.forEach(val => {
                const item = (val.length === 1) ? 'L' : val.toLowerCase();
                assert.equal(convertHandler.getUnit(3 + val), item);                
            });
            
            done();
        });

        test("Invalid unit input", (done) => {
            const input = "5lps";
            const odd = convertHandler.getUnit(input);
            assert.isFalse(odd);
            done();
        });
    });

    suite("Function convertHandler.getReturnUnit(initUnit)", function () {
        test("Valid unit convert", (done) => {
            const pairMap = {
                "gal": "L",
                "L": "gal",
                "mi": "km",
                "km": "mi",
                "lbs": "kg",
                "kg": "lbs"
            };

            for (let [init, res] of Object.entries(pairMap)) {
                assert.equal(convertHandler.getReturnUnit(init), res);
            }

            done();
        });
    });

    suite("Function convertHandler.spellOutUnit(unit)", function () {
        test("Valid unit spell out", (done) => {
            const nameMap = {
                "gal": "gallons",
                "L": "liters",
                "mi": "miles",
                "km": "kilometers",
                "lbs": "pounds",
                "kg": "kilograms"
            };

            for (let [init, res] of Object.entries(nameMap)) {
                assert.equal(convertHandler.spellOutUnit(init), res);
            }

            done();
        });
    });

    suite("Function convertHandler.convert(initNum, initUnit)", function () {
        test("gal to L", (done) => {
            const [num, unit] = [5, 'gal'];
            const odd = 18.92705;
            assert.approximately(
                convertHandler.convert(num, unit),
                odd,
                0.0001
            );
            done();
        });

        test("L to gal", (done) => {
            const [num, unit] = [5, 'L'];
            const odd = 1.32086;
            assert.approximately(
                convertHandler.convert(num, unit),
                odd,
                0.0001
            );
            done();
        });

        test("mi to km", (done) => {
            const [num, unit] = [5, 'mi'];
            const odd = 8.0467;
            assert.approximately(
                convertHandler.convert(num, unit),
                odd,
                0.0001
            );
            done();
        });

        test("km to mi", (done) => {
            const [num, unit] = [5, 'km'];
            const odd = 3.10686;
            assert.approximately(
                convertHandler.convert(num, unit),
                odd,
                0.0001
            );
            done();
        });

        test("lbs to kg", (done) => {
            const [num, unit] = [5, 'lbs'];
            const odd = 2.26796;
            assert.approximately(
                convertHandler.convert(num, unit),
                odd,
                0.0001
            );
            done();
        });

        test("kg to lbs", (done) => {
            const [num, unit] = [5, 'kg'];
            const odd = 11.02312;
            assert.approximately(
                convertHandler.convert(num, unit),
                odd,
                0.0001
            );
            done();
        });
    });
});