MAKE ?= make
# BABEL
BABEL ?= ./node_modules/.bin/babel

all:
	$(BABEL) -d lib/ src/

clean:
	rm lib/*.js

download:
	$(MAKE) -C data download


.PHONY: clean, all, download
