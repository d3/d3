import "../math/number";
import "ascending";
import "quantile";

d3.median = function(array, f) {
  var array1 = [],
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) array1.push(+a);
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) array1.push(+a);
  }

  return array1.length ? d3.quantile(array1.sort(d3_ascending), .5) : undefined;
};
