d3.set = function(array) {
  var set = new d3_Set();
  if (array) for (var i = 0; i < array.length; i++) set.add(array[i]);
  return set;
};

function d3_Set() {}

d3_class(d3_Set, {
  has: function(value) {
    return d3_set_prefix + value in this;
  },
  add: function(value) {
    this[d3_set_prefix + value] = true;
    return value;
  },
  remove: function(value) {
    value = d3_set_prefix + value;
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
      if (value.charCodeAt(0) === d3_set_prefixCode) {
        f.call(this, value.substring(1));
      }
    }
  }
});

var d3_set_prefix = "\0", // prevent collision with built-ins
    d3_set_prefixCode = d3_set_prefix.charCodeAt(0);
