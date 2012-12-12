d3_selectionPrototype.append = function(name) {
  var n = typeof name === "function" ? name.apply(this,arguments) : name;
  function append() {
    return this.appendChild(document.createElementNS(this.namespaceURI, n));
  }
  function appendNS() {
    return this.appendChild(document.createElementNS(n.space, n.local));
  }
  n = d3.ns.qualify(n);
  return this.select(n.local ? appendNS : append)
};
