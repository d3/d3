import "../core/document";
import "../core/ns";
import "selection";

// TODO append(node)?
// TODO append(function)?
d3_selectionPrototype.append = function(name) {
  name = d3.ns.qualify(name);

  function append() {
    var element = d3_document.createElementNS(this.namespaceURI, name);
      if(name.local === "svg"){
        element.style.overflow = "hidden";
      }
      return this.appendChild(element);
  }

  function appendNS() {
    var element = d3_document.createElementNS(name.space, name.local);
      if(name.local === "svg"){
        element.style.overflow = "hidden";
      }
      return this.appendChild(element);
  }

  return this.select(name.local ? appendNS : append);
};
