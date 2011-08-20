function d3_selection_enter(selection) {
  d3_arraySubclass(selection, d3_selection_enterPrototype);
  return selection;
}

var d3_selection_enterPrototype = [];

// Subselection
d3_selection_enterPrototype.select = d3_selection_enter_select;

// Content
d3_selection_enterPrototype.append = d3_selection_append;
d3_selection_enterPrototype.insert = d3_selection_insert;

// Control
d3_selection_enterPrototype.empty = d3_selection_empty;
