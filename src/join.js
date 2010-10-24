function d3_join(key) {
  return {
    node: function(node) {
      return node.getAttribute(key);
    },
    data: function(data) {
      return data[key];
    }
  };
}
