import "../core/document";
import "../core/ns";
import "selection";

d3_selectionPrototype.insert = function(name, before) {
  name = d3.ns.qualify(name);

  if (typeof before !== "function") before = d3_selection_selector(before);

  function insert(d, i) {
    var element = d3_document.createElementNS(this.namespaceURI, name);
      if(name.local === "svg"){
        element.style.overflow = "hidden";
      }
      return this.insertBefore(element, before.call(this, d, i));
  }

  function insertNS(d, i) {
    var element = d3_document.createElementNS(name.space, name.local);
      if(name.local === "svg"){
        element.style.overflow = "hidden";
      }
      return this.insertBefore(element, before.call(this, d, i));
  }

  return this.select(name.local ? insertNS : insert);
};
