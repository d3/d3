(function(){d3.behavior = {};
// TODO unbind zoom behavior?
// TODO unbind listener?
d3.behavior.zoom = function() {
  var x = 0,
      y = 0,
      z = 0,
      panning,
      zooming,
      locations = {}, // identifier -> location
      last = 0,
      target,
      targuments,
      event = d3.dispatch("zoom");

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  var div = d3.select("body").append("div")
      .style("visibility", "hidden")
      .style("top", 0)
      .style("height", 0)
      .style("width", 0)
      .style("overflow-y", "scroll")
    .append("div")
      .style("height", "2000px")
    .node().parentNode;

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("DOMMouseScroll.zoom", dblclick)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart);

    d3.select(window)
        .on("mousemove.zoom", mousemove)
        .on("mouseup.zoom", mouseup)
        .on("touchmove.zoom", touchmove)
        .on("touchend.zoom", touchup);
  }

  function location(point) {
    return [point[0] - x, point[1] - y, z];
  }

  // snapshot the target, data and index for subsequent dispatch
  function start() {
    target = this;
    targuments = arguments;
  }

  // Note: Since we don't rotate, it's possible for the touches to become
  // slightly detached from their original positions. Thus, we recompute the
  // touch points on touchend as well as touchstart!
  function touchup() {
    var touches = d3.svg.touches(target),
        i = -1,
        n = touches.length,
        touch;
    while (++i < n) locations[(touch = touches[i]).identifier] = location(touch);
    return touches;
  }

  function touchstart() {
    start.apply(this, arguments);
    var touches = touchup(),
        touch,
        now = Date.now();

    // doubletap detection
    if ((touches.length === 1) && (now - last < 300)) {
      var touch = touches[0];
      zoomto(1 + Math.floor(z), touch, locations[touch.identifier]);
    }
    last = now;
  }

  function touchmove() {
    var touches = d3.svg.touches(target);
    switch (touches.length) {

      // single-touch pan
      case 1: {
        var touch = touches[0];
        zoomto(z, touch, locations[touch.identifier]);
        break;
      }

      // double-touch pan + zoom
      case 2: {
        var p0 = touches[0],
            p1 = touches[1],
            p2 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2],
            l0 = locations[p0.identifier],
            l1 = locations[p1.identifier],
            l2 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2, l0[2]];
        zoomto(Math.log(d3.event.scale) / Math.LN2 + l0[2], p2, l2);
        break;
      }
    }
  }

  function mousedown() {
    start.apply(this, arguments);
    panning = location(d3.svg.mouse(target));
    d3.event.preventDefault();
    window.focus();
  }

  function mousemove() {
    zooming = null;
    if (panning) zoomto(z, d3.svg.mouse(target), panning);
  }

  function mouseup() {
    if (panning) {
      mousemove();
      panning = null;
    }
  }

  function mousewheel() {
    start.apply(this, arguments);

    // store starting mouse location
    if (!zooming) zooming = location(d3.svg.mouse(target));

    // detect the pixels that would be scrolled by this wheel event
    var e = d3.event, delta;
    try {
      div.scrollTop = 1000;
      div.dispatchEvent(e);
      delta = 1000 - div.scrollTop;
    } catch (error) {
      delta = e.wheelDelta || -e.detail;
    }

    zoomto(delta * .005 + z, d3.svg.mouse(target), zooming);
  }

  function dblclick() {
    start.apply(this, arguments);
    var mouse = d3.svg.mouse(target);
    zoomto(d3.event.shiftKey ? Math.ceil(z - 1) : Math.floor(z + 1), mouse, location(mouse));
  }

  function zoomto(z1, x0, x1) {
    var k = Math.pow(2, (z = z1) - x1[2]);
    x = x0[0] - k * x1[0];
    y = x0[1] - k * x1[1];
    dispatch();
  }

  function dispatch() {
    var o = d3.event, // Events can be reentrant (e.g., focus).
        k = Math.pow(2, z);

    d3.event = {
      scale: k,
      translate: [x, y],
      transform: function(sx, sy) {
        if (sx) transform(sx, x);
        if (sy) transform(sy, y);
      }
    };

    function transform(scale, o) {
      var domain = scale.__domain || (scale.__domain = scale.domain()),
          range = scale.range().map(function(v) { return (v - o) / k; });
      scale.domain(domain).domain(range.map(scale.invert));
    }

    try {
      event.zoom.dispatch.apply(target, targuments);
    } finally {
      d3.event = o;
    }

    o.preventDefault();
  }

  zoom.on = function(type, listener) {
    event[type].add(listener);
    return zoom;
  };

  return zoom;
};
})();
