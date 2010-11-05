JS_COMPILER = \
	java -jar lib/google-compiler/compiler.jar \
	--externs=src/externs.js \
	--warning_level=VERBOSE \
	--compilation_level=ADVANCED_OPTIMIZATIONS \
	--charset=UTF-8 \
	--output_wrapper='(function(){%output%})()'

all: \
  d3.js \
  d3.min.js \
  d3.csv.js \
  d3.csv.min.js

.INTERMEDIATE d3.js: \
	d3.core.js \
	d3.scale.js \
	d3.svg.js \
	d3.geo.js

d3.core.js: \
	src/core/core.js \
	src/core/date.js \
	src/core/object.js \
	src/core/array.js \
	src/core/blend.js \
	src/core/call.js \
	src/core/range.js \
	src/core/text.js \
	src/core/json.js \
	src/core/ns.js \
	src/core/dispatch.js \
	src/core/format.js \
	src/core/ease.js \
	src/core/event.js \
	src/core/interpolate.js \
	src/core/rgb.js \
	src/core/hsl.js \
	src/core/selection.js \
	src/core/transition.js \
	src/core/timer.js \
	src/core/tween.js

d3.scale.js: \
	src/scale/scale.js \
	src/scale/linear.js \
	src/scale/log.js \
	src/scale/pow.js \
	src/scale/sqrt.js \
	src/scale/ordinal.js \
	src/scale/category.js

d3.svg.js: \
	src/svg/svg.js \
	src/svg/arc.js \
	src/svg/line.js \
	src/svg/area.js

d3.geo.js: \
  src/geo/geo.js \
  src/geo/albers.js \
  src/geo/path.js

d3.csv.js: \
  src/csv/csv.js \
  src/csv/parse.js \
  src/csv/format.js

%.min.js: %.js Makefile src/externs.js
	@rm -f $@
	$(JS_COMPILER) --js $< --js_output_file $@

d3.js d3%.js: Makefile
	@rm -f $@
	cat $(filter %.js,$^) > $@
	@chmod a-w $@

clean:
	rm -f d3*.js
