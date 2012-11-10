# See the README for installation instructions.

NODE_PATH ?= ./node_modules
JS_COMPILER = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_BEAUTIFIER = $(NODE_PATH)/uglify-js/bin/uglifyjs -b -i 2 -nm -ns
JS_TESTER_OPTS ?= ""
JS_TESTER = $(NODE_PATH)/vows/bin/vows $(JS_TESTER_OPTS)
LOCALE ?= en_US
SRC ?= src

all: \
	d3.v2.js \
	d3.v2.min.js \
	component.json \
	package.json

# Modify this rule to build your own custom release.

.INTERMEDIATE d3.v2.js: \
	$(SRC)/start.js \
	d3.core.js \
	d3.scale.js \
	d3.svg.js \
	d3.behavior.js \
	d3.layout.js \
	d3.dsv.js \
	d3.geo.js \
	d3.geom.js \
	d3.time.js \
	$(SRC)/end.js

d3.core.js: \
	$(SRC)/compat/date.js \
	$(SRC)/compat/style.js \
	$(SRC)/core/core.js \
	$(SRC)/core/class.js \
	$(SRC)/core/array.js \
	$(SRC)/core/map.js \
	$(SRC)/core/identity.js \
	$(SRC)/core/this.js \
	$(SRC)/core/true.js \
	$(SRC)/core/functor.js \
	$(SRC)/core/rebind.js \
	$(SRC)/core/ascending.js \
	$(SRC)/core/descending.js \
	$(SRC)/core/mean.js \
	$(SRC)/core/median.js \
	$(SRC)/core/min.js \
	$(SRC)/core/max.js \
	$(SRC)/core/extent.js \
	$(SRC)/core/random.js \
	$(SRC)/core/number.js \
	$(SRC)/core/sum.js \
	$(SRC)/core/quantile.js \
	$(SRC)/core/transpose.js \
	$(SRC)/core/zip.js \
	$(SRC)/core/bisect.js \
	$(SRC)/core/first.js \
	$(SRC)/core/last.js \
	$(SRC)/core/nest.js \
	$(SRC)/core/keys.js \
	$(SRC)/core/values.js \
	$(SRC)/core/entries.js \
	$(SRC)/core/permute.js \
	$(SRC)/core/merge.js \
	$(SRC)/core/split.js \
	$(SRC)/core/collapse.js \
	$(SRC)/core/range.js \
	$(SRC)/core/requote.js \
	$(SRC)/core/round.js \
	$(SRC)/core/xhr.js \
	$(SRC)/core/text.js \
	$(SRC)/core/json.js \
	$(SRC)/core/html.js \
	$(SRC)/core/xml.js \
	$(SRC)/core/ns.js \
	$(SRC)/core/dispatch.js \
	$(SRC)/core/format.js \
	$(SRC)/core/formatPrefix.js \
	$(SRC)/core/ease.js \
	$(SRC)/core/event.js \
	$(SRC)/core/transform.js \
	$(SRC)/core/interpolate.js \
	$(SRC)/core/uninterpolate.js \
	$(SRC)/core/color.js \
	$(SRC)/core/rgb.js \
	$(SRC)/core/hsl.js \
	$(SRC)/core/hcl.js \
	$(SRC)/core/lab.js \
	$(SRC)/core/xyz.js \
	$(SRC)/core/selection.js \
	$(SRC)/core/selection-select.js \
	$(SRC)/core/selection-selectAll.js \
	$(SRC)/core/selection-attr.js \
	$(SRC)/core/selection-classed.js \
	$(SRC)/core/selection-style.js \
	$(SRC)/core/selection-property.js \
	$(SRC)/core/selection-text.js \
	$(SRC)/core/selection-html.js \
	$(SRC)/core/selection-append.js \
	$(SRC)/core/selection-insert.js \
	$(SRC)/core/selection-remove.js \
	$(SRC)/core/selection-data.js \
	$(SRC)/core/selection-datum.js \
	$(SRC)/core/selection-filter.js \
	$(SRC)/core/selection-order.js \
	$(SRC)/core/selection-sort.js \
	$(SRC)/core/selection-on.js \
	$(SRC)/core/selection-each.js \
	$(SRC)/core/selection-call.js \
	$(SRC)/core/selection-empty.js \
	$(SRC)/core/selection-node.js \
	$(SRC)/core/selection-transition.js \
	$(SRC)/core/selection-root.js \
	$(SRC)/core/selection-enter.js \
	$(SRC)/core/selection-enter-select.js \
	$(SRC)/core/transition.js \
	$(SRC)/core/transition-select.js \
	$(SRC)/core/transition-selectAll.js \
	$(SRC)/core/transition-filter.js \
	$(SRC)/core/transition-attr.js \
	$(SRC)/core/transition-style.js \
	$(SRC)/core/transition-text.js \
	$(SRC)/core/transition-remove.js \
	$(SRC)/core/transition-delay.js \
	$(SRC)/core/transition-duration.js \
	$(SRC)/core/transition-each.js \
	$(SRC)/core/transition-transition.js \
	$(SRC)/core/tween.js \
	$(SRC)/core/timer.js \
	$(SRC)/core/mouse.js \
	$(SRC)/core/touches.js \
	$(SRC)/core/noop.js

d3.scale.js: \
	$(SRC)/scale/scale.js \
	$(SRC)/scale/nice.js \
	$(SRC)/scale/linear.js \
	$(SRC)/scale/bilinear.js \
	$(SRC)/scale/polylinear.js \
	$(SRC)/scale/log.js \
	$(SRC)/scale/pow.js \
	$(SRC)/scale/sqrt.js \
	$(SRC)/scale/ordinal.js \
	$(SRC)/scale/category.js \
	$(SRC)/scale/quantile.js \
	$(SRC)/scale/quantize.js \
	$(SRC)/scale/threshold.js \
	$(SRC)/scale/identity.js

d3.svg.js: \
	$(SRC)/svg/svg.js \
	$(SRC)/svg/arc.js \
	$(SRC)/svg/line.js \
	$(SRC)/svg/line-radial.js \
	$(SRC)/svg/area.js \
	$(SRC)/svg/area-radial.js \
	$(SRC)/svg/chord.js \
	$(SRC)/svg/diagonal.js \
	$(SRC)/svg/diagonal-radial.js \
	$(SRC)/svg/mouse.js \
	$(SRC)/svg/touches.js \
	$(SRC)/svg/symbol.js \
	$(SRC)/svg/axis.js \
	$(SRC)/svg/brush.js

d3.behavior.js: \
	$(SRC)/behavior/behavior.js \
	$(SRC)/behavior/drag.js \
	$(SRC)/behavior/zoom.js

d3.layout.js: \
	$(SRC)/layout/layout.js \
	$(SRC)/layout/bundle.js \
	$(SRC)/layout/chord.js \
	$(SRC)/layout/force.js \
	$(SRC)/layout/partition.js \
	$(SRC)/layout/pie.js \
	$(SRC)/layout/stack.js \
	$(SRC)/layout/histogram.js \
	$(SRC)/layout/hierarchy.js \
	$(SRC)/layout/pack.js \
	$(SRC)/layout/cluster.js \
	$(SRC)/layout/tree.js \
	$(SRC)/layout/treemap.js

d3.geo.js: \
	$(SRC)/geo/geo.js \
	$(SRC)/geo/azimuthal.js \
	$(SRC)/geo/albers.js \
	$(SRC)/geo/bonne.js \
	$(SRC)/geo/equirectangular.js \
	$(SRC)/geo/mercator.js \
	$(SRC)/geo/type.js \
	$(SRC)/geo/path.js \
	$(SRC)/geo/bounds.js \
	$(SRC)/geo/circle.js \
	$(SRC)/geo/greatArc.js \
	$(SRC)/geo/greatCircle.js

d3.dsv.js: \
	$(SRC)/dsv/dsv.js \
	$(SRC)/dsv/csv.js \
	$(SRC)/dsv/tsv.js

d3.time.js: \
	$(SRC)/time/time.js \
	$(SRC)/time/format-$(LOCALE).js \
	$(SRC)/time/format.js \
	$(SRC)/time/format-utc.js \
	$(SRC)/time/format-iso.js \
	$(SRC)/time/interval.js \
	$(SRC)/time/second.js \
	$(SRC)/time/minute.js \
	$(SRC)/time/hour.js \
	$(SRC)/time/day.js \
	$(SRC)/time/week.js \
	$(SRC)/time/month.js \
	$(SRC)/time/year.js \
	$(SRC)/time/scale.js \
	$(SRC)/time/scale-utc.js

d3.geom.js: \
	$(SRC)/geom/geom.js \
	$(SRC)/geom/contour.js \
	$(SRC)/geom/hull.js \
	$(SRC)/geom/polygon.js \
	$(SRC)/geom/voronoi.js \
	$(SRC)/geom/delaunay.js \
	$(SRC)/geom/quadtree.js

test: all
	@$(JS_TESTER)

test-cov:
	rm -rf $(SRC)-cov;
	jscoverage --encoding=utf-8 --exclude=start.js --exclude=end.js  $(SRC) $(SRC)-cov;
	for file in start.js end.js; do cp $(SRC)/$$file $(SRC)-cov/$$file; done
	SRC=$(SRC)-cov JS_TESTER_OPTS="--cover-html" make test
	open coverage.html

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

d3%.js: Makefile
	@rm -f $@
	cat $(filter %.js,$^) | $(JS_BEAUTIFIER) > $@
	@chmod a-w $@

component.json: $(SRC)/component.js
	@rm -f $@
	node $(SRC)/component.js > $@
	@chmod a-w $@

package.json: $(SRC)/package.js
	@rm -f $@
	node $(SRC)/package.js > $@
	@chmod a-w $@

clean:
	rm -f d3*.js package.json component.json
