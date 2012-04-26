---
layout: ex
title: Calendar View
---

# Calendar View

<div class="gallery" id="chart"> </div>
<link type="text/css" rel="stylesheet" href="calendar.css"/>
<link type="text/css" rel="stylesheet" href="colorbrewer.css"/>
<script type="text/javascript" src="dji.js"> </script>

This example demonstrates loading of CSV data, which is then quantized into a diverging color scale. The values are visualized as colored cells per day. Days are arranged into columns by week, then grouped by month and years. Colors by [Cynthia Brewer](http://colorbrewer.org/). Layout inspired by [Rick Wicklin and Robert Allison](http://stat-computing.org/dataexpo/2009/posters/). Dow Jones historical data copyright [Yahoo! Finance](http://finance.yahoo.com/) or independent data provider; fair use for educational purposes.

### Source Code

{% highlight js linenos %}
{% include dji.js %}
{% endhighlight %}
