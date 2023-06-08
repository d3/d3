# d3-scale-chromatic

This module provides sequential, diverging and categorical color schemes designed to work with [d3-scale](https://github.com/d3/d3-scale)’s [d3.scaleOrdinal](https://github.com/d3/d3-scale#ordinal-scales) and [d3.scaleSequential](https://github.com/d3/d3-scale#sequential-scales). Most of these schemes are derived from Cynthia A. Brewer’s [ColorBrewer](http://colorbrewer2.org). Since ColorBrewer publishes only discrete color schemes, the sequential and diverging scales are interpolated using [uniform B-splines](https://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5).

See one of:

* [Categorical schemes](./d3-scale-chromatic/categorical.md)
* [Cyclical schemes](./d3-scale-chromatic/cyclical.md)
* [Diverging schemes](./d3-scale-chromatic/diverging.md)
* [Sequential schemes](./d3-scale-chromatic/sequential.md)
