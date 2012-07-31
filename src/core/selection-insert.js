d3_selectionPrototype.insert = function(name, before) {
  var nodeFunc, beforeFunc;

  function beforeFuncForQuery(query) {
    if (typeof query == "string") {
      return function() { return d3_select(query, this); };
    } else {
      return function() { return query; };
    }
  }

  if (typeof name == "function") {
    nodeFunc = function() {
      return d3_selection_nodeBuildingFunc(name.apply(this, arguments)).apply(this, arguments);
    }
  } else {
    nodeFunc = d3_selection_nodeBuildingFunc(name);
  }

  if (typeof before == "function") {
    beforeFunc = function() {
      return beforeFuncForQuery(before.apply(this, arguments)).apply(this, arguments);
    }
  } else {
    beforeFunc = beforeFuncForQuery(before);
  }

  return this.select(function() {
    var newNode = nodeFunc.apply(this, arguments);
    var beforeNode = beforeFunc.apply(this, arguments);

    return this.insertBefore(newNode, beforeNode);
  });
};
