import "../core/class";
import "map";

d3.set = function(array) {
  var set = new d3_Set();
  if (array) for (var i = 0; i < array.length; i++) set.add(array[i]);
  return set;
};

function d3_Set() {}

d3_class(d3_Set, {
  has: function(value) {
    return d3_map_prefix + value in this;
  },
  add: function(value) {
    this[d3_map_prefix + value] = true;
    return value;
  },
  remove: function(value) {
    value = d3_map_prefix + value;
    return value in this && delete this[value];
  },
  values: function() {
    var values = [];
    this.forEach(function(value) {
      values.push(value);
    });
    return values;
  },
  forEach: function(f) {
    for (var value in this) {
      if (value.charCodeAt(0) === d3_map_prefixCode) {
        f.call(this, value.substring(1));
      }
    }
  }
});
