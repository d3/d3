---
layout: ex
title: Circle Packing
---

# Circle Packing

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="pack.css?1"/>
<script type="text/javascript" src="pack.js"> </script>

Enclosure diagrams use containment to represent the hierarchy. Although circle packing is not as space-efficient as a treemap, it better reveals the hierarchy. Implementation based on work by [Jeff Heer](http://jheer.org/). Data shows the [Flare](http://flare.prefuse.org/) class hierarchy, also courtesy Jeff Heer.

### Source Code

{% highlight js linenos %}
{% include pack.js %}
{% endhighlight %}
