import "../core/class";
import "../core/identity";

d3.map = function(object) {
  var map = new d3_Map;
  if (object instanceof d3_Map) object.forEach(function(key, value) { map.set(key, value); });
  else for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {
  this._ = Object.create(null);
}

var d3_map_proto = "__proto__",
    d3_map_zero = "\0",
    d3_map_prototype = {
      has: d3_map_has,
      get: d3_map_get,
      set: d3_map_set,
      remove: d3_map_remove,
      keys: d3_map_keys,
      values: d3_map_values,
      entries: d3_map_entries,
      size: d3_map_size,
      empty: d3_map_empty,
      forEach: d3_map_forEach
    };

if (d3_map_proto in Object.create(null)) {
  d3_map_prototype.get = function(key) {
    return this._[d3_map_escape(key)];
  };

  d3_map_prototype.set = function(key, value) {
    return this._[d3_map_escape(key)] = value;
  };

  d3_map_prototype.has = function(key) {
    return d3_map_escape(key) in this._;
  };

  d3_map_prototype.remove = function(key) {
    return (key = d3_map_escape(key)) in this._ && delete this._[key];
  };

  d3_map_prototype.keys = function() {
    var keys = [];
    for (var key in this._) {
      keys.push(d3_map_unescape(key));
    }
    return keys;
  };

  d3_map_prototype.entries = function() {
    var entries = [];
    for (var key in this._) {
      entries.push({key: d3_map_unescape(key), value: this._[key]});
    }
    return entries;
  };

  d3_map_prototype.forEach = function(f) {
    for (var key in this._) {
      f.call(this, d3_map_unescape(key), this._[key]);
    }
  };
}

d3_class(d3_Map, d3_map_prototype);

function d3_map_escape(key) {
  return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
}

function d3_map_unescape(key) {
  return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
}

function d3_map_get(key) {
  return this._[key];
}

function d3_map_set(key, value) {
  return this._[key] = value;
}

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

function d3_map_values() {
  var values = [];
  for (var key in this._) {
    values.push(this._[key]);
  }
  return values;
}

function d3_map_entries() {
  var entries = [];
  for (var key in this._) {
    entries.push({key: key, value: this._[key]});
  }
  return entries;
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

function d3_map_forEach(f) {
  for (var key in this._) {
    f.call(this, key, this._[key]);
  }
}
