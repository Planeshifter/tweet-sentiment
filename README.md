[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]

# tweet-sentiment

> SVM Classifier to Detect Sentiment of Tweets. The package implements the procedure described in ["NRC-Canada: Building the State-of-the-Art in the paper
Sentiment Analysis of Tweets"](http://www.umiacs.umd.edu/~saif/WebDocs/sentimentMKZ.pdf) by Saif M. Mohammad, Svetlana Kiritchenko, and Xiaodan Zhu

## Installation

The tool should be installed globally such that it can be invoked from any directory in the terminal via the command tweet-sentiment.

```
npm install tweet-sentiment -g
```

## Getting Started

After installation, it is possible to obtain help about the possible options of the program by typing

```
tweet-sentiment --help
```

## Command Line Interface

### tweet-sentiment predict [options] \<file\>

First Header  | Second Header
------------- | -------------
-h, --help            | output usage information
-o, --output [value]  | Name of output file

[npm-image]: https://badge.fury.io/js/tweet-sentiment.svg
[npm-url]: http://badge.fury.io/js/tweet-sentiment

[travis-image]: https://travis-ci.org/Planeshifter/tweet-sentiment.svg
[travis-url]: https://travis-ci.org/Planeshifter/tweet-sentiment

[coveralls-image]: https://img.shields.io/coveralls/Planeshifter/tweet-sentiment/master.svg
[coveralls-url]: https://coveralls.io/r/Planeshifter/tweet-sentiment?branch=master

[dependencies-image]: http://img.shields.io/david/Planeshifter/tweet-sentiment.svg
[dependencies-url]: https://david-dm.org/Planeshifter/tweet-sentiment
