import "conic-equal-area";
import "geo";

// A composite projection for the United States, 960×500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();

  var alaska = d3.geo.conicEqualArea()
      .rotate([160, 0, -35])
      .center([45, 44])
      .parallels([55, 65]);

  var hawaii = d3.geo.conicEqualArea()
      .rotate([160, 0])
      .center([0, 20])
      .parallels([8, 18]);

  function albersUsa(coordinates) {
    var y = coordinates[0], x = coordinates[1];
    return (x > 50 ? alaska : y < -140 ? hawaii : lower48)(coordinates);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= .123 && y < .230 && x >= -.420 && x < -.214 ? alaska
        : y >= .162 && y < .230 && x >= -.214 && x < -.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = d3_geo_albersUsaStream([lower48, alaska, hawaii]);

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_);
    alaska.scale(_ * .35);
    hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48
        .translate(_)
        .clipExtent([[x - .455 * k, y - .238 * k], [x + .455 * k, y + .238 * k]]);

    alaska
        .translate([x - .307 * k, y + .197 * k])
        .clipExtent([[x - .420 * k, y + .123 * k], [x - .214 * k, y + .230 * k]]);

    hawaii
        .translate([x - .205 * k, y + .208 * k])
        .clipExtent([[x - .214 * k, y + .162 * k], [x - .115 * k, y + .230 * k]]);

    return albersUsa;
  };

  return albersUsa.scale(1056);
};

// A naïve multi-projection stream.
// It probably only works because clipping buffers internally.
function d3_geo_albersUsaStream(projections) {
  return function(stream) {
    var streams = projections.map(function(p) { return p.stream(stream); });
    return {
      point: function(x, y) { streams.forEach(function(s) { s.point(x, y); }); },
      sphere: function() { streams.forEach(function(s) { s.sphere(); }); },
      lineStart: function() { streams.forEach(function(s) { s.lineStart(); }); },
      lineEnd: function() { streams.forEach(function(s) { s.lineEnd(); }); },
      polygonStart: function() { streams.forEach(function(s) { s.polygonStart(); }); },
      polygonEnd: function() { streams.forEach(function(s) { s.polygonEnd(); }); }
    };
  };
}
