EX_FILES = \
	../ex/box.js \
	../ex/box.css \
	../data/morley.csv \
	../ex/cluster.js \
	../ex/cluster.css \
	../ex/calendar.css \
	../ex/chord.css \
	../ex/chord.js \
	../ex/colorbrewer.css \
	../ex/dji.csv \
	../ex/dji.js \
	../ex/force.css \
	../ex/force.js \
	../data/flare.json \
	../ex/treemap.css \
	../ex/treemap.js \
	../ex/miserables.json \
	../ex/bubble.js \
	../ex/bubble.css \
	../ex/pack.js \
	../ex/pack.css \
	../ex/splom.css \
	../ex/splom.js \
	../ex/flowers.json \
	../data/us-counties.json \
	../data/us-states.json \
	../ex/button.css \
	../ex/sunburst.js \
	../ex/bullet.js \
	../ex/bullet.css \
	../ex/bullets.json \
	../ex/tree.js \
	../ex/tree.css \
	../ex/population.js \
	../ex/population.csv \
	../ex/population.css

INCLUDE_FILES = \
	box.js \
	cluster.js \
	chord.js \
	dji.js \
	force.js \
	treemap.js \
	splom.js \
	sunburst.js \
	bullet.js \
	bullets.json \
	bubble.js \
	pack.js \
	tree.js \
	population.js

.PHONY all: $(SRC_FILES) $(EX_FILES) $(INCLUDE_FILES)

$(SRC_FILES):
	@rm -rf $@
	git cat-file blob master:$(subst ../,,$@) > $@

../ex/calendar.css:
	@rm -rf $@
	git cat-file blob master:examples/calendar/calendar.css > $@

../ex/box.js box.js:
	@rm -rf $@
	git cat-file blob master:examples/box/box.js > $@

../data/morley.csv:
	@rm -rf $@
	git cat-file blob master:examples/data/morley.csv > $@

../ex/box.css:
	@rm -rf $@
	git cat-file blob master:examples/box/box.css > $@

../ex/pack.js pack.js:
	@rm -rf $@
	git cat-file blob master:examples/pack/pack.js > $@

../ex/pack.css:
	@rm -rf $@
	git cat-file blob master:examples/pack/pack.css > $@

../ex/bubble.js bubble.js:
	@rm -rf $@
	git cat-file blob master:examples/bubble/bubble.js > $@

../ex/bubble.css:
	@rm -rf $@
	git cat-file blob master:examples/bubble/bubble.css > $@

../ex/cluster.js cluster.js:
	@rm -rf $@
	git cat-file blob master:examples/cluster/cluster.js > $@

../ex/cluster.css:
	@rm -rf $@
	git cat-file blob master:examples/cluster/cluster.css > $@

../ex/bullet.js bullet.js:
	@rm -rf $@
	git cat-file blob master:examples/bullet/bullet.js > $@

../ex/bullet.css:
	@rm -rf $@
	git cat-file blob master:examples/bullet/bullet.css > $@

../ex/bullets.json bullets.json:
	@rm -rf $@
	git cat-file blob master:examples/bullet/bullets.json > $@

../ex/chord.css:
	@rm -rf $@
	git cat-file blob master:examples/chord/chord.css > $@

../ex/chord.js chord.js:
	@rm -rf $@
	git cat-file blob master:examples/chord/chord.js > $@

../ex/colorbrewer.css:
	@rm -rf $@
	git cat-file blob master:lib/colorbrewer/colorbrewer.css > $@

../ex/dji.js dji.js:
	@rm -rf $@
	git cat-file blob master:examples/calendar/dji.js > $@

../ex/dji.csv:
	@rm -rf $@
	git cat-file blob master:examples/calendar/dji.csv > $@

../data/us-counties.json:
	@rm -rf $@
	git cat-file blob master:examples/data/us-counties.json > $@

../data/us-states.json:
	@rm -rf $@
	git cat-file blob master:examples/data/us-states.json > $@

../ex/force.js force.js:
	@rm -rf $@
	git cat-file blob master:examples/force/force.js > $@

../ex/force.css:
	@rm -rf $@
	git cat-file blob master:examples/force/force.css > $@

../ex/miserables.json:
	@rm -rf $@
	git cat-file blob master:examples/force/miserables.json > $@

../ex/treemap.js treemap.js:
	@rm -rf $@
	git cat-file blob master:examples/treemap/treemap.js > $@

../ex/treemap.css:
	@rm -rf $@
	git cat-file blob master:examples/treemap/treemap.css > $@

../data/flare.json:
	@rm -rf $@
	git cat-file blob master:examples/data/flare.json > $@

../ex/splom.js splom.js:
	@rm -rf $@
	git cat-file blob master:examples/splom/splom.js > $@

../ex/splom.css:
	@rm -rf $@
	git cat-file blob master:examples/splom/splom.css > $@

../ex/flowers.json:
	@rm -rf $@
	git cat-file blob master:examples/splom/flowers.json > $@

../ex/button.css:
	@rm -rf $@
	git cat-file blob master:examples/button.css > $@

../ex/tree.js tree.js:
	@rm -rf $@
	git cat-file blob master:examples/tree/tree-radial.js > $@

../ex/tree.css:
	@rm -rf $@
	git cat-file blob master:examples/tree/tree.css > $@

../ex/sunburst.js sunburst.js:
	@rm -rf $@
	git cat-file blob master:examples/partition/partition-sunburst.js > $@

../ex/population.css:
	@rm -rf $@
	git cat-file blob master:examples/population/population.css > $@

../ex/population.js population.js:
	@rm -rf $@
	git cat-file blob master:examples/population/population.js > $@

../ex/population.csv:
	@rm -rf $@
	git cat-file blob master:examples/population/population.csv > $@
