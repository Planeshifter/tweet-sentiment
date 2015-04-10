'use strict';

const _ = require( 'lodash' );
const svm = require( 'node-svm' );
const processTweet = require( './getFeatures.js' );

var model = require( __dirname + '/../model/model.json' );
var classifier = svm.restore(model);

function predict( tweet ) {
    var testdata;
    if ( Array.isArray(tweet) === true) {
        testdata = tweet.map( x => _.values( processTweet(x) ) );
        return testdata.map( (x) => classifier.predictSync(x) );
    } else {
        testdata =  _.values( processTweet(tweet) );
        return classifier.predictSync( testdata );
    }
}

module.exports =  exports = predict;
