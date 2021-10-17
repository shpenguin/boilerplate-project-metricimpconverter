const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Get valid input', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L')
                assert.equal(res.body.returnUnit, 'gal');
                done();
            });
    });

    test('Get invalid unit', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.body, 'invalid unit');
                done();
            });
    });

    test('Get invalid number', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.body, 'invalid number');
                done();
            });
    });

    test('Get invalid number & unit ', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.body, 'invalid number and unit');
                done();
            });
    });

    test('Get valid input with no number', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                done();
            });
    });
});
