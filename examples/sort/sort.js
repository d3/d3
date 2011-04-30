// Based on http://vis.stanford.edu/protovis/ex/sort.html

var w = 760,
    h = 50,
    n = 200,
    interval = 20,
    x = d3.scale.linear().domain([0, n]).range([0, w]),
    a = d3.scale.linear().range([90 + 60, 270 - 60]);

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w + 2 * h)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + h + ")");

randomize();

var passes, i, timer = null;

function randomize(parallel) {
  passes = mergesort(d3.range(n).map(Math.random), parallel);
  i = 0;
  if (timer != null) clearTimeout(timer);
  update();
}

function update() {
  var line = vis.selectAll("line")
      .data(passes[i++]);

  line.enter().append("svg:line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", h)
      .attr("transform", function(d, i) {
        return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
      });

  line.transition()
      .duration(interval / 2)
      .attr("transform", function(d, i) {
        return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
      });

  if (i < passes.length) timer = setTimeout(update, interval);
}

/**
 * Sorts the specified array using bottom-up mergesort, returning an array of
 * arrays representing the state of the specified array after each insertion for
 * each sequential pass.
 * The first pass is performed at size = 2.
 */
function mergesort(array, parallel) {
  var passes = [array.slice()], size = 2;
  for (; size < array.length; size <<= 1) {
    var chunks = [],
        max = 0;
    for (var i = 0; i < array.length;) {
      var chunk = merge(array, i, i + (size >> 1), i += size);
      if (chunk.length > max) max = chunk.length;
      if (chunk.length) chunks.push(chunk);
    }
    if (parallel) {
      var pass = null;
      for (var i = 0; i < max; i++) {
        pass = chunks.map(function(c, j) { return c[i] || pass[j]; });
        passes.push(Array.prototype.concat.apply([], pass));
      }
    } else {
      passes = passes.concat(Array.prototype.concat.apply([], chunks));
    }
  }
  passes = passes.concat(merge(array, 0, size >> 1, array.length));

  // Merges two adjacent sorted arrays in-place.
  function merge(array, start, middle, end) {
    var passes = [],
        start0 = start;
    for (; start < middle; start++) {
      if (array[start] > array[middle]) {
        var v = array[start];
        array[start] = array[middle];
        insert(array, middle, end, v);
        passes.push(parallel ? array.slice(start0, end) : array.slice());
      }
    }
    return passes;
  }

  // Inserts the value v into the subarray specified by start and end.
  function insert(array, start, end, v) {
    while (start + 1 < end && array[start + 1] < v) {
      var tmp = array[start];
      array[start] = array[start + 1];
      array[start + 1] = tmp;
      start++;
    }
    array[start] = v;
  }

  return passes;
}

