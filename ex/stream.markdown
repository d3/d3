---
layout: ex
title: Streamgraph
---

# Streamgraph

<div class="gallery" id="chart">
  <button class="first last" onclick="transition()">
    Update
  </button><br>
</div>

<link type="text/css" rel="stylesheet" href="stream.css"/>
<link type="text/css" rel="stylesheet" href="button.css"/>
<script type="text/javascript" src="../d3.layout.js?1.6.0"> </script>
<script type="text/javascript" src="stream_layers.js"> </script>
<script type="text/javascript" src="stream.js"> </script>

### Source Code

{% highlight js linenos %}
{% include stream.js %}
{% endhighlight %}

{% highlight js linenos %}
{% include stream_layers.js %}
{% endhighlight %}
