import "../core/ns";
import "selection";

d3_selectionPrototype.append = function(name) {
  name = d3_selection_creator(name);
  return this.select(function() {
    return this.appendChild(name.apply(this, arguments));
  });
};

function d3_selection_creator(name) {

  function create() {
    var document = this.ownerDocument,
        namespace = this.namespaceURI;
    return namespace === d3_nsXhtml && document.documentElement.namespaceURI === d3_nsXhtml
        ? document.createElement(name)
        : document.createElementNS(namespace, name);
  }

  function createNS() {
    return this.ownerDocument.createElementNS(name.space, name.local);
  }

  return typeof name === "function" ? name
      : (name = d3.ns.qualify(name)).local ? createNS
      : create;
}
