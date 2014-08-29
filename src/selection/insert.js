import "selection";

d3_selectionPrototype.insert = function(name, before) {
  var n = d3_parse_attributes(name);
  name = n.attr ? n.tag : name;
  name = d3_selection_creator(name);
  before = d3_selection_selector(before);
  var s = this.select(function() {
    return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
  });
  return n.attr ? s.attr(n.attr) : s;
};
