(function(){d3.chart = {};
// ranges (bad, satisfactory, good)
// measures (actual, forecast)
// markers (previous, goal)

/*
 * Chart design based on the recommendations of Stephen Few. Implementation
 * based on the work of Clint Ivy, Jamie Love, and Jason Davies.
 * http://projects.instantcognition.com/protovis/bulletchart/
 */

/**
 * Constructs a new, empty bullet chart.
 */
d3.chart.bullet = function() {
  var orient = 'left',
      duration = 0,
      ranges = function(d) { return d.ranges },
      markers = function(d) { return d.markers },
      measures = function(d) { return d.measures },
      horizontal,
      maximum = null,
      width = 800,
      height = 30,
      rangeColor = d3.scale.linear(),
      measureColor = d3.scale.linear(),
      scale = d3.scale.linear(),
      tickFormat = d3.format(',.0f'),
      transition = function(x) { return x };

  var reverse = function(l) {
    for (var i=0, ii=l.length; i<ii; i++) {
      l[i].sort(function(a, b) { return b - a });
    }
  };

  var bullet = function(chart) {
    var data = [];
    for (var i=0, ii=this[0].length; i<ii; i++) {
      data.push(this[0][i].__data__);
    }
    var cache = {
      ranges: data.map(ranges),
      measures: data.map(measures),
      markers: data.map(markers)
    };
    buildCache(cache);
    // sort to lay SVG in correct order
    reverse(cache.ranges);
    reverse(cache.measures);
    chart.selectAll('rect.range')
        .data(ranges)
      .enter().append('svg:rect')
        .attr('class', 'range');
    transition(chart.selectAll('rect.range'))
        .attr('width', scale)
        .attr('height', height)
        .attr('fill', function(d, i) { return rangeColor(i) });
    chart.selectAll('rect.measure')
        .data(measures)
      .enter().append('svg:rect')
        .attr('class', 'measure');
    transition(chart.selectAll('rect.measure'))
        .attr('width', scale)
        .attr('height', height / 3)
        .attr('y', height / 3)
        .attr('fill', function(d, i) { return measureColor(i) });
    chart.selectAll('line.marker')
        .data(markers)
      .enter().append('svg:line')
        .attr('class', 'marker')
        .attr('stroke', '#000')
        .attr('stroke-width', '2px')
    transition(chart.selectAll('line.marker'))
        .attr('x1', scale)
        .attr('x2', scale)
        .attr('y1', height/6)
        .attr('y2', height * 5/6)
    var ticks = scale.ticks(10);
    var ruleLine = this.selectAll('line.rule')
        .data(ticks)
    ruleLine.exit().remove();
    ruleLine.enter().append('svg:line')
        .attr('class', 'rule')
        .attr('stroke', '#666')
        .attr('stroke-width', '.5px')
    transition(chart.selectAll('line.rule'))
        .attr('x1', scale)
        .attr('x2', scale)
        .attr('y1', height)
        .attr('y2', height * 7/6)
    var tickText = this.selectAll('text.tick')
        .data(ticks);
    tickText.exit().remove();
    tickText.enter().append('svg:text')
        .attr('class', 'tick')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
    transition(chart.selectAll('text.tick')
      .text(tickFormat))
        .attr('x', scale)
        .attr('y', height * 7/6)
  }

  var maxlength = function(l) {
    return d3.max(l, function(d) { return d.length });
  }

  /** Cache chart state to optimize properties. */
  var buildCache = function(cache) {
    horizontal = /^left|right$/.test(orient);
    rangeColor.domain([0, Math.max(1, maxlength(cache.ranges) - 1)])
        .range(["#eee", "#bbb"]);
    measureColor.domain([0, Math.max(1, maxlength(cache.measures) - 1)])
        .range(["lightsteelblue", "steelblue"]);
    maximum = d3.max([].concat(cache.ranges, cache.markers, cache.measures), function(d) { return d3.max(d) });
    scale.domain([0, maximum]).range([0, width]);
  };

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return bullet;
  };

  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.maximum = function(x) {
    if (!arguments.length) return maximum;
    maximum = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    transition = duration ? function(x) { return x.transition().duration(duration) } :
      function(x) { return x };
    return bullet;
  };

  return bullet;
};
})()