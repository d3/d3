d3.keys = function(map) {
  var type = typeof map;
  if (!(type === 'function' || type === 'object' && !!map)) return [];
  if (!Object.keys){
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  }
  return Object.keys(map).concat(Object.keys(Object.getPrototypeOf(map)));
};
