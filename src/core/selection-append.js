// TODO append(node)?
d3_selectionPrototype.append = function(name) {
  return this.select(d3_selection_append(name));
};

function d3_selection_append(name){
  function append() {
    var n = typeof name === 'function' ? name.apply(this,arguments) : name;
    n = n.local ? n : d3.ns.qualify(n);
    return n.local ? this.appendChild(document.createElementNS(n.space, n.local)) :
                     this.appendChild(document.createElementNS(this.namespaceURI, n));
  }

  return append;
}
