---
layout: ex
title: Choropleth
---

# Choropleth

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="choropleth.css"/>
<link type="text/css" rel="stylesheet" href="colorbrewer.css"/>
<script type="text/javascript" src="../d3.geo.js?2.7.2"> </script>
<script type="text/javascript" src="choropleth.js"> </script>

Choropleth design invented by [Charles Dupin](http://en.wikipedia.org/wiki/Charles_Dupin).
Colors by [Cynthia Brewer](http://colorbrewer.org/). Data from the
[Bureau of Labor Statistics](http://www.bls.gov/), by way of [Nathan
Yau](http://flowingdata.com/2009/11/12/how-to-make-a-us-county-thematic-map-using-free-tools/).
Albers projection derived from work by [Tom Carden](http://gist.github.com/476238).
U.S. state and county boundaries from the [U.S. Census Bureau](http://www.census.gov/),
simplified using [GDAL](http://www.gdal.org/) and [MapShaper](http://mapshaper.org/).

### Source Code

{% highlight js linenos %}
{% include choropleth.js %}
{% endhighlight %}
