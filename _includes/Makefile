SRC_FILES = \
	../d3.js \
	../d3.min.js \
	../d3.behavior.js \
	../d3.behavior.min.js \
	../d3.chart.js \
	../d3.chart.min.js \
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
	../ex/box.js \
	../ex/box.css \
	../data/morley.csv \
	../ex/cluster.js \
	../ex/cluster.css \
	../ex/calendar.js \
	../ex/calendar.css \
	../ex/chord.css \
	../ex/chord.js \
	../ex/cartogram.css \
	../ex/cartogram.js \
	../ex/choropleth.css \
	../ex/choropleth.js \
	../ex/colorbrewer.css \
	../ex/cross.js \
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
	../ex/unemployment.json \
	../data/us-counties.json \
	../data/us-states.json \
	../ex/stream.css \
	../ex/button.css \
	../ex/stack.css \
	../ex/stream.js \
	../ex/stream_layers.js \
	../ex/stack.js \
	../ex/voronoi.css \
	../ex/voronoi.js \
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
	cartogram.js \
	chord.js \
	choropleth.js \
	dji.js \
	force.js \
	treemap.js \
	splom.js \
	cross.js \
	stream.js \
	stream_layers.js \
	stack.js \
	voronoi.js \
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

../ex/calendar.js:
	@rm -rf $@
	git cat-file blob master:examples/calendar/calendar.js > $@

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

../ex/cartogram.css:
	@rm -rf $@
	git cat-file blob master:examples/cartogram/cartogram.css > $@

../ex/cartogram.js cartogram.js:
	@rm -rf $@
	git cat-file blob master:examples/cartogram/cartogram.js > $@

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

../data/us-counties.json:
	@rm -rf $@
	git cat-file blob master:examples/data/us-counties.json > $@

../data/us-states.json:
	@rm -rf $@
	git cat-file blob master:examples/data/us-states.json > $@

../ex/unemployment.json:
	@rm -rf $@
	git cat-file blob master:examples/choropleth/unemployment.json > $@

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
	git cat-file blob master:examples/splom/cross.js >> $@

../ex/cross.js cross.js:
	@rm -rf $@
	git cat-file blob master:examples/splom/cross.js > $@

../ex/splom.css:
	@rm -rf $@
	git cat-file blob master:examples/splom/splom.css > $@

../ex/flowers.json:
	@rm -rf $@
	git cat-file blob master:examples/splom/flowers.json > $@

../ex/stack.js stack.js:
	@rm -rf $@
	git cat-file blob master:examples/stream/stack.js > $@

../ex/stream.js stream.js:
	@rm -rf $@
	git cat-file blob master:examples/stream/stream.js > $@

../ex/stream_layers.js stream_layers.js:
	@rm -rf $@
	git cat-file blob master:examples/stream/stream_layers.js > $@

../ex/stream.css:
	@rm -rf $@
	git cat-file blob master:examples/stream/stream.css > $@

../ex/stack.css:
	@rm -rf $@
	git cat-file blob master:examples/stream/stack.css > $@

../ex/button.css:
	@rm -rf $@
	git cat-file blob master:examples/button.css > $@

../ex/tree.js tree.js:
	@rm -rf $@
	git cat-file blob master:examples/tree/tree-radial.js > $@

../ex/tree.css:
	@rm -rf $@
	git cat-file blob master:examples/tree/tree.css > $@

../ex/voronoi.css:
	@rm -rf $@
	git cat-file blob master:examples/voronoi/voronoi.css > $@

../ex/voronoi.js voronoi.js:
	@rm -rf $@
	git cat-file blob master:examples/voronoi/voronoi.js > $@

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
