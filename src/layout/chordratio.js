d3.layout.chordratio = function() {
  var chord = {},
      chords,
      groups,
      subgroups,
      matrix,
      n,
      m,
      padding = 0,
      normalize = 0,
      sortGroups,
      sortSubgroups,
      sortChords;

  function relayout() {
    var subgroupMap = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    subgroups = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < m) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(m));
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
    var scale = [];
    if (normalize) {
        i  = -1; while (++i < n) {
            scale[i] = (groupSums[i] > 0) ? (1.0 / groupSums[i]) : 1.0;
        }
        k = (2 * Math.PI - padding * n) / n;
    } else {
        i  = -1; while (++i < n) {
            scale[i] = 1.0;
        }
        k = (2 * Math.PI - padding * n) / k;
    }

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < m) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj];
        if (v > 0) {
            var a0 = x,
                a1 = x += v * k * scale[di];
            subgroups.push(subgroupMap[di + "." + dj] = {
              index: di,
              subindex: dj,
              startAngle: a0,
              endAngle: a1,
              value: v
            });
        }
      }
      if (normalize && groupSums[di] == 0) {
          x += k;
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: groupSums[di] * scale[di]
      };
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    j = -1; while (++j < m) {
        var maxItem = -1;
        var maxValue = 0;
        var items = [];
        i = -1; while (++i < n) {
            if (subgroupMap.hasOwnProperty(i + "." + j)) {
                var item = subgroupMap[i + "." + j];
                if (item.value > 0) {
                    if (maxValue < item.value) {
                        maxValue = item.value;
                        maxItem = items.length;
                    }
                    items.push(item);
                }
            }
        }
        // only generate chords for subgroups with multiple items
        if (items.length > 1) {
            var source = items[maxItem];
            items.splice(maxItem,1);
            i = -1; while (++i < items.length) {
                chords.push({source: source, target: items[i]});
            }
        }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      return sortChords(
          (a.source.value + a.target.value) / 2,
          (b.source.value + b.target.value) / 2);
    });
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    m = matrix && (matrix.length > 0) && matrix[0].length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = subgroups = groups = null;
    return chord;
  };

  chord.normalize = function(x) {
    if (!arguments.length) return normalize;
    normalize = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = subgroups = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = subgroups = null;
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

  chord.subgroups = function() {
    if (!subgroups) relayout();
    return subgroups;
  };

  return chord;
};
