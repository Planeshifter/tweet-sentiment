MAKE ?= make
# BABEL
BABEL ?= ./node_modules/.bin/babel

all:
	$(BABEL) -d lib/ src/

clean:
	rm -f lib/*.js

download:
	$(MAKE) -C data download

clean-data:
	$(MAKE) -C data clean


.PHONY: clean, all, download
