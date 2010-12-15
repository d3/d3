// JavaScript built-ins.
var console,
    JSON;

// d3.core
var d3 = {
  version: 1,
  dispatch: {
    add: 1,
    remove: 1,
    dispatch: 1
  },
  ease: 1,
  event: 1,
  format: 1,
  rgb: {
    r: 1,
    g: 1,
    b: 1
  },
  hsl: {
    h: 1,
    s: 1,
    l: 1
  },
  interpolate: 1,
  interpolateNumber: 1,
  interpolateArray: 1,
  interpolateObject: 1,
  interpolateString: 1,
  interpolateRgb: 1,
  html: 1,
  json: 1,
  text: 1,
  xhr: 1,
  xml: 1,
  ns: {
    prefix: {
      svg: 1,
      xhtml: 1,
      xlink: 1,
      xml: 1,
      xmlns: 1
    },
    qualify: {
      space: 1,
      local: 1
    }
  },
  range: 1,
  select: 1,
  selectAll: {
    data: {
      __data__: 1,
      dataKey: 1,
      enter: 1,
      exit: 1,
      nodeKey: 1,
      parentData: 1
    },
    each: 1,
    node: 1,
    attr: 1,
    style: 1,
    property: 1,
    html: 1,
    text: 1,
    append: 1,
    on: 1,
    remove: 1,
    transition: 1,
    call: 1
  },
  transition: {
    __transition__: 1,
    delay: 1,
    duration: 1,
    ease: 1,
    attrTween: 1,
    styleTween: 1
  }
};

// d3.scale
d3.scale = {
  category10: 1,
  category20: 1,
  category20b: 1,
  category20c: 1,
  domain: 1,
  invert: 1,
  linear: 1,
  log: 1,
  ordinal: {
    rangePoints: 1,
    rangeBands: 1,
    rangeBand: 1
  },
  pow: {
    exponent: 1
  },
  range: 1,
  sqrt: 1,
  ticks: 1,
  tickFormat: 1
};

// d3.svg
d3.svg = {
  mouse: {
    ownerSVGElement: 1,
    createSVGPoint: 1,
    getScreenCTM: 1,
    e: 1,
    f: 1,
    inverse: 1,
    matrixTransform: 1
  }
};

// d3.geo
d3.geo = {
  albers: {
    albersUsa: 1,
    origin: 1,
    parallels: 1,
    scale: 1,
    translate: 1
  },
  mercator: {
    scale: 1,
    translate: 1
  },
  path: {
    coordinates: 1,
    features: 1,
    Feature: 1,
    FeatureCollection: 1,
    geometry: 1,
    geometries: 1,
    GeometryCollection: 1,
    id: 1,
    LineString: 1,
    MultiLineString: 1,
    MultiPoint: 1,
    MultiPolygon: 1,
    Point: 1,
    pointRadius: 1,
    Polygon: 1,
    projection: 1,
    type: 1
  }
};

// d3.geom
d3.geom = {
  hull: 1,
  polygon: {
    area: 1,
    intersection: 1
  },
  voronoi: 1,
  delaunay: 1
};

// d3.csv
d3.csv = {
  parse: 1,
  parseRows: 1,
  format: 1
};

// d3.time
d3.time = {
  format: 1,
  parse: 1
};
