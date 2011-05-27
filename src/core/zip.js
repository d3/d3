d3.zip = function() {
  var n = arguments.length,
      length = d3.max(arguments, function(d) { return d.length; }),
      results = new Array(length);
  for (var i = 0; i < length; i++) {
    results[i] = new Array(n);
    for (var j = 0; j < length; j++) results[i][j] = arguments[j][i];
  }
  return results;
};
