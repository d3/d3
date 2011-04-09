---
layout: ex
title: Force-Directed Graph
---

# Force-Directed Graph

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="force.css"/>
<script type="text/javascript" src="../d3.layout.js?1.9.1"> </script>
<script type="text/javascript" src="force.js"> </script>

Layout algorithm inspired by [Tim Dwyer](http://www.csse.monash.edu.au/~tdwyer/) and
[Thomas Jakobsen](http://web.archive.org/web/20080410171619/http://www.teknikus.dk/tj/gdc2001.htm).
Data based on character coappearence in Victor Hugo's *Les Misérables*,
compiled by [Donald Knuth](http://www-cs-faculty.stanford.edu/~uno/sgb.html).

### Source Code

{% highlight js linenos %}
{% include force.js %}
{% endhighlight %}
