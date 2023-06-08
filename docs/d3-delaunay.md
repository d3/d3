# d3-delaunay

<p align="center"><img src="https://raw.githubusercontent.com/d3/d3-delaunay/main/img/voronator.jpg" width="400" title="A watercolor portrait of Georgy Voronoy, with beard and wire-rim glasses, against a colorful polygonal background; illustration by Tom MacWright."></p>
<p align="center">Georgy “The Voronator” Voronoy</p>

This is a fast library for computing the [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) of a set of two-dimensional points. It is based on [Delaunator](https://github.com/mapbox/delaunator), a fast library for computing the [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) using [sweep algorithms](https://github.com/mapbox/delaunator/blob/main/README.md#papers). The Voronoi diagram is constructed by connecting the circumcenters of adjacent triangles in the Delaunay triangulation.

See one of:

- [Delaunay triangulations](./d3-delaunay/delaunay.md)
- [Voronoi diagrams](./d3-delaunay/voronoi.md)

For an interactive explanation of how this library works, see [The Delaunay’s Dual](https://observablehq.com/@mbostock/the-delaunays-dual).
