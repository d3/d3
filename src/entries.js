d3.entries = function(map) {
  var array = [], key;
  for (key in map) array.push({key: key, value: map[key]});
  return array;
};
