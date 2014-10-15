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
  has: d3_map_prototype.has,
  add: d3_set_add,
  remove: d3_map_prototype.remove,
  values: d3_map_prototype.keys,
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: d3_set_forEach
};

if (d3_map_proto in Object.create(null)) {
  d3_set_prototype.add = function(key) {
    this._[d3_map_escape(key)] = true;
    return key;
  };

  d3_set_prototype.forEach = function(f) {
    for (var key in this._) {
      f.call(this, d3_map_unescape(key));
    }
  };
}

d3_class(d3_Set, d3_set_prototype);

function d3_set_add(key) {
  this._[key] = true;
  return key;
}

function d3_set_forEach(f) {
  for (var key in this._) {
    f.call(this, key);
  }
}
