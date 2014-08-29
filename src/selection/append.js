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

function d3_parse_attributes(name) {
  if (typeof name === "string") {
    var attr = {}, p;
    if (name.indexOf('.') > 0) {
      attr["class"] = (p = name.split('.')).slice(1).join(' ');
      name = p[0];
    }
    if (name.indexOf('#') > 0) {
      attr.id = (p = name.split('#', 2))[1];
      name = p[0];
    }
    return p ? { tag: name, attr: attr } : name;
  }
  return name;
}