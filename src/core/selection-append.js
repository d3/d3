d3_selectionPrototype.append = function(element) {
  var node, func, name

  switch (true) {
    case element instanceof Function:
      func = element;
      break;

    case element instanceof Node:
      node = element;
      break;

    default:
      name = d3.ns.qualify(element);
      break;
  }

  function append() {
    return this.appendChild(document.createElementNS(this.namespaceURI, name));
  }

  function appendNS() {
    return this.appendChild(document.createElementNS(name.space, name.local));
  }

  function appendNode() {
    return this.appendChild(node);
  }

  function appendFunc() {
    var result = func.apply(this, arguments);
    if (result instanceof Node) return this.appendChild(result)
    name = d3.ns.qualify(result);
    if (name.local) return appendNS.apply(this);
    return append.apply(this);
  }

  return this.select(
      node        ? appendNode
    : func        ? appendFunc
    : name.local  ? appendNS
    : append
  );
};
