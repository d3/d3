LOCALE ?= en_US

GENERATED_FILES = \
	d3.js \
	d3.min.js \
	component.json

all: $(GENERATED_FILES)

.PHONY: clean all test

test:
	@npm test

benchmark: all
	@node test/geo/benchmark.js

src/format/format-localized.js: bin/locale src/format/format-locale.js
	LC_NUMERIC=$(LOCALE) locale -ck LC_NUMERIC | bin/locale src/format/format-locale.js > $@

src/time/format-localized.js: bin/locale src/time/format-locale.js
	LC_TIME=$(LOCALE) locale -ck LC_TIME | bin/locale src/time/format-locale.js > $@

src/start.js: package.json bin/start
	bin/start > $@

d3.js: $(shell node_modules/.bin/smash --list src/d3.js) package.json
	@rm -f $@
	node_modules/.bin/smash src/d3.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	@chmod a-w $@

d3.min.js: d3.js
	@rm -f $@
	bin/uglify $< > $@

component.json: bin/component package.json
	@rm -f $@
	bin/component > $@
	@chmod a-w $@

clean:
	rm -f -- $(GENERATED_FILES)
