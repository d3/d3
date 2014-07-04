import "map";

d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      keyNames = [],
      rollup;

  function map(mapType, array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        setter,
        valuesByKey = new d3_Map,
        values;

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        valuesByKey.set(keyValue, [object]);
      }
    }

    if (mapType) {
      object = mapType();
      setter = function(keyValue, values) {
        object.set(keyValue, map(mapType, values, depth));
      };
    } else {
      object = {};
      setter = function(keyValue, values) {
        object[keyValue] = map(mapType, values, depth);
      };
    }

    valuesByKey.forEach(setter);
    return object;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var array = [],
        keyName = keyNames[depth] || 'key', 
        sortKey = sortKeys[depth++];

    map.forEach(function(key, keyMap) {

        var toPush = {values: entries(keyMap, depth)};
        toPush[keyName] = key;
        array.push(toPush);

    });

    return sortKey
        ? array.sort(function(a, b) { return sortKey(a[keyName], b[keyName]); })
        : array;
  }

  nest.map = function(array, mapType) {
    return map(mapType, array, 0);
  };

  nest.entries = function(array) {
    return entries(map(d3.map, array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

    //give a key name for the level you're on, in case you use the entries method
  nest.keyName = function(name) {
    keyNames[keys.length - 1] = name;
    return nest;
   };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
