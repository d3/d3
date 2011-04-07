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
      ranges = [],
      markers = [],
      measures = [],
      horizontal,
      maximum = null,
      width = 500,
      height = 30,
      rangeColor = d3.scale.linear(),
      measureColor = d3.scale.linear(),
      scale = d3.scale.linear(),
      tickFormat = d3.format(',.0f');

  var x = function(d) {
    return scale(d);
  };

  var bullet = function() {
    ranges.sort(function(a, b) { return b - a });
    measures.sort(function(a, b) { return b - a });
    var chart = this.append('svg:g');
    chart.selectAll('rect.range')
      .data(ranges)
        .enter().append('svg:rect')
        .attr('class', 'range')
        .attr('width', x)
        .attr('height', height)
        .attr('style', function(d, i) { return 'fill:' + rangeColor(i) });
    chart.selectAll('rect.measure')
      .data(measures)
        .enter().append('svg:rect')
        .attr('class', 'measure')
        .attr('width', x)
        .attr('height', height / 3)
        .attr('y', height / 3)
        .attr('fill', function(d, i) { return measureColor(i) });
    chart.selectAll('line.marker')
      .data(markers)
        .enter().append('svg:line')
        .attr('class', 'marker')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', height/6)
        .attr('y2', height * 5/6)
        .attr('stroke', '#000')
        .attr('stroke-width', '2px')
    var ticks = scale.ticks(10);
    this.selectAll('line.rule')
      .data(ticks)
        .enter().append('svg:line')
        .attr('class', 'rule')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', height)
        .attr('y2', height * 7/6)
        .attr('stroke', '#666')
        .attr('stroke-width', '.5px')
    this.selectAll('text.tick')
      .data(ticks)
        .enter().append('svg:text')
        .attr('class', 'tick')
        .attr('x', x)
        .attr('y', height * 7/6)
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .text(tickFormat)
  }

  /** Cache chart state to optimize properties. */
  var buildCache = function() {
    horizontal = /^left|right$/.test(orient);
    rangeColor.domain([0, Math.max(1, ranges.length - 1)])
        .range(["#eee", "#bbb"]);
    measureColor.domain([0, Math.max(1, measures.length - 1)])
        .range(["lightsteelblue", "steelblue"]);
    maximum = maximum || d3.max([].concat(ranges, markers, measures));
    scale.domain([0, maximum]).range([0, width]);
  };

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    buildCache();
    return bullet;
  };

  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    buildCache();
    return bullet;
  };

  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    buildCache();
    return bullet;
  };

  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    buildCache();
    return bullet;
  };

  bullet.maximum = function(x) {
    if (!arguments.length) return maximum;
    maximum = x;
    buildCache();
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    buildCache();
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    buildCache();
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    buildCache();
    return bullet;
  };

  buildCache();
  return bullet;
};
})()