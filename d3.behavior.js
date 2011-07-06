(function(){d3.behavior = {};
// TODO unbind zoom behavior?
// TODO unbind listener?
d3.behavior.zoom = function() {

  var x = 0,
      y = 0,
      z = 0,
      listeners = [],
      pan,
      zoom;

  function zoom() {
    var container = this
        .on("mousedown", mousedown)
        .on("mousewheel", mousewheel)
        .on("DOMMouseScroll", mousewheel)
        .on("dblclick", mousewheel);

    d3.select(window)
        .on("mousemove", mousemove)
        .on("mouseup", mouseup);
  }

  function mousedown(d, i) {
    pan = {
      x0: x - d3.event.clientX,
      y0: y - d3.event.clientY,
      target: this,
      data: d,
      index: i
    };
    d3.event.preventDefault();
    window.focus(); // TODO focusableParent
  }

  function mousemove() {
    zoom = null;
    if (pan) {
      x = d3.event.clientX + pan.x0;
      y = d3.event.clientY + pan.y0;
      dispatch.call(pan.target, pan.data, pan.index);
    }
  }

  function mouseup() {
    if (pan) {
      mousemove();
      pan = null;
    }
  }

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!

  var outer = d3.select("body").append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("top", "-3000px")
      .style("height", 0)
      .style("overflow-y", "scroll")
    .append("div")
      .style("height", "2000px")
    .node().parentNode;

  function mousewheel(d, i) {
    var e = d3.event;

    // initialize the mouse location for zooming (to avoid drift)
    if (!zoom) {
      var p = d3.svg.mouse(this.nearestViewportElement || this);
      zoom = {
        x0: x,
        y0: y,
        z0: z,
        x1: x - p[0],
        y1: y - p[1]
      };
    }

    // adjust zoom level
    if (e.type === "dblclick") {
      z = e.shiftKey ? Math.ceil(z - 1) : Math.floor(z + 1);
    } else {
      var delta = e.wheelDelta || -e.detail;
      if (delta) {
        try {
          outer.scrollTop = 1000;
          outer.dispatchEvent(e);
          delta = 1000 - outer.scrollTop;
        } catch (error) {
          // Derp! Hope for the best?
        }
        delta *= .005;
      }
      z += delta;
    }

    // adjust x and y to center around mouse location
    var k = Math.pow(2, z - zoom.z0) - 1;
    x = zoom.x0 + zoom.x1 * k;
    y = zoom.y0 + zoom.y1 * k;

    // dispatch redraw
    dispatch.call(this, d, i);
  }

  function dispatch(d, i) {
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
      for (var j = 0, m = listeners.length; j < m; j++) {
        listeners[j].call(this, d, i);
      }
    } finally {
      d3.event = o;
    }
  }

  zoom.on = function(type, listener) {
    if (type == "zoom") listeners.push(listener);
    return zoom;
  };

  return zoom;
};
})();
