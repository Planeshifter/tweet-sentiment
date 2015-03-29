var R = require( 'ramda' );

function replaceURLs( tweet ) {
    var myRegEx = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return tweet.replace( myRegEx, "someurl");
}

function replaceUsers( tweet ) {
    var myRegEx = /@[A-Za-z0-9_]{1,15}/g;
    return tweet.replace( myRegEx, "@someuser");
}

function getNoHashtags( tweet ) {
    var matches = tweet.match(/\#+[\w_]+[\w\'_\-]*[\w_]+/g);
    return matches ? matches.length : 0;
}

function getEmoticons( tweet ) {
    var emoticonRegEx = /[<>]?[:;=8][\-o\*\']?[\)\]\(\[dDpP/\:\}\{@\|\\]|[\)\]\(\[dDpP/\:\}\{@\|\\][\-o\*\']?[:;=8][<>]?/g;
    return tweet.match( emoticonRegEx );
}

function getNoElongatedWords( tweet ) {
    var isElongated = /\b[A-Za-z]*([a-zA-Z])\1\1[A-Za-z]*\b/g;
    var matches = tweet.match( isElongated );
    return matches ? matches.length : 0;
}

function getNoNegations( tweet ) {
    var negationRegEx = '(?:(?:never|no|nothing|nowhere|noone|none|not|havent|hasnt|hadnt|cant|couldnt|shouldnt|wont|wouldnt|dont|doesnt|didnt|isnt|arent|aint))|n\'t';
    var punctRegEx = '[.:;!?]';
    var myRegEx = new RegExp(negationRegEx + '(.*?)' + punctRegEx, 'gm');
    var matches = tweet.match( myRegEx );
    return matches ? matches.length : 0;
}


function processTweet( tweet ) {

    var preProcess = R.pipe( replaceURLs, replaceUsers );
    var processedTweet = preProcess(tweet);

    var features = {
        hashtags: getNoHashtags( processedTweet ),
        elongated: getNoElongatedWords( processedTweet ),
        negated: getNoNegations( processedTweet )
    };

    return features;
}


console.log( processTweet( "I would never do this. I am not a liar. While you wait for the Ellen Pao verdict #feminism, read @daveyalba's sooo cool reporting on the case that's gripping the tech industry http://wrd.cm/1D7Uphk") );
