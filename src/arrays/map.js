import "../core/class";

d3.map = function(object) {
  var map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {
  this._ = Object.create(null);
}

d3_class(d3_Map, {
  has: d3_map_has,
  get: function(key) {
    return this._[key];
  },
  set: function(key, value) {
    return this._[key] = value;
  },
  remove: d3_map_remove,
  keys: d3_map_keys,
  values: function() {
    var values = [];
    for (var key in this._) {
      values.push(this._[key]);
    }
    return values;
  },
  entries: function() {
    var entries = [];
    for (var key in this._) {
      entries.push({key: key, value: this._[key]});
    }
    return entries;
  },
  size: d3_map_size,
  empty: d3_map_empty,
  forEach: function(f) {
    for (var key in this._) {
      f.call(this, key, this._[key]);
    }
  }
});

function d3_map_has(key) {
  return key in this._;
}

function d3_map_remove(key) {
  return key in this._ && delete this._[key];
}

function d3_map_keys() {
  var keys = [];
  for (var key in this._) {
    keys.push(key);
  }
  return keys;
}

function d3_map_size() {
  var size = 0;
  for (var key in this._) {
    ++size;
  }
  return size;
}

function d3_map_empty() {
  for (var key in this._) {
    return false;
  }
  return true;
}
