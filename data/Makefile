download: NRC Sentiment140 BingLiu NRC_Emotion

NRC:
	wget http://www.saifmohammad.com/WebDocs/NRC-Hashtag-Sentiment-Lexicon-v0.1.zip
	unzip NRC-Hashtag-Sentiment-Lexicon-v0.1.zip
	rm NRC-Hashtag-Sentiment-Lexicon-v0.1.zip
	gunzip NRC-Hashtag-Sentiment-Lexicon-v0.1/unigrams-pmilexicon.txt.gz
	gunzip NRC-Hashtag-Sentiment-Lexicon-v0.1/bigrams-pmilexicon.txt.gz
	gunzip NRC-Hashtag-Sentiment-Lexicon-v0.1/pairs-pmilexicon.txt.gz

Sentiment140:
	wget http://www.umiacs.umd.edu/~saif/WebDocs/Sentiment140-Lexicon-v0.1.zip
	unzip Sentiment140-Lexicon-v0.1.zip
	rm Sentiment140-Lexicon-v0.1.zip
	gunzip Sentiment140-Lexicon-v0.1/unigrams-pmilexicon.txt.gz
	gunzip Sentiment140-Lexicon-v0.1/bigrams-pmilexicon.txt.gz
	gunzip Sentiment140-Lexicon-v0.1/pairs-pmilexicon.txt.gz

BingLiu:
	wget http://www.cs.uic.edu/~liub/FBS/opinion-lexicon-English.rar
	unrar x opinion-lexicon-English.rar
	rm opinion-lexicon-English.rar

NRC_Emotion:
	wget http://saifmohammad.com/Lexicons/NRC-Emotion-Lexicon-v0.92.zip
	unzip NRC-Emotion-Lexicon-v0.92.zip
	rm NRC-Emotion-Lexicon-v0.92.zip

clean:
	rm -rf ./Sentiment140-Lexicon-v0.1
	rm -rf ./__MACOSX
	rm -f negative-words.txt
	rm -f positive-words.txt
	rm -rf ./NRC-Hashtag-Sentiment-Lexicon-v0.1
	rm -rf ./NRC-Emotion-Lexicon-v0.92
	rm -f *.zip
	rm -f *.rar

.PHONY: clean, download
