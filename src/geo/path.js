/**
 * Returns a function that, given a GeoJSON object (e.g., a feature), returns
 * the corresponding SVG path. The function can be customized by overriding the
 * projection. Point features are mapped to circles with a default radius of
 * 4.5px; the radius can be specified either as a constant or a function that
 * is evaluated per object.
 */
d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_path_circle(pointRadius),
      projection = d3.geo.albersUsa(),
      projectLine = d3_geo_path_projectLine(projection),
      projectPolygon = d3_geo_path_projectPolygon(projection),
      buffer = [];

  function path(d, i) {
    if (typeof pointRadius === "function") pointCircle = d3_geo_path_circle(pointRadius.apply(this, arguments));
    pathType(d);
    var result = buffer.length ? buffer.join("") : null;
    buffer = [];
    return result;
  }

  var pathType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) buffer.push(pathType(features[i].geometry));
    },

    Feature: function(o) {
      pathType(o.geometry);
    },

    Point: function(o) {
      buffer.push("M", projection(o.coordinates), pointCircle);
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) buffer.push("M", projection(coordinates[i]), pointCircle);
    },

    LineString: function(o) {
      multiLineString(projectLine(o.coordinates));
    },

    MultiLineString: function(o) {
      var lineStrings = o.coordinates;
      for (var i = 0, n = lineStrings.length; i < n; ++i) {
        multiLineString(projectLine(lineStrings[i]));
      }
    },

    Polygon: function(o) {
      multiPolygon(projectPolygon(o.coordinates));
    },

    MultiPolygon: function(o) {
      var polygons = o.coordinates;
      for (var i = 0, n = polygons.length; i < n; ++i) {
        multiPolygon(projectPolygon(polygons[i]));
      }
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) buffer.push(pathType(geometries[i]));
    }

  });

  var areaType = path.area = d3_geo_type({

    FeatureCollection: function(o) {
      var area = 0,
          features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) area += areaType(features[i]);
      return area;
    },

    Feature: function(o) {
      return areaType(o.geometry);
    },

    Polygon: function(o) {
      return polygonArea(o.coordinates);
    },

    MultiPolygon: function(o) {
      var sum = 0,
          coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) sum += polygonArea(coordinates[i]);
      return sum;
    },

    GeometryCollection: function(o) {
      var sum = 0,
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) sum += areaType(geometries[i]);
      return sum;
    }

  }, 0);

  function multiLineString(lineStrings) {
    for (var i = 0, n = lineStrings.length; i < n; ++i) {
      var lineString = lineStrings[i];
      buffer.push("M");
      for (var j = 0, m = lineString.length; j < m; ++j) buffer.push(lineString[j], "L");
      buffer.pop();
    }
  }

  function multiPolygon(polygons) {
    for (var i = 0, n = polygons.length; i < n; ++i) {
      var polygon = polygons[i];
      for (var j = 0, m = polygon.length; j < m; ++j) {
        var ring = polygon[j],
            k = -1, p;
        if ((p = ring.length - 1) > 0) {
          buffer.push("M");
          while (++k < p) buffer.push(ring[k], "L");
          buffer[buffer.length - 1] = "Z";
        }
      }
    }
  }

  function polygonArea(coordinates) {
    var sum = area(coordinates[0]), // exterior ring
        i = 0, // coordinates.index
        n = coordinates.length;
    while (++i < n) sum -= area(coordinates[i]); // holes
    return sum;
  }

  function polygonCentroid(coordinates) {
    var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
        area = polygon.area(),
        centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
        x = centroid[0],
        y = centroid[1],
        z = area,
        i = 0, // coordinates index
        n = coordinates.length;
    while (++i < n) {
      polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
      area = polygon.area();
      centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
      x -= centroid[0];
      y -= centroid[1];
      z -= area;
    }
    return [x, y, 6 * z]; // weighted centroid
  }

  var centroidType = path.centroid = d3_geo_type({

    // TODO FeatureCollection
    // TODO Point
    // TODO MultiPoint
    // TODO LineString
    // TODO MultiLineString
    // TODO GeometryCollection

    Feature: function(o) {
      return centroidType(o.geometry);
    },

    Polygon: function(o) {
      var centroid = polygonCentroid(o.coordinates);
      return [centroid[0] / centroid[2], centroid[1] / centroid[2]];
    },

    MultiPolygon: function(o) {
      var area = 0,
          coordinates = o.coordinates,
          centroid,
          x = 0,
          y = 0,
          z = 0,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) {
        centroid = polygonCentroid(coordinates[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return [x / z, y / z];
    }

  });

  function area(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projectLine = d3_geo_path_projectLine(projection = _);
    projectPolygon = d3_geo_path_projectPolygon(projection);
    return path;
  };

  path.pointRadius = function(x) {
    if (!arguments.length) return pointRadius;
    if (typeof x === "function") pointRadius = x;
    else pointCircle = d3_geo_path_circle(pointRadius = +x);
    return path;
  };

  return path;
};

function d3_geo_path_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}

function d3_geo_path_projectLine(projection) {
  return projection.line || function(lineString) {
    return [lineString.map(projection)];
  };
}

function d3_geo_path_projectPolygon(projection) {
  return projection.polygon || function(polygon) {
    return [polygon.map(function(ring) {
      return ring.map(projection);
    })];
  };
}
