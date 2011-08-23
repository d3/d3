// TODO insert(node, function)?
// TODO insert(function, string)?
// TODO insert(function, function)?
d3_selectionPrototype.insert = function(name, before) {
  name = d3.ns.qualify(name);

  function insert(node) {
    return node.insertBefore(
        document.createElement(name),
        d3_select(before, node));
  }

  function insertNS(node) {
    return node.insertBefore(
        document.createElementNS(name.space, name.local),
        d3_select(before, node));
  }

  return this.select(name.local ? insertNS : insert);
};
