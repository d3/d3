// TODO append(function)?
d3_selectionPrototype.append = function(name) {

  if (typeof name === "string") {
    name = d3.ns.qualify(name);
  }else{
    var node = name;
  }

  function append() {
    return this.appendChild(document.createElement(name));
  }

  function appendNS() {
    return this.appendChild(document.createElementNS(name.space, name.local));
  }

  function appendNode() {
    return this.appendChild(node);
  }

  return this.select(node
                     ? appendNode
                     : (name.local ? appendNS : append));
};
