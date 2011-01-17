// data is two-dimensional array of x,y; we populate y0
// TODO perhaps make the `x`, `y` and `y0` structure customizable
d3.layout.stack = function() {
  var order = "default",
      offset = "zero";

  function stack(data) {
    var n = data.length,
        m = data[0].length,
        i,
        j,
        y0;

    // compute the order of series
    var index = d3_layout_stackOrders[order](data);

    // set y0 on the baseline
    d3_layout_stackOffsets[offset](data, index);

    // propagate offset to other series
    for (j = 0; j < m; ++j) {
      for (i = 1, y0 = data[index[0]][j].y0; i < n; ++i) {
        data[index[i]][j].y0 = y0 += data[index[i - 1]][j].y;
      }
    }

    return data;
  }

  stack.order = function(x) {
    if (!arguments.length) return order;
    order = x;
    return stack;
  };

  stack.offset = function(x) {
    if (!arguments.length) return offset;
    offset = x;
    return stack;
  };

  return stack;
}

var d3_layout_stackOrders = {

  "inside-out": function(data) {
    var n = data.length,
        i,
        j,
        max = data.map(d3_layout_stackMaxIndex),
        sums = data.map(d3_layout_stackReduceSum),
        index = d3.range(n).sort(function(a, b) { return max[a] - max[b]; }),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];
    for (i = 0; i < n; i++) {
      j = index[i];
      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  },

  "reverse": function(data) {
    return d3.range(data.length).reverse();
  },

  "default": function(data) {
    return d3.range(data.length);
  }

};

var d3_layout_stackOffsets = {

  "silhouette": function(data, index) {
    var n = data.length,
        m = data[0].length,
        sums = [],
        max = 0,
        i,
        j,
        o;
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j].y;
      if (o > max) max = o;
      sums.push(o);
    }
    for (j = 0, i = index[0]; j < m; ++j) {
      data[i][j].y0 = (max - sums[j]) / 2;
    }
  },

  "wiggle": function(data, index) {
    var n = data.length,
        x = data[0],
        m = x.length,
        max = 0,
        i,
        j,
        k,
        ii,
        ik,
        i0 = index[0],
        s1,
        s2,
        s3,
        dx,
        o,
        o0;
    data[i0][0].y0 = o = o0 = 0;
    for (j = 1; j < m; ++j) {
      for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j].y;
      for (i = 0, s2 = 0, dx = x[j].x - x[j - 1].x; i < n; ++i) {
        for (k = 0, ii = index[i], s3 = (data[ii][j].y - data[ii][j - 1].y) / (2 * dx); k < i; ++k) {
          s3 += (data[ik = index[k]][j].y - data[ik][j - 1].y) / dx;
        }
        s2 += s3 * data[ii][j].y;
      }
      data[i0][j].y0 = o -= s1 ? s2 / s1 * dx : 0;
      if (o < o0) o0 = o;
    }
    for (j = 0; j < m; ++j) data[i0][j].y0 -= o0;
  },

  "zero": function(data, index) {
    var j = 0,
        m = data[0].length,
        i0 = index[0];
    for (; j < m; ++j) data[i0][j].y0 = 0;
  }

};

function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0);
}

function d3_layout_stackMaxIndex(array) {
  var i = 1,
      j = 0,
      v = array[0].y,
      k,
      n = array.length;
  for (; i < n; ++i) {
    if ((k = array[i].y) > v) {
      j = i;
      v = k;
    }
  }
  return j;
}

function d3_layout_stackSum(p, d) {
  return p + d.y;
}
