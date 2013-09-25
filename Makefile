LOCALE ?= en_US

GENERATED_FILES = \
	d3.js \
	d3.min.js \
	src/format/format-localized.js \
	src/time/format-localized.js \
	bower.json \
	component.json

all: $(GENERATED_FILES)

.PHONY: clean all test

test:
	@npm test

src/format/format-localized.js: bin/locale src/format/format-locale.js
	LC_NUMERIC=$(LOCALE) LC_MONETARY=$(LOCALE) locale -ck LC_NUMERIC LC_MONETARY | bin/locale src/format/format-locale.js > $@

src/time/format-localized.js: bin/locale src/time/format-locale.js
	LC_TIME=$(LOCALE) locale -ck LC_TIME | bin/locale src/time/format-locale.js > $@

src/start.js: package.json bin/start
	bin/start > $@

d3.js: $(shell node_modules/.bin/smash --list src/d3.js) package.json
	@rm -f $@
	node_modules/.bin/smash src/d3.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	@chmod a-w $@

d3.min.js: d3.js bin/uglify
	@rm -f $@
	bin/uglify $< > $@

%.json: bin/% package.json
	@rm -f $@
	bin/$* > $@
	@chmod a-w $@

clean:
	rm -f -- $(GENERATED_FILES)
