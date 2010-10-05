function nest(array) {
  var nest = {},
      keys = [],
      order;

  nest.key = function(key) {
    keys.push(key);
    return nest;
  };

  nest.sortKeys = function(x) {
    keys[keys.length - 1].order = x || naturalOrder;
    return nest;
  };

  nest.sortValues = function(x) {
    order = x || naturalOrder;
    return nest;
  };

  nest.map = function() {
    var map = {},
        values = [],
        i,
        j,
        a,
        x,
        m,
        k;

    /* Build the map. */
    for (j = 0; j < array.length; j++) {
      x = array[j];
      m = map;
      for (i = 0; i < keys.length - 1; i++) {
        k = keys[i](x);
        if (!m[k]) m[k] = {};
        m = m[k];
      }
      k = keys[i](x);
      if (!m[k]) {
        values.push(a = []);
        m[k] = a;
      }
      m[k].push(x);
    }

    /* Sort each leaf array. */
    if (order) {
      for (i = 0; i < values.length; i++) {
        values[i].sort(order);
      }
    }

    return map;
  };

  /** Recursively extracts the entries for the given map. */
  function entries(map) {
    var array = [];
    for (var k in map) {
      var v = map[k];
      array.push({key: k, values: (v instanceof Array) ? v : entries(v)});
    };
    return array;
  }

  /** Recursively sorts the values for the given key-values array. */
  function sort(array, i) {
    var o = keys[i].order;
    if (o) array.sort(function(a, b) { return o(a.key, b.key); });
    if (++i < keys.length) {
      for (var j = 0; j < array.length; j++) {
        sort.call(nest, array[j].values, i);
      }
    }
    return array;
  }

  /** Recursively descends to the leaf nodes (arrays) and does rollup. */
  function rollup(map, f) {
    for (var key in map) {
      var value = map[key];
      if (value instanceof Array) {
        map[key] = f(value);
      } else {
        rollup(value, f);
      }
    }
    return map;
  }

  function naturalOrder(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  nest.entries = function() {
    return sort.call(nest, entries(nest.map()), 0);
  };

  nest.rollup = function(f) {
    return rollup(nest.map(), f);
  };

  return nest;
}
