import "../core/array";
import "../core/document";
import "../core/subclass";
import "../core/vendor";

function d3_selection(groups) {
  d3_subclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return n.querySelectorAll(s); },
    d3_selectMatcher = d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")],
    d3_selectMatches = function(n, s) { return d3_selectMatcher.call(n, s); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0] || null; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
  d3_selectMatches = Sizzle.matchesSelector;
}

d3.selection = function() {
  return d3_selectionRoot;
};

var d3_selectionPrototype = d3.selection.prototype = [];

import "select";
import "selectAll";
import "attr";
import "classed";
import "style";
import "property";
import "text";
import "html";
import "append";
import "insert";
import "remove";
import "data";
import "datum";
import "filter";
import "order";
import "sort";
import "on";
import "each";
import "call";
import "empty";
import "node";
import "size";
import "enter";

import "transition";
import "interrupt";

// TODO fast singleton implementation?
d3.select = function(node) {
  var group = [typeof node === "string" ? d3_select(node, d3_document) : node];
  group.parentNode = d3_documentElement;
  return d3_selection([group]);
};

d3.selectAll = function(nodes) {
  var group = d3_array(typeof nodes === "string" ? d3_selectAll(nodes, d3_document) : nodes);
  group.parentNode = d3_documentElement;
  return d3_selection([group]);
};

var d3_selectionRoot = d3.select(d3_documentElement);
