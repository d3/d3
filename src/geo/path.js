/**
 * Returns a function that, given a GeoJSON feature, returns the corresponding
 * SVG path. The function can be customized by overriding the projection. Point
 * features are mapped to circles with a default radius of 4.5px; the radius
 * can be specified either as a constant or a function that is evaluated per
 * feature.
 */
d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_path_circle(pointRadius),
      projection = d3.geo.albersUsa();

  function path(d, i) {
    if (typeof pointRadius == "function") {
      pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
    }
    return type(featurePaths, d);
  }

  function project(coordinates) {
    return projection(coordinates).join(",");
  }

  function type(types, o) {
    return o && o.type in types
        ? types[o.type](o)
        : "";
  }

  var featurePaths = {

    FeatureCollection: function(f) {
      var path = [],
          features = f.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) path.push(type(featurePaths, features[i]));
      return path.join("");
    },

    Feature: function(f) {
      return type(geometryPaths, f.geometry);
    }

  };

  var geometryPaths = {

    Point: function(o) {
      return "M" + project(o.coordinates) + pointCircle;
    },

    MultiPoint: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) path.push("M", project(coordinates[i]), pointCircle);
      return path.join("");
    },

    LineString: function(o) {
      var path = ["M"],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) path.push(project(coordinates[i]), "L");
      path.pop();
      return path.join("");
    },

    MultiLineString: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        path.push("M");
        while (++j < m) path.push(project(subcoordinates[j]), "L");
        path.pop();
      }
      return path.join("");
    },

    Polygon: function(o) {
      var path = [],
          coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        path.push("M");
        while (++j < m) path.push(project(subcoordinates[j]), "L");
        path[path.length - 1] = "Z";
      }
      return path.join("");
    },

    MultiPolygon: function(o) {
      var path = [],
          coordinates = o.coordinates,
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
          p = subsubcoordinates.length - 1;
          path.push("M");
          while (++k < p) path.push(project(subsubcoordinates[k]), "L");
          path[path.length - 1] = "Z";
        }
      }
      return path.join("");
    },

    GeometryCollection: function(o) {
      var path = [],
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) path.push(type(geometryPaths, geometries[i]));
      return path.join("");
    }

  };

  var featureAreas = {

    FeatureCollection: function(f) {
      var area = 0,
          features = f.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) area += type(featureAreas, features[i]);
      return area;
    },

    Feature: function(f) {
      return type(geometryAreas, f.geometry);
    }

  };

  var geometryAreas = {

    Point: d3_geo_pathZero,
    MultiPoint: d3_geo_pathZero,
    LineString: d3_geo_pathZero,
    MultiLineString: d3_geo_pathZero,

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
      while (++i < n) sum += type(geometryAreas, geometries[i]);
      return sum;
    }

  };

  function polygonArea(coordinates) {
    var sum = area(coordinates[0]),
        i = 0, // coordinates.index
        n = coordinates.length;
    while (++i < n) sum -= area(coordinates[i]);
    return sum;
  }

  function area(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  path.projection = function(x) {
    projection = x;
    return path;
  };

  path.area = function(d) {
    return type(featureAreas, d);
  };

  path.pointRadius = function(x) {
    if (typeof x == "function") pointRadius = x;
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

function d3_geo_pathZero() {
  return 0;
}
