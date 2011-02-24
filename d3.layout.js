(function(){d3.layout = {};
d3.layout.chord = function() {
  var chord = {},
      chords,
      groups,
      matrix,
      n,
      padding = 0,
      sortGroups,
      sortSubgroups,
      sortChords;

  function relayout() {
    var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(matrix[i][a], matrix[i][b]);
        });
      });
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (2 * Math.PI - padding * n) / k;

    // Compute the start and end angle for each group and subgroup.
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[i][j],
            v = matrix[di][dj];
        subgroups[di + "-" + dj] = {
          index: di,
          subindex: dj,
          startAngle: x,
          endAngle: x += v * k,
          value: v
        };
      }
      groups.push({
        index: di,
        startAngle: x0,
        endAngle: x,
        value: (x - x0) / k
      });
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push({
            source: source,
            target: target
          })
        }
      }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      a = Math.min(a.source.value, a.target.value);
      b = Math.min(b.source.value, b.target.value);
      return sortChords(a, b);
    });
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = null;
    return chord;
  };

  chord.sortChords = function(x) {
    if (!arguments.length) return sortChords;
    sortChords = x;
    if (chords) resort();
    return chord;
  };

  chord.chords = function() {
    if (!chords) relayout();
    return chords;
  };

  chord.groups = function() {
    if (!groups) relayout();
    return groups;
  };

  return chord;
};
d3.layout.pie = function() {
  var value = Number,
      sort = null,
      startAngle = 0,
      endAngle = 2 * Math.PI;

  function pie(data, i) {

    // Compute the start angle.
    var a = +(typeof startAngle == "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular range (end - start).
    var k = (typeof endAngle == "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - startAngle;

    // Optionally sort (a copy of) the data.
    if (sort != null) data = data.slice().sort(sort);

    // Compute the numeric values for each data element.
    var values = data.map(value);

    // Convert k into a scale factor from value to angle, using the sum.
    k /= values.reduce(function(p, d) { return p + d; }, 0);

    // Compute the arcs!
    return values.map(function(d, i) {
      return {
        value: d,
        startAngle: a,
        endAngle: a += d * k
      };
    });
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2π. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};
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
})()