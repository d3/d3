EX_FILES = \
	../ex/splom.css \
	../ex/splom.js \
	../ex/flowers.json

INCLUDE_FILES = \
	splom.js

.PHONY all: $(SRC_FILES) $(EX_FILES) $(INCLUDE_FILES)

$(SRC_FILES):
	@rm -rf $@
	git cat-file blob master:$(subst ../,,$@) > $@

../ex/splom.js splom.js:
	@rm -rf $@
	git cat-file blob master:examples/splom/splom.js > $@

../ex/splom.css:
	@rm -rf $@
	git cat-file blob master:examples/splom/splom.css > $@

../ex/flowers.json:
	@rm -rf $@
	git cat-file blob master:examples/splom/flowers.json > $@
