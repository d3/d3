d3_selectionPrototype.insert = function(name, before) {
  var nodeFunc, beforeFunc;

  function nodeFuncForName(nameOrNode) {
    // Nodes are not strings.
    if (typeof nameOrNode != "string") {
      return function() { return nameOrNode; };
    }

    // insert gets hit pretty often, so we do as much work up front as we can,
    // without completely sacrificing readability.
    nameOrNode = d3.ns.qualify(nameOrNode);
    if (nameOrNode.local) {
      return function() {
        return document.createElementNS(nameOrNode.space, nameOrNode.local);
      };
    } else {
      return function() {
        return document.createElementNS(this.namespaceURI, nameOrNode);
      };
    }
  }

  function beforeFuncForQuery(query) {
    if (typeof query == "string") {
      return function() { return d3_select(query, this); };
    } else {
      return function() { return query; };
    }
  }

  if (typeof name == "function") {
    nodeFunc = function() {
      return nodeFuncForName(name.apply(this, arguments)).apply(this, arguments);
    }
  } else {
    nodeFunc = nodeFuncForName(name);
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
