---
layout: ex
title: Non-Contiguous Cartogram
---

# Non-Contiguous Cartogram

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="cartogram.css"/>
<script type="text/javascript" src="cartogram.js"> </script>

Unlike choropleth maps, cartograms encode data using area rather than color, resulting in distorted geographic boundaries. In this example, states are rescaled around their centroid, preserving local shape but not topology. Inspired by [Zachary Johnson](http://indiemaps.com/blog/2011/02/noncontiguous-cartograms-in-openlayers-and-polymaps/). Non-continguous cartogram design invented by [Judy Olsen](http://onlinelibrary.wiley.com/doi/10.1111/j.0033-0124.1976.00371.x/abstract). Albers projection derived from work by [Tom Carden](http://gist.github.com/476238). U.S. state and county boundaries from the [U.S. Census Bureau](http://www.census.gov/), simplified using [GDAL](http://www.gdal.org/) and [MapShaper](http://mapshaper.org/).

### Source Code

{% highlight js linenos %}
{% include cartogram.js %}
{% endhighlight %}
