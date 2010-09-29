all: d3.js d3.min.js

d3.js d3.min.js: Makefile
	git checkout master
	make d3.js d3.min.js
	cp d3.js d3.tmp
	cp d3.min.js d3.min.tmp
	git checkout gh-pages
	mv d3.tmp d3.js
	mv d3.min.tmp d3.min.js
