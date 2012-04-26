---
layout: ex
title: Treemap
---

# Treemap

<div class="gallery" id="chart">
  <button id="size" class="first active">
    Size
  </button
  ><button id="count" class="last">
    Count
  </button><p/>
</div>

<link type="text/css" rel="stylesheet" href="button.css"/>
<link type="text/css" rel="stylesheet" href="treemap.css"/>
<script type="text/javascript" src="treemap.js"> </script>

A treemap recursively subdivides area into rectangles; the area of any node in the tree corresponds to its value. This example uses color to encode different packages of the Flare visualization toolkit. Treemap design invented by [Ben Shneiderman](http://www.cs.umd.edu/~ben/). Squarified algorithm by [Bruls, Huizing and van Wijk](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.36.6685). Data courtesy [Jeff Heer](http://flare.prefuse.org/).

### Source Code

{% highlight js linenos %}
{% include treemap.js %}
{% endhighlight %}
