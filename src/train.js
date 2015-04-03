'use strict';

const fs = require( 'fs' );
const svmjs = require( 'svm' );
const parse = require( 'csv-parse' );
const _ = require( 'lodash' );
const util = require( 'util' );

const processTweet = require( './index' );

var svm = new svmjs.SVM();

var sentiments = [];
var features = [];
var str = fs.readFileSync( __dirname + '/../data/econTweets.csv' );
parse(str, { delimiter: ',' }, function(err, output){
    output.forEach( (line, index) => {
            sentiments.push( line[1] );
            features.push(  _.values( processTweet(line[3]) ) );
            console.log( index );
    });
    sentiments = sentiments.map( (x) => x > 0 ? 1 : -1);
    svm.train(features, sentiments, {C: 1e3, numpasses: 15 });
    var json = svm.toJSON();
    console.log( util.inspect(json) );
    fs.writeFileSync( __dirname + '/../model/model.json', JSON.stringify(json) );
});
