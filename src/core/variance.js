d3.variance = function(array, f) {
  var n   = array.length;
  if(n < 2) return NaN;
  
  var mean = d3.mean(array),
      a,
      sd   = 0,
      i    = -1,
      j    = 0;
  
  if (arguments.length === 1) {
    while (++i < n){
      if (d3_number(a = array[i])){
        sd += Math.pow(a - mean, 2); 
        ++j;
      }
    }
  } else {
    var evaluatedArray = [];
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) evaluatedArray.push(a);
    return d3.variance(evaluatedArray);
  }
  
  sd /= (j - 1);
  return j ? sd : NaN;
};
