import "../core/document";
import "../core/ns";
import "selection";

// TODO append(node)?
// Returns a function that will create element when called with datum and index arguments
d3_selectionPrototype.append = function (nameOrFunction) {
  function appenderByName(name) {
    name = d3.ns.qualify(name);
    
    function append() {
      return this.appendChild(d3_document.createElementNS(this.namespaceURI, name));
    }

    function appendNS() {
      return this.appendChild(d3_document.createElementNS(name.space, name.local));
    }

    return name.local ? appendNS : append;
  }

  if (typeof nameOrFunction === "function") {
    
    function appenderWrapper(data, index) {
      const nameStr = nameOrFunction.call(this, data, index);
      return appenderByName(nameStr).call(this);
    };
    return this.select(appenderWrapper);
    
  } else {
    
    return this.select(appenderByName(nameOrFunction))
  
  }
};
