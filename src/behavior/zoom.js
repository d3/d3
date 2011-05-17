// TODO unbind zoom behavior?
// TODO unbind listener?
d3.behavior.zoom = function() {

  // https://bugs.webkit.org/show_bug.cgi?id=40441
  var bug40441 = /WebKit\/533/.test(navigator.userAgent) ? -1 : 0,
      bug40441Last = 0,
      x = 0,
      y = 0,
      z = 0,
      listeners = [],
      pan,
      zoom,
      last = 0;

  function zoom() {
    var container = this
        .on("mousedown", mousedown)
        .on("mousewheel", mousewheel)
        .on("DOMMouseScroll", mousewheel)
        .on("dblclick", mousewheel)
        .on("touchstart", touchstart);

    d3.select(window)
        .on("mousemove", mousemove)
        .on("mouseup", mouseup)
        .on("touchmove", touchmove);
  }

  function touchstart(d, i) {
    var n = d3.event.touches.length,
        t = Date.now();

    // doubletap detection
    if ((n === 1) && (t - last < 300)) {
      var p = d3.svg.touches(this.nearestViewportElement || this)[0],
          z0 = z;

      z = Math.floor(z) + 1;

      // adjust x and y to center around mouse location
      var k = Math.pow(2, z - z0) - 1;
      x += (x - p[0]) * k;
      y += (y - p[1]) * k;

      // dispatch redraw
      dispatch.call(this, d, i);
    } else if (n > 0) {
      var p,
          t0 = d3.event.touches[0];
      if (n > 1) {
        // Use d3.svg.touches to avoid drift.
        var svgp = d3.svg.touches(this.nearestViewportElement || this),
            t1 = d3.event.touches[1];
        zoom = {
          x1: x - (svgp[0][0] + svgp[1][0]) / 2,
          y1: y - (svgp[0][1] + svgp[1][1]) / 2,
          z0: z
        };
        p = [(t0.clientX + t1.clientX) / 2, (t0.clientY + t1.clientY) / 2];
      } else p = [t0.clientX, t0.clientY];
      pan = {
        x0: x - p[0],
        y0: y - p[1],
        target: this,
        data: d,
        index: i
      };
    }
    last = t;
    d3.event.preventDefault();
    window.focus(); // TODO focusableParent
  }

  function touchmove(d, i) {
    var e = d3.event;
    switch (e.touches.length) {
      case 1: { // single-touch pan
        var t0 = e.touches[0];
        if (pan) {
          x = t0.clientX + pan.x0;
          y = t0.clientY + pan.y0;
          dispatch.call(pan.target, pan.data, pan.index);
        }
        e.preventDefault();
        break;
      }
      case 2: { // double-touch pan + zoom + rotate
        var t0 = e.touches[0],
            t1 = e.touches[1],
            k = e.scale - 1;

        x = pan.x0 + zoom.x1 * k + (t0.clientX + t1.clientX) / 2;
        y = pan.y0 + zoom.y1 * k + (t0.clientY + t1.clientY) / 2;
        z = zoom.z0 + Math.log(e.scale) / Math.LN2;

        // dispatch redraw
        dispatch.call(this, d, i);
        e.preventDefault();
        break;
      }
    }
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
     var delta = (e.wheelDelta / 120 || -e.detail) * .1;

      /* Detect fast & large wheel events on WebKit. */
      if (bug40441 < 0) {
        var now = Date.now(), since = now - bug40441Last;
        if ((since > 9) && (Math.abs(e.wheelDelta) / since >= 50)) bug40441 = 1;
        bug40441Last = now;
      }
      if (bug40441 === 1) delta *= .03;

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
