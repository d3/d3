var d3_document = this.document;

function d3_documentElement(node) {
  return node
      && (node.ownerDocument // node is a Node
      || node.document // node is a Window
      || node).documentElement; // node is a Document
}

function d3_window(node) {
  return node
      && ((node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView); // node is a Document
}
