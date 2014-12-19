import "../selection/each";
import "transition";

d3_transitionPrototype.pause = function() {
    var id = this.id,
        ns = this.namespace;
    return d3_selection_each(this, function(node) {
        node[ns][id].__paused__ = true;
    })
};
d3_transitionPrototype.resume = function() {
    var id = this.id,
        ns = this.namespace;
    return d3_selection_each(this, function(node) {
        delete node[ns][id].__paused__;
    })
};


// add possiblity to pause all transitions.
var d3_transition_pause = {};

d3.transition.pause = function(name) {
    name = name ? d3_transitionNamespace(name) : '__all__'
    if (!d3_transition_pause[name]) {
        d3_transition_pause[name] = true;
    }
}
d3.transition.resume = function(name) {
    name = name ? d3_transitionNamespace(name) : '__all__'
    if (d3_transition_pause[name]) {
        delete d3_transition_pause[name];
    }
}
