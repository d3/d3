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
    var i = this._.keys(), k, keys = [];
    while (!(k = i.next()).done) keys.push(k.value);
    return keys;
  },
  values: function() {
    var i = this._.values(), v, values = [];
    while (!(v = i.next()).done) values.push(v.value);
    return values;
  },
  entries: function() {
    var i = this._.entries(), e, entries = [];
    while (!(e = i.next()).done) entries.push({key: e[0], value: e[1]});
    return entries;
  },
  size: function() {
    return this._.size;
  },
  empty: function() {
    return !!this._.size;
  },
  forEach: function(f) {
    var that = this;
    this._.forEach(function(key, value) {
      f.call(that, key, value);
    });
  }
});
