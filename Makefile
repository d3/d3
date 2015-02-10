GENERATED_FILES = \
	d3.js \
	d3.min.js \
	bower.json \
	component.json \
	package.js

all: $(GENERATED_FILES)

.PHONY: clean all test publish

test:
	@npm test

src/start.js: package.json bin/start
	bin/start > $@

d3.zip: LICENSE d3.js d3.min.js
	zip $@ $^

d3.js: $(shell node_modules/.bin/smash --ignore-missing --list src/d3.js) package.json
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

package.js: bin/meteor package.json
	@rm -f $@
	bin/meteor > package.js
	@chmod a-w $@

publish:
	npm publish
	meteor publish && rm -- .versions

clean:
	rm -f -- $(GENERATED_FILES)
