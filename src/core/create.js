d3.create = function(name) {
  return d3.select((name = d3.ns.qualify(name)).local
      ? document.createElementNS(name.space, name.local)
      : document.createElement(name));
};
