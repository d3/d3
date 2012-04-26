---
layout: ex
title: Sunburst
---

# Sunburst

<div class="gallery" id="chart">
  <button id="size" class="first">
    Size
  </button
  ><button id="count" class="last active">
    Count
  </button><p/>
</div>

<link type="text/css" rel="stylesheet" href="button.css"/>
<script type="text/javascript" src="sunburst.js"> </script>

A sunburst is similar to the treemap, except it uses a radial layout. The root node of the tree is at the center, with leaves on the circumference. The area (or angle, depending on implementation) of each arc corresponds to its value. Sunburst design by [John Stasko](http://www.cc.gatech.edu/gvu/ii/sunburst/). Data courtesy [Jeff Heer](http://flare.prefuse.org/).

### Source Code

{% highlight js linenos %}
{% include sunburst.js %}
{% endhighlight %}
