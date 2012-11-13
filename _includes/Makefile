EX_FILES = \
	../ex/colorbrewer.css \
	../data/flare.json \
	../ex/treemap.css \
	../ex/treemap.js \
	../ex/splom.css \
	../ex/splom.js \
	../ex/flowers.json \
	../data/us-counties.json \
	../data/us-states.json \
	../ex/button.css

INCLUDE_FILES = \
	treemap.js \
	splom.js

.PHONY all: $(SRC_FILES) $(EX_FILES) $(INCLUDE_FILES)

$(SRC_FILES):
	@rm -rf $@
	git cat-file blob master:$(subst ../,,$@) > $@

../ex/colorbrewer.css:
	@rm -rf $@
	git cat-file blob master:lib/colorbrewer/colorbrewer.css > $@

../data/us-counties.json:
	@rm -rf $@
	git cat-file blob master:examples/data/us-counties.json > $@

../data/us-states.json:
	@rm -rf $@
	git cat-file blob master:examples/data/us-states.json > $@

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
