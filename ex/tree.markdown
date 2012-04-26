---
layout: ex
title: Node-Link Tree
---

# Node-Link Tree

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="tree.css"/>
<script type="text/javascript" src="tree.js"> </script>

The `tree` layout implements the Reingold-Tilford algorithm for efficient, tidy arrangement of layered nodes. The depth of nodes is computed by distance from the root, leading to a ragged appearance. Cartesian orientations are also supported. Implementation based on work by [Jeff Heer](http://jheer.org/) and [Jason Davies](http://www.jasondavies.com/) using [Buchheim et al.](http://www.springerlink.com/content/u73fyc4tlxp3uwt8/)'s linear-time variant of the Reingold-Tilford algorithm. Data shows the [Flare](http://flare.prefuse.org/) class hierarchy, also courtesy Jeff Heer.

### Source Code

{% highlight js linenos %}
{% include tree.js %}
{% endhighlight %}
