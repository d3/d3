---
layout: ex
title: Streamgraph
---

# Streamgraph

<div class="gallery" id="chart">
  <button class="first last" onclick="transition()">
    Update
  </button><p/>
</div>

<link type="text/css" rel="stylesheet" href="stream.css"/>
<link type="text/css" rel="stylesheet" href="button.css"/>
<script type="text/javascript" src="stream_layers.js"> </script>
<script type="text/javascript" src="stream.js"> </script>

For continuous data such as time series, a streamgraph can be used in place of stacked bars. This example also demonstrates path transitions to interpolate between different layouts. Streamgraph algorithm, colors, and data generation inspired by [Byron and Wattenberg](http://www.leebyron.com/else/streamgraph/).

### Source Code

{% highlight js linenos %}
{% include stream.js %}
{% endhighlight %}

{% highlight js linenos %}
{% include stream_layers.js %}
{% endhighlight %}
