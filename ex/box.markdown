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
<script type="text/javascript" src="../d3.csv.js?1.24.0"> </script>
<script type="text/javascript" src="../d3.chart.js?1.24.0"> </script>
<script type="text/javascript" src="box.js"> </script>

Data from the [Michelson–Morley experiment](http://en.wikipedia.org/wiki/Michelson%E2%80%93Morley_experiment).
Implementation contributed by [Jason Davies](http://www.jasondavies.com/). The
"update" button randomizes the values slightly to demonstrate transitions.

### Source Code

{% highlight js linenos %}
{% include box.js %}
{% endhighlight %}
