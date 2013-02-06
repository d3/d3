# See the README for installation instructions.

NODE_PATH ?= ./node_modules
JS_UGLIFY = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_TESTER = $(NODE_PATH)/vows/bin/vows
LOCALE ?= en_US

all: \
	d3.js \
	d3.min.js \
	component.json \
	package.json

# Modify this rule to build your own custom release.

.INTERMEDIATE d3.js: \
	src/start.js \
	d3.core.js \
	d3.scale.js \
	d3.svg.js \
	d3.behavior.js \
	d3.layout.js \
	d3.dsv.js \
	d3.geo.js \
	d3.geom.js \
	d3.time.js \
	src/end.js

d3.core.js: \
	src/core/core.js \
	src/core/format-$(LOCALE).js \
	src/compat/date.js \
	src/compat/style.js \
	src/core/class.js \
	src/core/array.js \
	src/core/map.js \
	src/core/identity.js \
	src/core/true.js \
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
	src/core/shuffle.js \
	src/core/transpose.js \
	src/core/zip.js \
	src/core/bisect.js \
	src/core/nest.js \
	src/core/keys.js \
	src/core/values.js \
	src/core/entries.js \
	src/core/permute.js \
	src/core/merge.js \
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
	src/core/transform.js \
	src/core/interpolate.js \
	src/core/uninterpolate.js \
	src/core/color.js \
	src/core/rgb.js \
	src/core/hsl.js \
	src/core/hcl.js \
	src/core/lab.js \
	src/core/xyz.js \
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
	src/core/selection-data.js \
	src/core/selection-datum.js \
	src/core/selection-filter.js \
	src/core/selection-order.js \
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
	src/core/transition.js \
	src/core/transition-select.js \
	src/core/transition-selectAll.js \
	src/core/transition-filter.js \
	src/core/transition-attr.js \
	src/core/transition-style.js \
	src/core/transition-text.js \
	src/core/transition-remove.js \
	src/core/transition-ease.js \
	src/core/transition-delay.js \
	src/core/transition-duration.js \
	src/core/transition-each.js \
	src/core/transition-transition.js \
	src/core/transition-tween.js \
	src/core/timer.js \
	src/core/mouse.js \
	src/core/touches.js \
	src/core/noop.js

d3.scale.js: \
	src/scale/scale.js \
	src/scale/nice.js \
	src/scale/linear.js \
	src/scale/bilinear.js \
	src/scale/polylinear.js \
	src/scale/log.js \
	src/scale/pow.js \
	src/scale/sqrt.js \
	src/scale/ordinal.js \
	src/scale/category.js \
	src/scale/quantile.js \
	src/scale/quantize.js \
	src/scale/threshold.js \
	src/scale/identity.js

d3.svg.js: \
	src/svg/svg.js \
	src/svg/arc.js \
	src/svg/line.js \
	src/svg/line-radial.js \
	src/svg/area.js \
	src/svg/area-radial.js \
	src/svg/chord.js \
	src/svg/diagonal.js \
	src/svg/diagonal-radial.js \
	src/svg/symbol.js \
	src/svg/axis.js \
	src/svg/brush.js

d3.behavior.js: \
	src/behavior/behavior.js \
	src/behavior/drag.js \
	src/behavior/zoom.js

d3.layout.js: \
	src/layout/layout.js \
	src/layout/bundle.js \
	src/layout/chord.js \
	src/layout/force.js \
	src/layout/partition.js \
	src/layout/pie.js \
	src/layout/stack.js \
	src/layout/histogram.js \
	src/layout/hierarchy.js \
	src/layout/pack.js \
	src/layout/cluster.js \
	src/layout/tree.js \
	src/layout/treemap.js

d3.geo.js: \
	src/geo/geo.js \
	src/geo/stream.js \
	src/geo/spherical.js \
	src/geo/cartesian.js \
	src/geo/resample.js \
	src/geo/albers-usa.js \
	src/geo/albers.js \
	src/geo/azimuthal-equal-area.js \
	src/geo/azimuthal-equidistant.js \
	src/geo/bounds.js \
	src/geo/centroid.js \
	src/geo/circle.js \
	src/geo/clip.js \
	src/geo/clip-antimeridian.js \
	src/geo/clip-circle.js \
	src/geo/compose.js \
	src/geo/equirectangular.js \
	src/geo/gnomonic.js \
	src/geo/graticule.js \
	src/geo/interpolate.js \
	src/geo/greatArc.js \
	src/geo/mercator.js \
	src/geo/orthographic.js \
	src/geo/path.js \
	src/geo/path-buffer.js \
	src/geo/path-context.js \
	src/geo/path-area.js \
	src/geo/path-centroid.js \
	src/geo/area.js \
	src/geo/centroid.js \
	src/geo/projection.js \
	src/geo/rotation.js \
	src/geo/stereographic.js \
	src/geo/azimuthal.js

d3.dsv.js: \
	src/dsv/dsv.js \
	src/dsv/csv.js \
	src/dsv/tsv.js

d3.time.js: \
	src/time/time.js \
	src/time/format-$(LOCALE).js \
	src/time/format.js \
	src/time/format-utc.js \
	src/time/format-iso.js \
	src/time/interval.js \
	src/time/second.js \
	src/time/minute.js \
	src/time/hour.js \
	src/time/day.js \
	src/time/week.js \
	src/time/month.js \
	src/time/year.js \
	src/time/scale.js \
	src/time/scale-utc.js

d3.geom.js: \
	src/geom/geom.js \
	src/geom/hull.js \
	src/geom/polygon.js \
	src/geom/voronoi.js \
	src/geom/delaunay.js \
	src/geom/quadtree.js

test: all
	@$(JS_TESTER)

benchmark: all
	@node test/geo/benchmark.js

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_UGLIFY) $< -c -m -o $@

d3%js: Makefile
	@rm -f $@
	@cat $(filter %.js,$^) > $@.tmp
	$(JS_UGLIFY) $@.tmp -b indent-level=2 -o $@
	@rm $@.tmp
	@chmod a-w $@

component.json: src/component.js
	@rm -f $@
	node src/component.js > $@
	@chmod a-w $@

package.json: src/package.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@

src/core/format-$(LOCALE).js: src/locale.js src/core/format-locale.js
	LC_NUMERIC=$(LOCALE) locale -ck LC_NUMERIC | node src/locale.js src/core/format-locale.js > $@

src/time/format-$(LOCALE).js: src/locale.js src/time/format-locale.js
	LC_TIME=$(LOCALE) locale -ck LC_TIME | node src/locale.js src/time/format-locale.js > $@

.INTERMEDIATE: \
	src/core/format-$(LOCALE).js \
	src/time/format-$(LOCALE).js

clean:
	rm -f d3*.js package.json component.json
