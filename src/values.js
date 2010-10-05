d3.values = function(map) {
  var array = [], key;
  for (key in map) array.push(map[key]);
  return array;
};
