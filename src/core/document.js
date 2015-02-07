var d3_document = this.document;

function d3_documentElement(node) {
  return node && (node.ownerDocument || node.document).documentElement;
}

function d3_window(node) {
  return node && node.ownerDocument.defaultView;
}
