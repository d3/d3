---
layout: ex
title: Scatterplot Matrix
---

# Scatterplot Matrix

<div id="chart"> </div>
<link type="text/css" rel="stylesheet" href="splom.css"/>
<script type="text/javascript" src="splom.js"> </script>

Scatterplot matrix design invented by J. A. Hartigan; see also
[R](http://www.r-project.org/) and [GGobi](http://www.ggobi.org/).
Data on *Iris* flowers collected by Edgar Anderson and published by
Ronald Fisher.

### Source Code

{% highlight js linenos %}
{% include splom.js %}
{% endhighlight %}

This example uses a helper function, `cross`, to allow property functions to
access both parent and child data. We're looking for simpler ways to do this in
future versions of D3:

{% highlight js linenos %}
{% include cross.js %}
{% endhighlight %}
