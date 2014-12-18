import "../selection/each";
import "transition";

d3_transitionPrototype.pause = function() {
  var id = this.id, ns = this.namespace;
  return d3_selection_each(this, function(node) { node[ns][id].__paused__ = true; })
};
d3_transitionPrototype.resume = function() {
  var id = this.id, ns = this.namespace;
  return d3_selection_each(this, function(node) { delete node[ns][id].__paused__; })
};


// add possiblity to pause all transitions.
d3.transition.__paused__ = false;

d3.transition.pause = function() {
  if(!d3.transition.__paused__) {
    d3.transition.__paused__ = true;
}
}
d3.transition.resume = function() {
  if(d3.transition.__paused__) {
    d3.transition.__paused__ = false;
}	
}

