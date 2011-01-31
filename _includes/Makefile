SRC_FILES = \
	../d3.js \
	../d3.min.js \
	../d3.csv.js \
	../d3.csv.min.js \
	../d3.geo.js \
	../d3.geo.min.js \
	../d3.geom.js \
	../d3.geom.min.js \
	../d3.layout.js \
	../d3.layout.min.js \
	../d3.time.js \
	../d3.time.min.js

EX_FILES = \
	../ex/calendar.js \
	../ex/calendar.css \
	../ex/dji.csv \
	../ex/dji.js \
	../ex/colorbrewer.css

INCLUDE_FILES = \
	dji.js

.PHONY all: $(SRC_FILES) $(EX_FILES) $(INCLUDE_FILES)

$(SRC_FILES):
	git cat-file blob master:$(subst ../,,$@) > $@

../ex/calendar.js:
	git cat-file blob master:examples/calendar/calendar.js > $@

../ex/calendar.css:
	git cat-file blob master:examples/calendar/calendar.css > $@

../ex/dji.js dji.js:
	git cat-file blob master:examples/calendar/dji.js > $@

../ex/dji.csv:
	git cat-file blob master:examples/calendar/dji.csv > $@

../ex/colorbrewer.css:
	git cat-file blob master:lib/colorbrewer/colorbrewer.css > $@
