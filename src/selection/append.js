import "../core/document";
import "../core/ns";
import "selection";

d3_selectionPrototype.append = function(name) {
  var n = d3_parse_attributes(name);
  name = n.attr ? n.tag : name;
  name = d3_selection_creator(name);
  var s = this.select(function() {
    return this.appendChild(name.apply(this, arguments));
  });
  return n.attr ? s.attr(n.attr) : s;
};

function d3_selection_creator(name) {
  return typeof name === "function" ? name
      : (name = d3.ns.qualify(name)).local ? function() { return this.ownerDocument.createElementNS(name.space, name.local); }
      : function() { return this.ownerDocument.createElementNS(this.namespaceURI, name); };
}

var d3_parse_attributes_regex = /([\.#])/g;

function d3_parse_attributes(name) {
  if (typeof name === "string") {
    var attr = {},
        parts = name.split(d3_parse_attributes_regex), p;
    name = parts.shift();
    while (p = parts.shift()) {
      if (p == '.') attr['class'] = attr['class'] ? attr['class'] + ' ' + parts.shift() : parts.shift();
      else if (p == '#') attr.id = parts.shift();
    }
    return attr.id || attr['class'] ? { tag: name, attr: attr } : name;
  }
  return name;
}