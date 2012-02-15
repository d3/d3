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
  var low = n < m ? n : m,
      fix = 1;
  if (isNaN(+low)) return low;
  while ((fix *= 10) * low % 1 !== 0);
  return fix;
}
