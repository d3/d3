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
       h = calcRdx(start, step),
       i = -1,
       j;
  start *= h;
  stop *= h;
  step *= h;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / h);
  else while ((j = start + step * ++i) < stop) range.push(j / h);
  return range;
};

// calculate correction for IEEE error
function calcRdx(n, m) {
  var low = Math.abs(n) < Math.abs(m) ? n : m,
      fix = 10;
  // check for non-applicable values
  if (low == 0 || isNaN(low)) return fix;
  // there is a decimal part, so calculate "to integer" shift by accumulating error
  if (low % 1) while (fix * low % 1) fix *= 10;
  // no decimal part, and start fix from 1
  else while (fix /= 10, fix * low % 10 === 0);
  return fix;
}
