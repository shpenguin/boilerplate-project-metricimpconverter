const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
    suite("Function convertHandler.getNum(input)", function() {
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
            assert.isFalse(odd, 'Double-slash-test passed');
            done();
        });

        test("No number input", (done) => {
            const input = "lbs";
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    })

});