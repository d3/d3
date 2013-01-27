// TODO append(node)?
// TODO append(function)?
d3_selectionPrototype.append = function(name) {
  return this.select(d3_selection_append(name));
};

function d3_selection_append(name){
  function append() {
    var n = name.local ? name : d3.ns.qualify(name);
    return n.local ? this.appendChild(document.createElementNS(n.space, n.local)) :
                        this.appendChild(document.createElementNS(this.namespaceURI, n));
  }

  function appendFunction() {
     var n = name.apply(this,arguments);
     n = n.local ? n : d3.ns.qualify(n);
     return name.local ? this.appendChild(document.createElementNS(n.space, n.local)) :
                         this.appendChild(document.createElementNS(this.namespaceURI, n));
  }

  return typeof name === "string" ? append : appendFunction;
}
