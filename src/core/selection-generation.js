function d3_selection_nodeBuildingFunc(nameOrNode) {
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
