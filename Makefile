GENERATED_FILES = \
	d3.js \
<<<<<<< HEAD
	d3.min.js \
	bower.json \
	component.json
=======
	d3.geom.js \
	d3.layout.js

.INTERMEDIATE d3.js: \
	src/start.js \
	d3.core.js \
	d3.scale.js \
	d3.svg.js \
	d3.behavior.js \
	src/end.js

d3.core.js: \
	src/compat/date.js \
	src/compat/style.js \
	src/core/core.js \
	src/core/array.js \
	src/core/this.js \
	src/core/functor.js \
	src/core/rebind.js \
	src/core/ascending.js \
	src/core/descending.js \
	src/core/mean.js \
	src/core/median.js \
	src/core/min.js \
	src/core/max.js \
	src/core/extent.js \
	src/core/random.js \
	src/core/number.js \
	src/core/sum.js \
	src/core/quantile.js \
	src/core/zip.js \
	src/core/bisect.js \
	src/core/first.js \
	src/core/last.js \
	src/core/nest.js \
	src/core/keys.js \
	src/core/values.js \
	src/core/entries.js \
	src/core/permute.js \
	src/core/merge.js \
	src/core/split.js \
	src/core/collapse.js \
	src/core/range.js \
	src/core/requote.js \
	src/core/round.js \
	src/core/xhr.js \
	src/core/text.js \
	src/core/json.js \
	src/core/html.js \
	src/core/xml.js \
	src/core/ns.js \
	src/core/dispatch.js \
	src/core/format.js \
	src/core/formatPrefix.js \
	src/core/ease.js \
	src/core/event.js \
	src/core/interpolate.js \
	src/core/uninterpolate.js \
	src/core/rgb.js \
	src/core/hsl.js \
	src/core/selection.js \
	src/core/selection-select.js \
	src/core/selection-selectAll.js \
	src/core/selection-attr.js \
	src/core/selection-classed.js \
	src/core/selection-style.js \
	src/core/selection-property.js \
	src/core/selection-text.js \
	src/core/selection-html.js \
	src/core/selection-append.js \
	src/core/selection-insert.js \
	src/core/selection-remove.js \
	src/core/selection-adopt.js \
	src/core/selection-data.js \
	src/core/selection-filter.js \
	src/core/selection-map.js \
	src/core/selection-sort.js \
	src/core/selection-on.js \
	src/core/selection-each.js \
	src/core/selection-call.js \
	src/core/selection-empty.js \
	src/core/selection-node.js \
	src/core/selection-transition.js \
	src/core/selection-root.js \
	src/core/selection-enter.js \
	src/core/selection-enter-select.js \
	src/core/create.js \
	src/core/transition.js \
	src/core/transition-select.js \
	src/core/transition-selectAll.js \
	src/core/transition-attr.js \
	src/core/transition-style.js \
	src/core/transition-text.js \
	src/core/transition-remove.js \
	src/core/transition-delay.js \
	src/core/transition-duration.js \
	src/core/transition-each.js \
	src/core/transition-transition.js \
	src/core/timer.js \
	src/core/transform.js \
	src/core/noop.js
>>>>>>> FETCH_HEAD

all: $(GENERATED_FILES)

.PHONY: clean all test

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

clean:
	rm -f -- $(GENERATED_FILES)
