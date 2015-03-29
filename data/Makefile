download: Sentiment140 BingLiu

Sentiment140:
	wget http://www.umiacs.umd.edu/~saif/WebDocs/Sentiment140-Lexicon-v0.1.zip
	unzip Sentiment140-Lexicon-v0.1.zip
	rm Sentiment140-Lexicon-v0.1.zip

BingLiu:
	wget http://www.cs.uic.edu/~liub/FBS/opinion-lexicon-English.rar
	unrar x opinion-lexicon-English.rar
	rm *.rar

clean:
	rm -rf ./Sentiment140-Lexicon-v0.1
	rm -rf ./__MACOSX
	rm negative-words.txt
	rm positive-words.txt

.PHONY: clean, download
