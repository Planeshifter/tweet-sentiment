'use strict';

var chai = require( 'chai' );
var expect = chai.expect;

var predict = require( '../lib/predict' );

describe( 'predict', function tests() {

    it( 'correctly predicts a single positive tweet', function test() {
        var result = predict( 'This is great news, I just got a job.' );
        expect(result).to.be.equal( 1 );
    });

    it( 'correctly predicts a single negative tweet', function test() {
        var result = predict( 'The economy is terrible right now, layoffs everywhere.' );
        expect(result).to.be.equal( -1 );
    });

    it( 'correctly predicts an array of tweets', function test() {
        var result = predict( ['This is great news, I just got a job.', 'The economy is terrible right now, layoffs everywhere.'] );
        expect(result).to.be.deep.equal( [ 1, -1 ] );
    });

});
