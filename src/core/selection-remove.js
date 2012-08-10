// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
d3_selectionPrototype.remove = function() {
  return this.each(function() {
    var parent = this.parentNode;
	d3_selection_cleanRemovedDOM(this);
    if (parent) parent.removeChild(this);
  });
};


 function d3_selection_cleanRemovedDOM(child) {
      // Check for and remove any DOM Handlers
      if (child.__handlers) {
          for (var key in child.__handlers) {
              if (child.__handlers[key] === true) {
                  child.removeEventListener("on"+key);
                  delete child["__on"+key];
              }
          }
          delete child.__handlers;
      }
      // Remove any DATA attached to DOM element
      if (child.__data__ !== undefined ) delete child.__data__;
      // Remove any Chart instances attached to a DOM Element
      if (child.__chart__ !== undefined ) delete child.__chart__;

      // Check to see if element has any children and clean them
      if (child.childNodes && child.childNodes.length > 0) {
          for (var i=0;i<child.childNodes.length;i++) {
              d3_selection_cleanRemovedDOM(child.childNodes[i]);
          }
      }
  }