all: \
	d3.js \
	d3.min.js \
	d3.csv.js \
	d3.csv.min.js \
	d3.geo.js \
	d3.geo.min.js \
	d3.geom.js \
	d3.geom.min.js \
	d3.layout.js \
	d3.layout.min.js \
	d3.time.js \
	d3.time.min.js

%.js: Makefile
	git cat-file blob master:$@ > $@
