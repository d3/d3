---
layout: ex
title: Population Pyramid
---

# Population Pyramid

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="population.css"/>
<script type="text/javascript" src="../d3.csv.js?2.7.1"> </script>
<script type="text/javascript" src="population.js"> </script>

Data from the [Minnesota Population Center](http://ipums.org/). Use the arrow
keys to change the displayed year. The blue bars are the male population for
each five-year age bracket, while the pink bars are the female population; the
bars are partially transparent so that you can see how they overlap, unlike the
traditional [side-by-side](http://en.wikipedia.org/wiki/Population_pyramid)
display which makes it difficult to compare the relative distribution of the
sexes.

### Source Code

{% highlight js linenos %}
{% include population.js %}
{% endhighlight %}
