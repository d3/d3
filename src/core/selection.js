function d3_selection(groups) {
  d3_arraySubclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_selectionPrototype = [];

// Subselection
d3_selectionPrototype.select = d3_selection_select;
d3_selectionPrototype.selectAll = d3_selection_selectAll;

// Content
d3_selectionPrototype.attr = d3_selection_attr;
d3_selectionPrototype.classed = d3_selection_classed;
d3_selectionPrototype.style = d3_selection_style;
d3_selectionPrototype.property = d3_selection_property;
d3_selectionPrototype.text = d3_selection_text;
d3_selectionPrototype.html = d3_selection_html;
d3_selectionPrototype.append = d3_selection_append;
d3_selectionPrototype.insert = d3_selection_insert;
d3_selectionPrototype.remove = d3_selection_remove;

// Data
d3_selectionPrototype.data = d3_selection_data;
d3_selectionPrototype.filter = d3_selection_filter;
d3_selectionPrototype.map = d3_selection_map;
d3_selectionPrototype.sort = d3_selection_sort;

// Animation & Interaction
d3_selectionPrototype.on = d3_selection_on;
d3_selectionPrototype.transition = d3_selection_transition;

// Control
d3_selectionPrototype.each = d3_selection_each;
d3_selectionPrototype.call = d3_selection_call;
d3_selectionPrototype.empty = d3_selection_empty;
d3_selectionPrototype.node = d3_selection_node;

// Default to using the W3C Selectors API.
var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return d3_array(n.querySelectorAll(s)); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0]; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
}

var d3_selectionRoot = d3_selection([[document]]);
d3_selectionRoot[0].parentNode = document.documentElement;
