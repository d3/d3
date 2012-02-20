d3.map = function(object) {
  var map = new d3_Map();
  for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_Map.prototype = {
  has: function(key) {
    return d3_map_prefix + key in this;
  },
  get: function(key) {
    return this[d3_map_prefix + key];
  },
  set: function(key, value) {
    this[d3_map_prefix + key] = value;
  },
  delete: function(key) {
    key = d3_map_prefix + key;
    return key in this && delete this[key];
  },
  keys: function() {
    var keys = [];
    for (var key in this) {
      if (key.charCodeAt(0) === d3_map_prefixCode) {
        keys.push(key.substring(1));
      }
    }
    return keys;
  }
};

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
