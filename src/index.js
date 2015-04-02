'use strict';

const R = require( 'ramda' );
const _ = require( 'lodash' );
const pos = require( 'pos' );
const emotions = require( 'emotional-emoticons' );
require( 'plus_arrays' );

const fs = require( 'fs' );

const bingLiuLexicon = {
    positive: fs.readFileSync('data/positive-words.txt').toString().split( '\n' ).filter( (w, i) => i > 34),
    negative: fs.readFileSync('data/negative-words.txt').toString().split( '\n' ).filter( (w, i) => i > 34)
};

const sentiment140Lexicon = fs.readFileSync( 'data/Sentiment140-Lexicon-v0.1/unigrams-pmilexicon.txt' )
    .toString()
    .split( '\n' )
    .map( e => e.split( '\t' ));

const hashtagSentimentLexicon = fs.readFileSync( 'data/NRC-Hashtag-Sentiment-Lexicon-v0.1/unigrams-pmilexicon.txt' )
    .toString()
    .split( '\n' )
    .map( e => e.split( '\t' ));

var emotionLexicon = fs.readFileSync( 'data/NRC-Emotion-Lexicon-v0.92/NRC-emotion-lexicon-wordlevel-alphabetized-v0.92.txt' )
    .toString()
    .split( '\n' )
    .map( e => e.split( '\t' ))
    .filter( e => e[1] === 'positive' || e[1] === 'negative' ).filter( e => e[2] === '1' ? true : false);

function getPartOfSpeechCounts( text ) {
    var words = new pos.Lexer().lex( text );
    var taggedWords = new pos.Tagger().tag(words);
    var tags = taggedWords.map( (w) => w[1] );
    var counts = _.countBy(tags);
    return counts;
}

function replaceURLs( tweet ) {
    var myRegEx = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return tweet.replace( myRegEx, 'someurl');
}

function replaceUsers( tweet ) {
    var myRegEx = /@[A-Za-z0-9_]{1,15}/g;
    return tweet.replace( myRegEx, '@someuser');
}

function getNoHashtags( tweet ) {
    var matches = tweet.match(/\#+[\w_]+[\w\'_\-]*[\w_]+/g);
    return matches ? matches.length : 0;
}


function getNoAllCaps( tweet ) {
    var matches = tweet.match(/\b[A-Z]+\b/g);
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

function markNegatedWords( tweet ) {

    var negationRegEx = '(never|nothing|nowhere|noone|none|not|no|havent|hasnt|hadnt|cant|couldnt|shouldnt|wont|wouldnt|dont|doesnt|didnt|isnt|arent|aint|n\'t)';
    var punctRegEx = '([.:;!?])';
    var myRegEx = new RegExp(negationRegEx + '(.*?)' + punctRegEx, 'gm');

    return tweet.replace( myRegEx, function( $0, $1, $2, $3){
        $2 = $2.split(' ').filter( (w, i) => i > 0 ).map( w => w + '_NEG' ).join(' ');
        return( $1 + ' ' + $2 + $3);
    });
}

function getBingLiuScores( tokens ) {

    var scores = tokens.map( (w) => {
        return bingLiuLexicon.positive.contains(w) ? 1 : bingLiuLexicon.negative.contains(w) ? -1 : 0;
    });

    var output = {
        bingLiu_greaterZero: scores.filter( w => w > 0).length,
        bingLiu_totalScore: scores.reduce( (a, b) => a + b),
        bingLiu_maxScore: scores.max(),
        bingLiu_lastToken: scores.filter( w => w > 0).pop() || 0
    };

    return output;

}

function getSentiment140Scores( tokens ) {

    var scores = tokens.map( (w) => {
        var match = sentiment140Lexicon.filter( e => e[0] === w);
        var res = match.length > 0 ? match[0][1] : 0;
        return parseFloat(res);
    });

    var output = {
        sentiment140_greaterZero: scores.filter( w => w > 0).length,
        sentiment140_totalScore: scores.reduce( (a, b) => a + b),
        sentiment140_maxScore: scores.max(),
        sentiment140_lastToken: scores.filter( w => w > 0).pop() || 0
    };

    return output;
}

function getHashtagSentimentScores( tokens ) {

    var scores = tokens.map( (w) => {
        var match = hashtagSentimentLexicon.filter( e => e[0] === w);
        var res = match.length > 0 ? match[0][1] : 0;
        return parseFloat(res);
    });

    var output = {
        hashtagSentimentLexicon_greaterZero: scores.filter( w => w > 0).length,
        hashtagSentimentLexicon_totalScore: scores.reduce( (a, b) => a + b),
        hashtagSentimentLexicon_maxScore: scores.max(),
        hashtagSentimentLexicon_lastToken: scores.filter( w => w > 0).pop() || 0
    };

    return output;
}

function getEmotionScores( tokens ) {

    var scores = tokens.map( (w) => {
        var match = emotionLexicon.filter( e => e[0] === w);
        var res = match.length > 0 ? match[0][1] : 0;
        return res === 'positive' ? 1 : res === 'negative' ? -1 : 0;
    });

    var output = {
        nrcEmotion_greaterZero: scores.filter( w => w > 0).length,
        nrcEmotion_totalScore: scores.reduce( (a, b) => a + b),
        nrcEmotion_maxScore: scores.max(),
        nrcEmotion_lastToken: scores.filter( w => w > 0).pop() || 0
    };

    return output;
}

function getEmoticonScores ( emoticons ) {

    var getEmoScore = function( icon ) {
        for (let key in emotions) {
            if ( emotions[key].e.contains( icon ) === true ) {
                return emotions[key].p;
            }
        }
    };

    var scores = emoticons.map( (icon) => getEmoScore(icon) );

    var output = {
        emoticon_greaterZero: scores.filter( w => w > 0).length,
        emoticon_totalScore: scores.reduce( (a, b) => a + b),
        emoticon_maxScore: scores.max(),
        emoticon_lastToken: scores.filter( w => w > 0).pop() || 0
    };

    return output;

}


function processTweet( tweet ) {

    var preProcess = R.pipe( replaceURLs, replaceUsers );
    var processedTweet = preProcess(tweet);

    tweet = markNegatedWords(tweet);

    var features = {
        allcaps: getNoAllCaps( processedTweet ),
        hashtags: getNoHashtags( processedTweet ),
        elongated: getNoElongatedWords( processedTweet ),
        negated: getNoNegations( processedTweet )
    };

    var tags =  getPartOfSpeechCounts( processedTweet );
    _.extend(features, tags);

    var tokens = new pos.Lexer().lex( processedTweet );

    var bingLiuScores = getBingLiuScores( tokens );
    _.extend(features, bingLiuScores);

    var sentiment140Scores = getSentiment140Scores( tokens );
    _.extend(features, sentiment140Scores);

    var hashtagSentimentScores = getHashtagSentimentScores( tokens );
    _.extend(features, hashtagSentimentScores);

    var emotionScores = getEmotionScores( tokens );
    _.extend(features, emotionScores);

    var emoticons = getEmoticons( processedTweet);
    var emoticonScores = getEmoticonScores( emoticons );
    _.extend(features, emoticonScores);

    return features;
}

module.exports = processTweet;
