d3.geo.identity = function() {
  var clipExtent = null,
      clip = d3_identity,
      stream;

  function identity(x) {
    return x;
  }

  identity.invert = d3_identity;

  identity.stream = function(output) {
    if (stream) stream.valid = false;
    stream = clip(output);
    stream.valid = true; // allow caching by d3.geo.path
    return stream;
  };

  identity.clipExtent = function(_) {
    if (!arguments.length) return clipExtent;
    clipExtent = _;
    clip = _ ? d3_geo_clipView(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
    if (stream) stream.valid = false, stream = null;
    return identity;
  };

  return identity;
};
