---
layout: ex
title: Voronoi Diagram
---

# Voronoi Diagram

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="colorbrewer.css"/>
<link type="text/css" rel="stylesheet" href="voronoi.css"/>
<script type="text/javascript" src="../d3.geom.js?1.27.2"> </script>
<script type="text/javascript" src="voronoi.js"> </script>

Colors by [Cynthia Brewer](http://colorbrewer.org/). Voronoi design
commonly attributed to [Lejeune Dirichlet](http://en.wikipedia.org/wiki/Lejeune_Dirichlet)
and [Georgy Voronoy](http://en.wikipedia.org/wiki/Georgy_Voronoy).
Voronoi algorithm by [Steven Fortune](http://ect.bell-labs.com/who/sjf/);
implementation based on work by [Nicolas Garcia
Belmonte](http://blog.thejit.org/2010/02/12/voronoi-tessellation/).
Mouseover interaction inspired by [Raymond
Hill](http://www.raymondhill.net/blog/?p=9).

### Source Code

{% highlight js linenos %}
{% include voronoi.js %}
{% endhighlight %}
