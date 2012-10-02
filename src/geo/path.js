// TODO restore path.area, path.centroid
// TODO fallback for projections that don't implement point, polygon? (or fix albersUsa?)

d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_pathCircle(pointRadius),
      projection = d3.geo.albersUsa(),
      buffer = [];

  var bufferContext = {
    point: function(x, y) { buffer.push("M", x, ",", y, pointCircle); },
    moveTo: function(x, y) { buffer.push("M", x, ",", y); },
    lineTo: function(x, y) { buffer.push("L", x, ",", y); },
    closePath: function() { buffer.push("Z"); }
  };

  var context = bufferContext;

  function path(object) {
    var result = null;
    if (object != result) {
      if (typeof pointRadius === "function") pointCircle = d3_geo_pathCircle(pointRadius.apply(this, arguments));
      type.object(object);
      if (buffer.length) result = buffer.join(""), buffer = [];
    }
    return result;
  }

  var type = d3_geo_type({
    line: function(coordinates) { projection.line(coordinates, context); },
    polygon: function(coordinates) { projection.polygon(coordinates, context); },
    point: function(coordinates) { projection.point(coordinates, context); }
  });

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projection = _;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context === bufferContext ? null : context;
    context = _;
    if (context == null) context = bufferContext;
    return path;
  };

  path.pointRadius = function(x) {
    if (!arguments.length) return pointRadius;
    if (typeof x === "function") pointRadius = x;
    else pointCircle = d3_geo_pathCircle(pointRadius = +x);
    return path;
  };

  return path;
};

function d3_geo_pathCircle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}

  // function polygonArea(coordinates) {
  //   var sum = area(coordinates[0]), // exterior ring
  //       i = 0, // coordinates.index
  //       n = coordinates.length;
  //   while (++i < n) sum -= area(coordinates[i]); // holes
  //   return sum;
  // }

  // function polygonCentroid(coordinates) {
  //   var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
  //       area = polygon.area(),
  //       centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
  //       x = centroid[0],
  //       y = centroid[1],
  //       z = area,
  //       i = 0, // coordinates index
  //       n = coordinates.length;
  //   while (++i < n) {
  //     polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
  //     area = polygon.area();
  //     centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
  //     x -= centroid[0];
  //     y -= centroid[1];
  //     z -= area;
  //   }
  //   return [x, y, 6 * z]; // weighted centroid
  // }

  // var centroidType = path.centroid = d3_geo_type({

  //   // TODO FeatureCollection
  //   // TODO Point
  //   // TODO MultiPoint
  //   // TODO LineString
  //   // TODO MultiLineString
  //   // TODO GeometryCollection

  //   Feature: function(o) {
  //     return centroidType(o.geometry);
  //   },

  //   Polygon: function(o) {
  //     var centroid = polygonCentroid(o.coordinates);
  //     return [centroid[0] / centroid[2], centroid[1] / centroid[2]];
  //   },

  //   MultiPolygon: function(o) {
  //     var area = 0,
  //         coordinates = o.coordinates,
  //         centroid,
  //         x = 0,
  //         y = 0,
  //         z = 0,
  //         i = -1, // coordinates index
  //         n = coordinates.length;
  //     while (++i < n) {
  //       centroid = polygonCentroid(coordinates[i]);
  //       x += centroid[0];
  //       y += centroid[1];
  //       z += centroid[2];
  //     }
  //     return [x / z, y / z];
  //   }

  // });

  // function area(coordinates) {
  //   return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  // }

  // var areaType = path.area = d3_geo_type({

  //   FeatureCollection: function(o) {
  //     var area = 0,
  //         features = o.features,
  //         i = -1, // features.index
  //         n = features.length;
  //     while (++i < n) area += areaType(features[i]);
  //     return area;
  //   },

  //   Feature: function(o) {
  //     return areaType(o.geometry);
  //   },

  //   Polygon: function(o) {
  //     return polygonArea(o.coordinates);
  //   },

  //   MultiPolygon: function(o) {
  //     var sum = 0,
  //         coordinates = o.coordinates,
  //         i = -1, // coordinates index
  //         n = coordinates.length;
  //     while (++i < n) sum += polygonArea(coordinates[i]);
  //     return sum;
  //   },

  //   GeometryCollection: function(o) {
  //     var sum = 0,
  //         geometries = o.geometries,
  //         i = -1, // geometries index
  //         n = geometries.length;
  //     while (++i < n) sum += areaType(geometries[i]);
  //     return sum;
  //   }

  // }, 0);
