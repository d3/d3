---
layout: ex
title: Box Plots
---

# Box Plots

<div id="chart">
  <button class="first last" onclick="transition()">
    Update
  </button><p/>
</div>

<link type="text/css" rel="stylesheet" href="button.css"/>
<link type="text/css" rel="stylesheet" href="box.css"/>
<script type="text/javascript" src="box.js"> </script>

A box-and-whisker plot uses simple glyphs that summarize a quantitative distribution with five standard statistics: the smallest value, lower quartile, median, upper quartile, and largest value. This summary approach allows the viewer to easily recognize differences between distributions. Data from the [Michelson–Morley experiment](http://en.wikipedia.org/wiki/Michelson%E2%80%93Morley_experiment). Implementation contributed by [Jason Davies](http://www.jasondavies.com/). The “update” button randomizes the values slightly to demonstrate transitions.

### Source Code

{% highlight js linenos %}
{% include box.js %}
{% endhighlight %}
