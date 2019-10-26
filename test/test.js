var expect  = require('chai').expect;
var request = require('request');


describe('Testing all end points', function() {
    describe ('List all users', function() {
        it('status', function(done){
            request('http://localhost:8087/all', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(body)).instanceOf(Array, 'is an array');
                done();
            });
        });

        it('All men 30 years and above earning more than $3,000', function(done) {
            request('http://localhost:8087/allmen' , function(error, response, body) {
                expect(JSON.parse(body)).instanceOf(Object, 'is an object');
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe ('Get a person using an id that exists', function() {
        it('status', function(done){
            request('http://localhost:8087/id/5bc9b385d40f6ed3fac74cbe', function(error, response, body) {
                expect(JSON.parse(body)).instanceOf(Object, 'is an object');
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(body)._id).to.equal('5bc9b385d40f6ed3fac74cbe');
                done();
            });
        });

    });

    describe ('Get a person using an id that does not exists', function() {
        it('status', function(done){
            request('http://localhost:8087/id/5bc9b385d40f6ed3fac74cbe--', function(error, response, body) {
                expect(response.statusCode).to.equal(406);
                done();
            });
        });

    });
});