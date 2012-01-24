// Locate the insertion point for x in a to maintain sorted order. The
// arguments lo and hi may be used to specify a subset of the array which should
// be considered; by default the entire array is used. If x is already present
// in a, the insertion point will be before (to the left of) any existing
// entries. The return value is suitable for use as the first argument to
// `array.splice` assuming that a is already sorted.
//
// The returned insertion point i partitions the array a into two halves so that
// all v < x for v in a[lo:i] for the left side and all v >= x for v in a[i:hi]
// for the right side.
d3.bisectLeft = function(a, f, x, lo, hi) {
  if (typeof arguments[1] === "function") {
    if (arguments.length < 4) lo = 0;
    if (arguments.length < 5) hi = a.length;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (f.call(a, a[mid], mid) < x) lo = mid + 1;
      else hi = mid;
    }
  } else {
    hi = (arguments.length < 4) ? a.length : lo;
    lo = (arguments.length < 3) ? 0 : x;
    x = f;    // shift arguments rightward from optional accessor
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
  }
  return lo;
};

// Similar to bisectLeft, but returns an insertion point which comes after (to
// the right of) any existing entries of x in a.
//
// The returned insertion point i partitions the array into two halves so that
// all v <= x for v in a[lo:i] for the left side and all v > x for v in a[i:hi]
// for the right side.
d3.bisect =
d3.bisectRight = function(a, f, x, lo, hi) {
  if (typeof arguments[1] === "function") {
    if (arguments.length < 4) lo = 0;
    if (arguments.length < 5) hi = a.length;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (x < f.call(a, a[mid], mid)) hi = mid;
      else lo = mid + 1;
    }
  } else {
    hi = (arguments.length < 4) ? a.length : lo;
    lo = (arguments.length < 3) ? 0 : x;
    x = f;    // shift arguments rightward from optional accessor
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (x < a[mid]) hi = mid;
      else lo = mid + 1;
    }
  }
  return lo;
};
