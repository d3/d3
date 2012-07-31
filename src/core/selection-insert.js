// TODO insert(node, function)?
// TODO insert(function, function)?
d3_selectionPrototype.insert = function(element, before) {
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

  function insert() {
    return this.insertBefore(
        document.createElementNS(this.namespaceURI, name),
        d3_select(before, this));
  }

  function insertNS() {
    return this.insertBefore(
        document.createElementNS(name.space, name.local),
        d3_select(before, this));
  }

  function insertNode() {
    return this.insertBefore(
        node,
        d3_select(before, this));
  }

  function insertFunc() {
    var result = func.apply(this, arguments);
    if (result instanceof Node) {
      return this.insertBefore(result,
          d3_select(before, this));
    }
    name = d3.ns.qualify(result);
    if (name.local) return insertNS.apply(this);
    return insert.apply(this);
  }

  return this.select(
      node        ? insertNode
    : func        ? insertFunc
    : name.local  ? insertNS
    : append
  );
};
