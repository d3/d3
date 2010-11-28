function chord(M, pad) {
  var chords = [],
      groups = chords.groups = [],
      subgroups = {},
      k = 0,
      x = 0,
      x0,
      i,
      j,
      n = M.length,
      m = M[0].length;

  if (arguments.length < 2) pad = 0;

  // Compute the sum.
  i = -1; while (++i < n) {
    j = -1; while (++j < m) {
      k += M[i][j];
    }
  }

  // Convert the sum to scaling factor for [0, 2pi].
  k = (2 * Math.PI - pad * n) / k;

  // Compute the start and end angle for each group and subgroup.
  i = -1; while (++i < n) {
    x0 = x;
    j = -1; while (++j < m) {
      subgroups[i + "-" + j] = {
        i: i,
        j: j,
        startAngle: x,
        endAngle: x += M[i][j] * k
      };
    }
    groups.push({
      startAngle: x0,
      endAngle: x,
      sum: (x - x0) / k
    });
    x += pad;
  }
  
  // Generate chords for each subgroup-subgroup link.
  i = -1; while (++i < n) {
    j = i - 1; while (++j < m) {
      chords.push({
        source: subgroups[i + "-" + j],
        target: subgroups[j + "-" + i]
      })
    }
  }
  
  return chords;
}
