// Based on http://vis.stanford.edu/protovis/ex/sort.html
// Based on work by Robert Sedgewick

var w = 960,
    h = 50,
    n = 240,
    x = d3.scale.linear().domain([0, n]).range([h, w - h]),
    a = d3.scale.linear().domain([0, n - 1]).range([90 + 60, 270 - 60]),
    data = shuffle(d3.range(n)),
    duration = 250;

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var line = vis.selectAll("line")
    .data(data)
  .enter().append("svg:line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", h)
    .attr("transform", transform);

start();

// Start the animation!
function start() {
  var passes = mergesort(data).reverse();

  update();

  function update() {
    var pass = passes.pop();

    line.data(pass, Number)
      .transition()
        .duration(duration)
        .attr("transform", transform);

    if (passes.length) {
      setTimeout(update, duration);
    } else {
      shuffle(data);
      setTimeout(start, duration + 4000);
    }
  }
}

function transform(d, i) {
  return "translate(" + x(i) + "," + h + ")rotate(" + a(d) + ")";
}

// Fisher-Yates shuffle
function shuffle(array) {
  var i = array.length, j, t;
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    t = array[j];
    array[j] = array[i];
    array[i] = t;
  }
  return array;
}

//
// Sorts the specified array using bottom-up mergesort, returning an array of
// arrays representing the state of the specified array after each insertion for
// each parallel pass. The first pass is performed at size = 2.
//
function mergesort(array) {
  var passes = [],
      i,
      j,
      n = array.length,
      m = 1;

  // double the size each pass
  while (m < array.length) {
    i = j = 0; while (i < array.length) j += merge(i, i += m, i += m);
    if (j) passes.push(array.slice());
    else m <<= 1;
  }

  // Merges two adjacent sorted arrays in-place.
  function merge(start, middle, end) {
    middle = Math.min(array.length, middle);
    end = Math.min(array.length, end);
    for (; start < middle; start++) {
      if (array[start] > array[middle]) {
        var v = array[start];
        array[start] = array[middle];
        insert(middle, end, v);
        return true;
      }
    }
    return false;
  }

  // Inserts the value v into the subarray specified by start and end.
  function insert(start, end, v) {
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
