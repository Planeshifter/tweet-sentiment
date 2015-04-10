'use strict';

const _ = require( 'lodash' );
const svm = require( 'node-svm' );
const processTweet = require( './getFeatures.js' );
const path = require( 'path' );

var model = require( path.normalize( __dirname + '/../model/model.json' ) );
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
