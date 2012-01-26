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
<script type="text/javascript" src="../d3.chart.js?2.7.3"> </script>
<script type="text/javascript" src="bullet.js"> </script>

Layout inspired by [Stephen Few](http://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf).
Implementation based on work by [Clint Ivy](http://projects.instantcognition.com/protovis/bulletchart/),
Jamie Love of [N-Squared Software](http://www.nsquaredsoftware.com/) and
[Jason Davies](http://www.jasondavies.com/). The "update" button randomizes the values slightly to
demonstrate transitions.

### Source Code

{% highlight js linenos %}
{% include bullet.js %}
{% endhighlight %}
