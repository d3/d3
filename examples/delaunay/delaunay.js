// Based on work by:
// Mike Migurski - mike.teczno.com/notes/canvas-warp.html
// Joshua Bell - travellermap.com/tmp/delaunay.htm
// Sjaak Priester - codeguru.com/cpp/data/mfc_database/misc/article.php/c8901
// Joseph O'Rourke - exaflop.org/docs/cgafaq/cga1.html

function delaunay(vertices) {
  var bounds = delaunay_bounds(vertices),
      boundsMap = {},
      circumcircles = [delaunay_circumcircle(bounds)],
      triangles = [bounds];
  boundsMap[bounds[0]] = 1;
  boundsMap[bounds[1]] = 1;
  boundsMap[bounds[2]] = 1;

  // For each vertex…
  vertices.forEach(function(vertex) {
    var edgesMap = {},
        edges = [];

    // Remove triangles whose circumcircle contains the vertex.
    for (var i in triangles) {
      if (circumcircles[i](vertex)) {
        var triangle = triangles[i];
        addEdge(triangle[0], triangle[1]);
        addEdge(triangle[1], triangle[2]);
        addEdge(triangle[2], triangle[0]);
        delete circumcircles[i];
        delete triangles[i];
      }
    }

    // Add the specified edge. If it's already present, delete it!
    function addEdge(v0, v1) {
      var edge = (v0[0] > v1[0]) || (v0[0] == v1[0] && v0[1] > v1[1])
          ? [v1, v0]
          : [v0, v1];
      if (edge in edgesMap) delete edges[edgesMap[edge]];
      else edgesMap[edge] = edges.push(edge) - 1;
    }

    // Add triangles for each remaining edge and the new vertex.
    for (var i in edges) {
      var edge = edges[i],
          triangle = [edge[0], edge[1], vertex];
      circumcircles.push(delaunay_circumcircle(triangle));
      triangles.push(triangle);
    }
  });

  // Remove triangles that share a vertex with the bounds.
  // The filter also removes any triangles we deleted previously.
  return triangles.filter(function(triangle) {
    return !triangle.some(function(vertex) {
      return vertex in boundsMap;
    });
  });
}

function delaunay_bounds(vertices) {
  var minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      dx,
      dy;
  for (var i = 0, n = vertices.length; i < n; i++) {
    var vertex = vertices[i];
    if (vertex[0] < minX) minX = vertex[0];
    if (vertex[0] > maxX) maxX = vertex[0];
    if (vertex[1] < minY) minY = vertex[1];
    if (vertex[1] > maxY) maxY = vertex[1];
  }
  dx = (maxX - minX) * 10;
  dy = (maxY - minX) * 10;
  return [
    [minX - dx, minY - dy * 3],
    [minX - dx, maxY + dy],
    [maxX + dx * 3, maxY + dy]
  ];
}

function delaunay_circumcircle(triangle) {
  var v0 = triangle[0],
      v1 = triangle[1],
      v2 = triangle[2],
      A = v1[0] - v0[0],
      B = v1[1] - v0[1],
      C = v2[0] - v0[0],
      D = v2[1] - v0[1],
      E = A * (v0[0] + v1[0]) + B * (v0[1] + v1[1]),
      F = C * (v0[0] + v2[0]) + D * (v0[1] + v2[1]),
      G = 2 * (A * (v2[1] - v1[1]) - B * (v2[0] - v1[0])),
      cx,
      cy,
      dx,
      dy,
      r2;

  // If collinear, find extremes and use the midpoint.
  if (Math.abs(G) < 1e-6) {
    var minX = Math.min(v0[0], v1[0], v2[0]),
        minY = Math.min(v0[1], v1[1], v2[1]),
        maxX = Math.max(v0[0], v1[0], v2[0]),
        maxY = Math.max(v0[1], v1[1], v2[1]);
    dx = (cx = (minX + maxX) / 2) - minX;
    dy = (cy = (minY + maxY) / 2) - minY;
  } else {
    dx = (cx = (D * E - B * F) / G) - v0[0];
    dy = (cy = (A * F - C * E) / G) - v0[1];
  }
  r2 = dx * dx + dy * dy;

  return function(vertex) {
    var dx = cx - vertex[0],
        dy = cy - vertex[1],
        d2 = dx * dx + dy * dy;
    return d2 <= r2;
  };
}
