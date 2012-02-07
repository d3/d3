/**
 * @param {number} start
 * @param {number=} stop
 * @param {number=} step
 */
d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step == Infinity) throw new Error("infinite range");
  var range = [],
       h = calcRdx(start, stop),
       i = -1,
       j;
  if (step < 0) while ((j = (h * start + h * step * ++i) / h) > stop) range.push(j);
  else while ((j = (h * start + h * step * ++i) / h) < stop) range.push(j);
  return range;
};

// calculate correction for IEEE error
function calcRdx(n, m) {
	var val = n > m ? n : m;
	return Math.pow(10, 18 - ~~(Math.log((val > 0) ? val : -val) * Math.LOG10E));
}
