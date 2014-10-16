import "../core/class";

d3.map = function(object) {
  var map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {
  this._ = new Map;
}

d3_class(d3_Map, {
  has: function(key) {
    return this._.has(key + "");
  },
  get: function(key) {
    return this._.get(key + "");
  },
  set: function(key, value) {
    return this._.set(key + "", value);
  },
  remove: function(key) {
    return this._.delete(key + "");
  },
  keys: function() {
    var keys = [];
    for (var key of this._.keys()) {
      keys.push(key);
    }
    return keys;
  },
  values: function() {
    var values = [];
    for (var value of this._.values()) {
      values.push(value);
    }
    return values;
  },
  entries: function() {
    var entries = [];
    for (var entry of this._) {
      entries.push({key: entry[0], value: entry[1]});
    }
    return entries;
  },
  size: function() {
    return this._.size;
  },
  empty: function() {
    return !!this._.size;
  },
  forEach: function(f) {
    for (var entry of this._) {
      f.apply(this, entry);
    }
  }
});
