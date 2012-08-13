/**
 * Returns a function that, given a GeoJSON object (e.g., a feature), returns
 * the corresponding SVG path. The function can be customized by overriding the
 * projection. Point features are mapped to circles with a default radius of
 * 4.5px; the radius can be specified either as a constant or a function that
 * is evaluated per object.
 */
d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_path_circle(pointRadius),
      projection = d3.geo.albersUsa(),
      buffer = [];

  function path(d, i) {
    if (typeof pointRadius === "function") pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
    pathType(d);
    var result = buffer.length ? buffer.join("") : null;
    buffer = [];
    return result;
  }

  function project(coordinates) {
    return projection(coordinates).join(",");
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
      buffer.push("M", project(o.coordinates), pointCircle);
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) buffer.push("M", project(coordinates[i]), pointCircle);
    },

    LineString: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      buffer.push("M");
      while (++i < n) buffer.push(project(coordinates[i]), "L");
      buffer.pop();
    },

    MultiLineString: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        buffer.push("M");
        while (++j < m) buffer.push(project(subcoordinates[j]), "L");
        buffer.pop();
      }
    },

    Polygon: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        if ((m = subcoordinates.length - 1) > 0) {
          buffer.push("M");
          while (++j < m) buffer.push(project(subcoordinates[j]), "L");
          buffer[buffer.length - 1] = "Z";
        }
      }
    },

    MultiPolygon: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates index
          m, // subcoordinates.length
          subsubcoordinates, // subcoordinates[j]
          k, // subsubcoordinates index
          p; // subsubcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        while (++j < m) {
          subsubcoordinates = subcoordinates[j];
          k = -1;
          if ((p = subsubcoordinates.length - 1) > 0) {
            buffer.push("M");
            while (++k < p) buffer.push(project(subsubcoordinates[k]), "L");
            buffer[buffer.length - 1] = "Z";
          }
        }
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

  function polygonArea(coordinates) {
    var sum = area(coordinates[0]), // exterior ring
        i = 0, // coordinates.index
        n = coordinates.length;
    while (++i < n) sum -= area(coordinates[i]); // holes
    return sum;
  }

  function polygonCentroid(coordinates) {
    var n = coordinates.length;
    if (!n) return null;
    var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
        area = polygon.area(),
        centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
        x = centroid[0],
        y = centroid[1],
        z = area,
        i = 0; // coordinates index
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

  function lineCentroid(coordinates) {
    var n = coordinates.length;
    if (!n) return null;
    var a = projection(coordinates[0]);
    if (n === 1) return [a[0], a[1], 1];
    for (var i = 1, x = 0, y = 0, z = 0, b, d, mid; i < n; i++) {
      b = projection(coordinates[i]);
      mid = midpoint(a, b);
      z += d = distance(a, b);
      x += d * mid[0];
      y += d * mid[1];
      a = b;
    }
    return [x, y, z]; // weighted centroid
  }

  function pointsCentroid(coordinates) {
    var n = coordinates.length;
    if (!n) return null;
    for (var z = 0, x = 0, y = 0, a; z < n; z++) {
      a = projection(coordinates[z]);
      x += a[0];
      y += a[1];
    }
    return [x, y, z];
  }

  function geometryDimension(o) {
    switch (o.type) {
      case "Point":
      case "MultiPoint":
        return 0;
      case "LineString":
      case "MultiLineString":
        return 1;
      case "Polygon":
      case "MultiPolygon":
        return 2;
      case "Feature":
        return dimension(o.geometry);
      case "FeatureCollection":
        return d3.max(o.features, geometryDimension);
      case "GeometryCollection":
        return d3.max(o.geometries, geometryDimension);
    }
    return -1;
  }

  function weightedAverage(array, f) {
    var n = array.length;
    if (!n) return null;
    for (var i = 0, x = 0, y = 0, z = 0, a, empty = true; i < n; i++) {
      a = f(array[i]);
      if (a != null) {
        x += a[0];
        y += a[1];
        z += a[2];
        empty = false;
      }
    }
    return empty ? null : [x / z, y / z];
  }

  var centroidType = path.centroid = d3_geo_type({

    Feature: function(o) {
      return centroidType(o.geometry);
    },

    FeatureCollection: function(o) {
      return centroidType({type: "GeometryCollection", geometries: o.features.map(function(feature) { return feature.geometry; })});
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries,
          dimensions = geometries.map(geometryDimension),
          dimension = d3.max(dimensions),
          a = [];
      for (var i = 0, n = geometries.length, geometry; i < n; i++) {
        if (dimensions[i] !== dimension) continue;
        geometry = geometries[i];
        switch (geometry.type) {
          case "Point": a.push([geometry.coordinates]); break;
          case "MultiLineString":
          case "MultiPolygon":
            a = a.concat(geometry.coordinates); break;
          default:
            a.push(geometry.coordinates);
        }
      }
      return a.length ? weightedAverage(a, dimension === 0 ? pointsCentroid
          : dimension === 1 ? lineCentroid : polygonCentroid) : null;
    },

    Point: function(o) {
      return projection(o.coordinates);
    },

    MultiPoint: function(o) {
      var centroid = pointsCentroid(o.coordinates);
      return centroid ? [centroid[0] / centroid[2], centroid[1] / centroid[2]] : null;
    },

    LineString: function(o) {
      var centroid = lineCentroid(o.coordinates);
      return centroid && centroid[2] ? [centroid[0] / centroid[2], centroid[1] / centroid[2]] : null;
    },

    MultiLineString: function(o) {
      return weightedAverage(o.coordinates, lineCentroid);
    },

    Polygon: function(o) {
      var centroid = polygonCentroid(o.coordinates);
      return centroid ? [centroid[0] / centroid[2], centroid[1] / centroid[2]] : null;
    },

    MultiPolygon: function(o) {
      return weightedAverage(o.coordinates, polygonCentroid);
    }

  });

  function midpoint(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  }

  function distance(a, b) {
    var dx = Math.abs(a[0] - b[0]),
        dy = Math.abs(a[1] - b[1]);
    return Math.sqrt(dx * dx + dy * dy);
  }

  function area(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  path.projection = function(x) {
    projection = x;
    return path;
  };

  path.pointRadius = function(x) {
    if (typeof x === "function") pointRadius = x;
    else {
      pointRadius = +x;
      pointCircle = d3_path_circle(pointRadius);
    }
    return path;
  };

  return path;
};

function d3_path_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}
