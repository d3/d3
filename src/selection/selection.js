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
    d3_selectMatches = function(n, s) {
      var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
      d3_selectMatches = function(n, s) {
        return d3_selectMatcher.call(n, s);
      };
      return d3_selectMatches(n, s);
    };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0] || null; };
  d3_selectAll = Sizzle;
  d3_selectMatches = Sizzle.matchesSelector;
}

d3.selection = function() {
  return d3.select(d3_document.documentElement);
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

// TODO fast singleton implementation?
d3.select = function(node) {
  var group;
  if (typeof node === "string") {
    group = [d3_select(node, d3_document)];
    group.parentNode = d3_document.documentElement;
  } else {
    group = [node];
    group.parentNode = d3_documentElement(node);
  }
  return d3_selection([group]);
};

d3.selectAll = function(nodes) {
  var group;
  if (typeof nodes === "string") {
    group = d3_array(d3_selectAll(nodes, d3_document));
    group.parentNode = d3_document.documentElement;
  } else {
    group = d3_array(nodes);
    group.parentNode = null;
  }
  return d3_selection([group]);
};
