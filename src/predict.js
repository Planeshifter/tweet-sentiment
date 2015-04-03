'use strict';

const _ = require( 'lodash' );
const svmjs = require( 'svm' );
const processTweet = require( './getFeatures.js' );

var json = require( '../model/model.json' );
var svm = new svmjs.SVM();
svm.fromJSON(json);

function predict( tweet ) {
    var testdata;
    if ( Array.isArray(tweet) === true) {
        testdata = tweet.map( x => _.values( processTweet(x) ) );
    } else {
        testdata = [].push( tweet );
    }
    return svm.predict(testdata);
}

module.exports =  exports = predict;
