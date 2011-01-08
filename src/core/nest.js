d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function recurse(j, array) {
    if (j >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[j],
        keyValue,
        keyValues = [],
        sortKey = sortKeys[j],
        object,
        map = {};

    while (++i < n) {
      if ((keyValue = key(object = array[i])) in map) {
        map[keyValue].push(object);
      } else {
        map[keyValue] = [object];
        keyValues.push(keyValue);
      }
    }

    j++;
    i = -1;
    n = keyValues.length;
    while (++i < n) {
      object = map[keyValue = keyValues[i]];
      map[keyValue] = recurse(j, object);
    }

    return map;
  }

  nest.map = function(array) {
    return recurse(0, array);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
