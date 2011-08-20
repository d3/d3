// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
function d3_selection_remove() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  });
}
