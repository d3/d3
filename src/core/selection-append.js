d3_selectionPrototype.append = function(name) {
  var nodeFunc;
  if (typeof name == "function") {
    nodeFunc = function() {
      return d3_selection_nodeBuildingFunc(name.apply(this, arguments)).apply(this, arguments);
    }
  } else {
    nodeFunc = d3_selection_nodeBuildingFunc(name);
  }

  return this.select(function() {
    return this.appendChild(nodeFunc.apply(this, arguments));
  })
};
