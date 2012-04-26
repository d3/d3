---
layout: ex
title: Force-Directed Graph
---

# Force-Directed Graph

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="force.css"/>
<script type="text/javascript" src="force.js"> </script>

This simple force-directed graph shows character co-occurence in *Les Misérables*. A physical simulation of charged particles and springs places related characters in closer proximity, while unrelated characters are farther apart. Layout algorithm inspired by [Tim Dwyer](http://www.csse.monash.edu.au/~tdwyer/) and [Thomas Jakobsen](http://web.archive.org/web/20080410171619/http://www.teknikus.dk/tj/gdc2001.htm). Data based on character coappearence in Victor Hugo's *Les Misérables*, compiled by [Donald Knuth](http://www-cs-faculty.stanford.edu/~uno/sgb.html).

### Source Code

{% highlight js linenos %}
{% include force.js %}
{% endhighlight %}
