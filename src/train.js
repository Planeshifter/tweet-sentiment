'use strict';

const fs = require( 'fs' );
const svm = require( 'node-svm' );
const _ = require( 'lodash' );
const util = require( 'util' );

var data = require( '../model/data' );

var dataset = data.features.map( (e, i) => {
    var o = [];
    o[0] = e;
    o[1] = data.sentiments[i];
    return o;
});

var clf = new svm.CSVC({
    kernelType: 'linear',
    probability: true,
    c:[0.005, 0.01,0.125,0.5,1,2]
});

clf.train(dataset)
    .progress( function( rate ) {
        console.log( rate );
    })
    .spread( (trainedModel, trainingReport) => {
        console.log(trainingReport);
        fs.writeFileSync( __dirname + '/../model/model.json', JSON.stringify(trainedModel) );
    });
