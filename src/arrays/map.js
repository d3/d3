import "../core/class";

d3.map = function(object) {
  var map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_class(d3_Map, {
  has: d3_map_has,
  get: function(key) {
    return this[d3_map_escape(key)];
  },
  set: function(key, value) {
    return this[d3_map_escape(key)] = value;
  },
  remove: d3_map_remove,
  keys: d3_map_keys,
  values: function() {
    var values = [];
    for (var key in this) {
      if (d3_map_hasOwnProperty.call(this, key)) {
        values.push(this[key]);
      }
    }
    return values;
  },
  entries: function() {
    var entries = [];
    for (var key in this) {
      if (d3_map_hasOwnProperty.call(this, key)) {
        entries.push({key: d3_map_unescape(key), value: this[key]});
      }
    }
    return entries;
  },
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f) {
    for (var key in this) {
      if (d3_map_hasOwnProperty.call(this, key)) {
        f.call(this, d3_map_unescape(key), this[key]);
      }
    }
  }
});

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_builtin = new d3_Map,
    d3_map_hasOwnProperty = Object.prototype.hasOwnProperty;

function d3_map_escape(key) {
  return (key += "") in d3_map_builtin || key[0] === d3_map_prefix ? d3_map_prefix + key : key;
}

function d3_map_unescape(key) {
  return (key += "")[0] === d3_map_prefix ? key.slice(1) : key;
}

function d3_map_has(key) {
  return d3_map_escape(key) in this;
}

function d3_map_remove(key) {
  return (key = d3_map_escape(key)) in this && delete this[key];
}

function d3_map_keys() {
  var keys = [];
  for (var key in this) {
    if (d3_map_hasOwnProperty.call(this, key)) {
      keys.push(d3_map_unescape(key));
    }
  }
  return keys;
}

function d3_map_size() {
  var size = 0;
  for (var key in this) {
    if (d3_map_hasOwnProperty.call(this, key)) {
      ++size;
    }
  }
  return size;
}

function d3_map_empty() {
  for (var key in this) {
    if (d3_map_hasOwnProperty.call(this, key)) {
      return false;
    }
  }
  return true;
}
