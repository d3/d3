JS_COMPILER = \
	./lib/uglifyjs/bin/uglifyjs

all: \
	d3.js \
	d3.min.js \
	d3.behavior.js \
	d3.behavior.min.js \
	d3.chart.js \
	d3.chart.min.js \
	d3.layout.js \
	d3.layout.min.js \
	d3.csv.js \
	d3.csv.min.js \
	d3.geo.js \
	d3.geo.min.js \
	d3.geom.js \
	d3.geom.min.js \
	d3.time.js \
	d3.time.min.js

.INTERMEDIATE d3.js: \
	src/start.js \
	d3.core.js \
	d3.scale.js \
	d3.svg.js \
	src/end.js

d3.core.js: \
	src/core/core.js \
	src/core/date.js \
	src/core/object.js \
	src/core/array.js \
	src/core/functor.js \
	src/core/rebind.js \
	src/core/ascending.js \
	src/core/descending.js \
	src/core/min.js \
	src/core/max.js \
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
	src/core/call.js \
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
	src/core/ease.js \
	src/core/event.js \
	src/core/interpolate.js \
	src/core/uninterpolate.js \
	src/core/rgb.js \
	src/core/hsl.js \
	src/core/selection.js \
	src/core/transition.js \
	src/core/timer.js \
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
	src/scale/quantize.js

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
	src/svg/mouse.js \
	src/svg/touches.js \
	src/svg/symbol.js

d3.behavior.js: \
	src/start.js \
	src/behavior/behavior.js \
	src/behavior/zoom.js \
	src/end.js

d3.chart.js: \
	src/start.js \
	src/chart/chart.js \
	src/chart/box.js \
	src/chart/bullet.js \
	src/chart/horizon.js \
	src/chart/qq.js \
	src/end.js

d3.layout.js: \
	src/start.js \
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
	src/layout/treemap.js \
	src/end.js

d3.geo.js: \
	src/start.js \
	src/geo/geo.js \
	src/geo/azimuthal.js \
	src/geo/albers.js \
	src/geo/mercator.js \
	src/geo/path.js \
	src/geo/bounds.js \
	src/end.js

d3.csv.js: \
	src/start.js \
	src/csv/csv.js \
	src/csv/parse.js \
	src/csv/format.js \
	src/end.js

d3.time.js: \
	src/start.js \
	src/time/time.js \
	src/time/format.js \
	src/time/format-utc.js \
	src/time/format-iso.js \
	src/time/range.js \
	src/time/second.js \
	src/time/seconds.js \
	src/time/minute.js \
	src/time/minutes.js \
	src/time/hour.js \
	src/time/hours.js \
	src/time/day.js \
	src/time/days.js \
	src/time/week.js \
	src/time/weeks.js \
	src/time/month.js \
	src/time/months.js \
	src/time/year.js \
	src/time/years.js \
	src/time/scale.js \
	src/time/scale-utc.js \
	src/end.js

d3.geom.js: \
	src/start.js \
	src/geom/geom.js \
	src/geom/contour.js \
	src/geom/hull.js \
	src/geom/polygon.js \
	src/geom/voronoi.js \
	src/geom/delaunay.js \
	src/geom/quadtree.js \
	src/end.js

test: \
	test/core \
	test/csv \
	test/layout \
	test/scale \
	test/svg \
	test/time

test/core: \
	test/core/test-append.test \
	test/core/test-attr.test \
	test/core/test-bisect.test \
	test/core/test-call.test \
	test/core/test-classed.test \
	test/core/test-format.test \
	test/core/test-hsl.test \
	test/core/test-insert.test \
	test/core/test-interpolate.test \
	test/core/test-keys.test \
	test/core/test-max.test \
	test/core/test-min.test \
	test/core/test-nest.test \
	test/core/test-permute.test \
	test/core/test-remove.test \
	test/core/test-rgb.test \
	test/core/test-round.test \
	test/core/test-sum.test \
	test/core/test-transition.test \
	test/core/test-zip.test

test/csv: \
	test/csv/test-parse.test

test/layout: \
	test/layout/test-histogram.test \
	test/layout/test-treemap.test

test/scale: \
	test/scale/test-linear.test \
	test/scale/test-log.test \
	test/scale/test-polylinear.test \
	test/scale/test-pow.test \
	test/scale/test-quantile.test \
	test/scale/test-sqrt.test \
	test/scale/test-ordinal.test

test/svg: \
	test/svg/test-arc.test \
	test/svg/test-area.test \
	test/svg/test-line.test \
	test/svg/test-symbol.test

test/time: \
	test/time/test-day.test \
	test/time/test-days.test \
	test/time/test-format-iso.test \
	test/time/test-format-utc.test \
	test/time/test-format.test \
	test/time/test-hour.test \
	test/time/test-hours.test \
	test/time/test-minute.test \
	test/time/test-minutes.test \
	test/time/test-month.test \
	test/time/test-months.test \
	test/time/test-parse-iso.test \
	test/time/test-parse-utc.test \
	test/time/test-parse.test \
	test/time/test-scale.test \
	test/time/test-scale-utc.test \
	test/time/test-second.test \
	test/time/test-seconds.test \
	test/time/test-week.test \
	test/time/test-weeks.test \
	test/time/test-year.test \
	test/time/test-years.test

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

d3.js d3%.js: Makefile
	@rm -f $@
	cat $(filter %.js,$^) > $@
	@chmod a-w $@

%.test: %.js %.out all
	@/bin/echo -n "test: $* "
	@node $< > $*.actual
	@diff -U 3 $*.out $*.actual && rm -f $*.actual \
		&& echo '\033[1;32mPASS\033[0m' \
		|| echo test: $* '\033[1;31mFAIL\033[0m'

clean:
	rm -f d3*.js
