function values(map) {
  var array = [], key;
  for (key in map) array.push(map[key]);
  return array;
}
