'use strict';

// load modules
const program       = require( 'commander' );
const fs            = require( 'fs' );
const predict       = require( './predict.js');

var predictedSentiments = [];

program
    .version('0.1.0');

program
    .command('predict <input>')
    .description('predict sentiment of tweets')
    .option('-o, --output [value]', 'File name of generated JSON file')
    .action( (input, options) => {
        var inputData = fs.createReadStream( input );
        readLines( inputData, makePrediction, options );
    });

program
.parse(process.argv);

function readLines( input, func, options ) {
    var remaining = '';

    input.on( 'data', (data) => {
        remaining += data;
        var index = remaining.indexOf( '\n' );
        while ( index > -1 ) {
            var line = remaining.substring( 0, index );
            remaining = remaining.substring( index + 1 );
            func( line );
            index = remaining.indexOf( '\n' );
        }
    });

    input.on( 'end', () => {
        if ( remaining.length > 0 ) {
            func(remaining);
        }

        savePredictions( options );

    });
}

function makePrediction( text ) {
    predictedSentiments.push( predict( text ) );
}

function savePredictions( options ) {
    fs.writeFileSync( options.output, JSON.stringify(predictedSentiments) );
}
