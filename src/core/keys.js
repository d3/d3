d3.keys = Object.keys || function(map) {
  var keys = [];
  for (var key in map)
    if (Object.prototype.hasOwnProperty.call(map, key)) keys.push(key);
  return keys;
};
