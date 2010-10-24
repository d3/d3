// TODO support namespaces for key?
function d3_join(key) {
  return {
    nodeKey: function(node) { return node.getAttribute(key); },
    dataKey: function(data) { return data[key]; }
  };
}
