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

d3_class(d3_Set, {
  has: d3_map_has,
  add: function(key) {
    this._[d3_map_escape(key += "")] = true;
    return key;
  },
  remove: d3_map_remove,
  values: d3_map_keys,
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f) {
    for (var key in this._) f.call(this, d3_map_unescape(key));
  }
});
