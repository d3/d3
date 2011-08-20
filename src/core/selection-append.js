// TODO append(node)?
// TODO append(function)?
function d3_selection_append(name) {
  name = d3.ns.qualify(name);

  function append(node) {
    return node.appendChild(document.createElement(name));
  }

  function appendNS(node) {
    return node.appendChild(document.createElementNS(name.space, name.local));
  }

  return this.select(name.local ? appendNS : append);
}
