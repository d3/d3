---
layout: ex
title: Stacked Bars
---

# Stacked Bars

<div class="gallery" id="chart">
  <button id="group" class="first" onclick="transitionGroup()">
    Group
  </button
  ><button id="stack" class="last active" onclick="transitionStack()">
    Stack
  </button><br>
</div>

<link type="text/css" rel="stylesheet" href="stack.css"/>
<link type="text/css" rel="stylesheet" href="button.css"/>
<script type="text/javascript" src="../d3.layout.js?1.6.0"> </script>
<script type="text/javascript" src="stream_layers.js"> </script>
<script type="text/javascript" src="stack.js"> </script>

### Source Code

{% highlight js linenos %}
{% include stack.js %}
{% endhighlight %}

{% highlight js linenos %}
{% include stream_layers.js %}
{% endhighlight %}
