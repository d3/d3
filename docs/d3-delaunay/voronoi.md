# Voronoi diagrams

## voronoi.delaunay

The Voronoi diagram’s associated [Delaunay triangulation](#delaunay).

## voronoi.circumcenters

The [circumcenters](http://mathworld.wolfram.com/Circumcenter.html) of the Delaunay triangles as a Float64Array [*cx0*, *cy0*, *cx1*, *cy1*, …]. Each contiguous pair of coordinates *cx*, *cy* is the circumcenter for the corresponding triangle. These circumcenters form the coordinates of the Voronoi cell polygons.

## voronoi.vectors

A Float64Array [*vx0*, *vy0*, *wx0*, *wy0*, …] where each non-zero quadruple describes an open (infinite) cell on the outer hull, giving the directions of two open half-lines.

## voronoi.xmin
## voronoi.ymin
## voronoi.xmax
## voronoi.ymax

The bounds of the viewport [*xmin*, *ymin*, *xmax*, *ymax*] for rendering the Voronoi diagram. These values only affect the rendering methods ([*voronoi*.render](#voronoi_render), [*voronoi*.renderBounds](#voronoi_renderBounds), [*cell*.render](#cell_render)).

## voronoi.contains(i, x, y)

[Source](https://github.com/d3/d3-delaunay/blob/main/src/cell.js "Source")

Returns true if the cell with the specified index *i* contains the specified point ⟨*x*, *y*⟩. (This method is not affected by the associated Voronoi diagram’s viewport [bounds](#voronoi_xmin).)

## voronoi.neighbors(i)

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

Returns an iterable over the indexes of the cells that share a common edge with the specified cell *i*. Voronoi neighbors are always neighbors on the Delaunay graph, but the converse is false when the common edge has been clipped out by the Voronoi diagram’s viewport.

## voronoi.render(context)

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

<img alt="voronoi.render" src="https://raw.githubusercontent.com/d3/d3-delaunay/master/img/voronoi-mesh.png">

Renders the mesh of Voronoi cells to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## voronoi.renderBounds(context)

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

<img alt="voronoi.renderBounds" src="https://raw.githubusercontent.com/d3/d3-delaunay/master/img/voronoi-bounds.png">

Renders the viewport extent to the specified *context*. The specified *context* must implement the *context*.rect method from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). Equivalent to *context*.rect(*voronoi*.xmin, *voronoi*.ymin, *voronoi*.xmax - *voronoi*.xmin, *voronoi*.ymax - *voronoi*.ymin). If a *context* is not specified, an SVG path string is returned instead.

## voronoi.renderCell(i, context)

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

<img alt="cell.render" src="https://raw.githubusercontent.com/d3/d3-delaunay/master/img/spectral.png">

Renders the cell with the specified index *i* to the specified *context*. The specified *context* must implement the *context*.moveTo , *context*.lineTo and *context*.closePath methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## voronoi.cellPolygons()

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

Returns an iterable over the non-empty [polygons for each cell](#voronoi_cellPolygon), with the cell index as property.

## voronoi.cellPolygon(i)

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

Returns the convex, closed polygon [[*x0*, *y0*], [*x1*, *y1*], …, [*x0*, *y0*]] representing the cell for the specified point *i*.

## voronoi.update()

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js "Source")

Updates the Voronoi diagram and underlying triangulation after the points have been modified in-place — useful for Lloyd’s relaxation.
