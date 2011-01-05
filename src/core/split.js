d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      arrays.push(values);
      values = [];
    } else {
      values.push(value);
    }
  }
  arrays.push(values);
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
