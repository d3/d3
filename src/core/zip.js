d3.zip = function() {
  var n = arguments.length;
  if (n === 0) return [];
  var length = d3.min(arguments, function(d) { return d.length; }),
      results = new Array(length);
  for (var i = 0; i < length; i++) {
    results[i] = new Array(n);
    for (var j = 0; j < n; j++) results[i][j] = arguments[j][i];
  }
  return results;
};
