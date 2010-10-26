JS_COMPILER = \
	java -jar lib/google-compiler/compiler.jar \
	--externs=src/externs.js \
	--warning_level=VERBOSE \
	--charset=UTF-8

SRC_FILES = \
	src/date.js \
	src/object.js \
	src/start.js \
	src/array.js \
	src/blend.js \
	src/call.js \
	src/range.js \
	src/ns.js \
	src/dispatch.js \
	src/format.js \
	src/ease.js \
	src/event.js \
	src/interpolate.js \
	src/rgb.js \
	src/hsl.js \
	src/linear.js \
	src/log.js \
	src/pow.js \
	src/sqrt.js \
	src/ordinal.js \
	src/category.js \
	src/root.js \
	src/select.js \
	src/selectAll.js \
	src/selection.js \
	src/transition.js \
	src/timer.js \
	src/tween.js \
	src/arc.js \
	src/line.js \
	src/area.js \
	src/end.js

all: d3.js d3.min.js

d3.min.js: d3.js Makefile src/externs.js
	rm -f $@
	$(JS_COMPILER) --js $< --js_output_file $@

d3.js: $(SRC_FILES) Makefile
	rm -f $@
	cat $(SRC_FILES) >> $@
	chmod a-w $@

clean:
	rm -f d3.js d3.min.js
