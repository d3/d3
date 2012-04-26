---
layout: ex
title: Bullet Charts
---

# Bullet Charts

<div class="gallery" id="chart">
  <button class="first last" onclick="transition()">
    Update
  </button><p/>
</div>

<link type="text/css" rel="stylesheet" href="button.css"/>
<link type="text/css" rel="stylesheet" href="bullet.css"/>
<script type="text/javascript" src="bullet.js"> </script>

Designed by Stephen Few, a bullet chart “provides a rich display of data in a small space.” A variation on a bar chart, bullet charts compare a given quantitative measure (such as profit or revenue) against qualitative ranges (e.g., poor, satisfactory, good) and related markers (e.g., the same measure a year ago). Layout inspired by [Stephen Few](http://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf). Implementation based on work by [Clint Ivy](http://projects.instantcognition.com/protovis/bulletchart/), Jamie Love of [N-Squared Software](http://www.nsquaredsoftware.com/) and [Jason Davies](http://www.jasondavies.com/). The "update" button randomizes the values slightly to demonstrate transitions.

### Source Code

{% highlight js linenos %}
{% include bullet.js %}
{% endhighlight %}
