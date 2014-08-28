import "../core/document";
import "../core/ns";
import "selection";

d3_selectionPrototype.append = function(name, classes) {
  name = d3_selection_creator(name);
  var s = this.select(function() {
    return this.appendChild(name.apply(this, arguments));
  });
  return (classes ? s.attr('class', classes) : s);
};

function d3_selection_creator(name) {
  return typeof name === "function" ? name
      : (name = d3.ns.qualify(name)).local ? function() { return this.ownerDocument.createElementNS(name.space, name.local); }
      : function() { return this.ownerDocument.createElementNS(this.namespaceURI, name); };
}
