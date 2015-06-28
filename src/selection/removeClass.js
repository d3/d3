import "../format/collapse";
import "../format/requote";
import "selection";
import "classed";

d3_selectionPrototype.removeClass = function(name) {
  if (this.classed(name))
    this.node().classList.remove(name);
};
