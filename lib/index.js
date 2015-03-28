var R = require( 'ramda' );

function replaceURLs( tweet ) {
    var myRegEx = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return tweet.replace( myRegEx, "someurl");
}

function replaceUsers( tweet ) {
    var myRegEx = /@[A-Za-z0-9_]{1,15}/g;
    return tweet.replace( myRegEx, "@someuser");
}


function processTweet( tweet ) {

    var preProcess = R.pipe( replaceURLs, replaceUsers );

    return preProcess(tweet);
}


console.log( processTweet( "While you wait for the Ellen Pao verdict, read @daveyalba's reporting on the case that's gripping the tech industry http://wrd.cm/1D7Uphk") );
