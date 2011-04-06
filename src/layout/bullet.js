// ranges (bad, satisfactory, good)
// measures (actual, forecast)
// markers (previous, goal)

/*
 * Chart design based on the recommendations of Stephen Few. Implementation
 * based on the work of Clint Ivy, Jamie Love, and Jason Davies.
 * http://projects.instantcognition.com/protovis/bulletchart/
 */

/**
 * Constructs a new, empty bullet layout.
 */
d3.layout.bullet = function() {
  var orient = 'left',
      ranges = [],
      markers = [],
      measures = [],
      horizontal,
      maximum = null,
      rangeColor = d3.scale.linear(),
      measureColor = d3.scale.linear(),
      scale = d3.scale.linear();

  var bullet = function() {
    ranges.sort(function(a, b) { return b - a });
    measures.sort(function(a, b) { return b - a });
    this.selectAll('rect.range')
      .data(ranges)
        .enter().append('svg:rect')
        .attr('class', 'range')
        .attr('width', function(d) { return scale(d) + '%' })
        .attr('height', '100%')
        .attr('style', function(d, i) { return 'fill:' + rangeColor(i) });
    this.selectAll('rect.measure')
      .data(measures)
        .enter().append('svg:rect')
        .attr('class', 'measure')
        .attr('width', function(d) { return scale(d) + '%' })
        .attr('height', '34%')
        .attr('y', '33%')
        .attr('fill', function(d, i) { return measureColor(i) });
    this.selectAll('line.marker')
      .data(markers)
        .enter().append('svg:line')
        .attr('class', 'marker')
        .attr('x1', function(d) { return scale(d) + '%' })
        .attr('x2', function(d) { return scale(d) + '%' })
        .attr('y1', '15%')
        .attr('y2', '85%')
        .attr('stroke', '#000')
        .attr('stroke-width', '2px')
  }

  /** Cache layout state to optimize properties. */
  var buildCache = function() {
    horizontal = /^left|right$/.test(orient);
    rangeColor.domain([0, Math.max(1, ranges.length - 1)])
        .range(["#eee", "#bbb"]);
    measureColor.domain([0, Math.max(1, measures.length - 1)])
        .range(["lightsteelblue", "steelblue"]);
    maximum = maximum || d3.max([].concat(ranges, markers, measures));
    scale.domain([0, maximum]).range([0, 100]);
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

  buildCache();
  return bullet;
};
