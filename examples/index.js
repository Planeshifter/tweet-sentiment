'use strict';

var ts = require( '../lib/index.js');

var tweets = [
    'New poll shows more than half of Americans feel shaky about the economy. RETWEET if you are one of them. @FoxBusiness',
    'Labour have NO credibility on the economy. We all know @Ed_Miliband has never had a proper job & doesn\'t know first thing about business',
    'GOP is already complaining Obama won\'t be around to clean up the mess. Republicans are never good at handling peace and a strong economy.',
    'Two-thirds of leading UK economists say coalition austerity had been bad for the economy',
    'Great example of how lucrative the sharing economy can be'
];

console.log( ts.predict( tweets ) );
