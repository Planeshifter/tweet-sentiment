'use strict';

const _ = require( 'lodash' );
const svm = require( 'node-svm' );
const processTweet = require( './getFeatures.js' );

var model = require( '../model/model.json' );
var classifier = svm.restore(model);

function predict( tweet ) {
    var testdata;
    if ( Array.isArray(tweet) === true) {
        testdata = tweet.map( x => _.values( processTweet(x) ) );
    } else {
        testdata = [].push( tweet );
    }
    return testdata.map( (x) => classifier.predictProbabilitiesSync(x) );
}

module.exports =  exports = predict;
