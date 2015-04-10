'use strict';

const fs = require( 'fs' );
const parse = require( 'csv-parse' );
const _ = require( 'lodash' );
const path = require( 'path' );

const processTweet = require( './getFeatures' );

var sentiments = [];
var features = [];
var str = fs.readFileSync( path.normalize( __dirname + '/../data/econTweets.csv' ) );
parse(str, { delimiter: ',' }, function(err, output){
    output.forEach( (line, index) => {
            sentiments.push( line[1] );
            features.push(  _.values( processTweet(line[3]) ) );
            console.log( index );
    });
    sentiments = sentiments.map( (x) => x > 0 ? 1 : -1);

    var o = {
        features: features,
        sentiments: sentiments
    };

    fs.writeFileSync( path.normalize( __dirname + '/../model/data.json' ), JSON.stringify(o) );

});
