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
	../ex/chord.css \
	../ex/chord.js \
	../ex/choropleth.css \
	../ex/choropleth.js \
	../ex/colorbrewer.css \
	../ex/dji.csv \
	../ex/dji.js \
	../ex/force.css \
	../ex/force.js \
	../ex/force_layout.js \
	../ex/miserables.json \
	../ex/unemployment.json \
	../ex/us-counties.json \
	../ex/us-states.json

INCLUDE_FILES = \
	chord.js \
	choropleth.js \
	dji.js \
	force.js

.PHONY all: $(SRC_FILES) $(EX_FILES) $(INCLUDE_FILES)

$(SRC_FILES):
	@rm -rf $@
	git cat-file blob master:$(subst ../,,$@) > $@

../ex/calendar.js:
	@rm -rf $@
	git cat-file blob master:examples/calendar/calendar.js > $@

../ex/calendar.css:
	@rm -rf $@
	git cat-file blob master:examples/calendar/calendar.css > $@

../ex/chord.css:
	@rm -rf $@
	git cat-file blob master:examples/chord/chord.css > $@

../ex/chord.js chord.js:
	@rm -rf $@
	git cat-file blob master:examples/chord/chord.js > $@

../ex/choropleth.css:
	@rm -rf $@
	git cat-file blob master:examples/choropleth/choropleth.css > $@

../ex/choropleth.js choropleth.js:
	@rm -rf $@
	git cat-file blob master:examples/choropleth/choropleth.js > $@

../ex/colorbrewer.css:
	@rm -rf $@
	git cat-file blob master:lib/colorbrewer/colorbrewer.css > $@

../ex/dji.js dji.js:
	@rm -rf $@
	git cat-file blob master:examples/calendar/dji.js > $@

../ex/dji.csv:
	@rm -rf $@
	git cat-file blob master:examples/calendar/dji.csv > $@

../ex/us-counties.json:
	@rm -rf $@
	git cat-file blob master:data/us-counties.json > $@

../ex/us-states.json:
	@rm -rf $@
	git cat-file blob master:data/us-states.json > $@

../ex/unemployment.json:
	@rm -rf $@
	git cat-file blob master:examples/choropleth/unemployment.json > $@

../ex/force.js force.js:
	@rm -rf $@
	git cat-file blob master:examples/force/force.js > $@

../ex/force_layout.js:
	@rm -rf $@
	git cat-file blob master:examples/force/layout.js >> $@

../ex/force.css:
	@rm -rf $@
	git cat-file blob master:examples/force/force.css > $@

../ex/miserables.json:
	@rm -rf $@
	git cat-file blob master:examples/force/miserables.json > $@
