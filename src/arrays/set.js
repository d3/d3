import "../core/class";
import "map";

d3.set = function(array) {
  var set = new d3_Set;
  if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
  return set;
};

function d3_Set() {
  this._ = Object.create(null);
}

var d3_set_prototype = {
  has: d3_map_has,
  add: d3_set_add,
  remove: d3_map_remove,
  values: d3_map_keys,
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: d3_set_forEach
};

d3_class(d3_Set, d3_set_prototype);

function d3_set_add(key) {
  this._[d3_map_escape(key)] = true;
  return key;
}

function d3_set_forEach(f) {
  for (var key in this._) {
    f.call(this, d3_map_unescape(key));
  }
}
