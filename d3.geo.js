d3.geo = {};
// Derived from Tom Carden's Albers implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.albers = function() {
  var origin = [-98, 38],
      parallels = [29.5, 45.5],
      scale = 1000,
      translate = [480, 250],
      lng0, // d3_radians * origin[0]
      n,
      C,
      p0;

  function albers(coordinates) {
    var t = n * (d3_radians * coordinates[0] - lng0),
        p = Math.sqrt(C - 2 * n * Math.sin(d3_radians * coordinates[1])) / n;
    return [
      scale * p * Math.sin(t) + translate[0],
      scale * (p * Math.cos(t) - p0) + translate[1]
    ];
  }

  function reload() {
    var phi1 = d3_radians * parallels[0],
        phi2 = d3_radians * parallels[1],
        lat0 = d3_radians * origin[1],
        s = Math.sin(phi1),
        c = Math.cos(phi1);
    lng0 = d3_radians * origin[0];
    n = .5 * (s + Math.sin(phi2));
    C = c * c + 2 * n * s;
    p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
    return albers;
  }

  albers.origin = function(x) {
    if (!arguments.length) return origin;
    origin = [+x[0], +x[1]];
    return reload();
  };

  albers.parallels = function(x) {
    if (!arguments.length) return parallels;
    parallels = [+x[0], +x[1]];
    return reload();
  };

  albers.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return albers;
  };

  albers.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return albers;
  };

  return reload();
};

// A composite projection for the United States, 960x500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
// TODO allow the composite projection to be rescaled?
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();

  var alaska = d3.geo.albers()
      .origin([-160, 60])
      .parallels([55, 65])
      .scale([600])
      .translate([80, 420]);

  var hawaii = d3.geo.albers()
      .origin([-160, 20])
      .parallels([8, 18])
      .translate([290, 450]);

  var puertoRico = d3.geo.albers()
      .origin([-60, 10])
      .parallels([8, 18])
      .scale([1500])
      .translate([1060, 680]);

  return function(coordinates) {
    var lon = coordinates[0],
        lat = coordinates[1];
    return (lat < 25
        ? (lon < -100 ? hawaii : puertoRico)
        : (lat > 50 ? alaska : lower48))(coordinates);
  };
};

var d3_radians = Math.PI / 180;
d3.geo.mercator = function() {
  var scale = 500,
      translate = [480, 250];

  function mercator(coordinates) {
    var x = (coordinates[0]) / 360,
        y = (-180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + coordinates[1] * Math.PI / 360))) / 360;
    return [
      scale * x + translate[0],
      scale * Math.max(-.5, Math.min(.5, y)) + translate[1]
    ];
  }

  mercator.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return mercator;
  };

  mercator.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return mercator;
  };

  return mercator;
};
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
