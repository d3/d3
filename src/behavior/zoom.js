import "../core/document";
import "../core/rebind";
import "../event/drag";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "../selection/selection";
import "../interpolate/zoom";
import "behavior";

d3.behavior.zoom = function() {
  var view = {s: 1, t: [0, 0]},
      translate0, // translate when we started zooming (to avoid drift)
      center, // desired position of translate0 after zooming
      size = [960, 500], // viewport size; required for zoom interpolation
      scaleExtent = d3_behavior_zoomInfinity,
      mousedown = "mousedown.zoom",
      mousemove = "mousemove.zoom",
      mouseup = "mouseup.zoom",
      mousewheelTimer,
      touchstart = "touchstart.zoom",
      touchmove = "touchmove.zoom",
      touchend = "touchend.zoom",
      touchtime, // time of last touchstart (to detect double-tap)
      event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"),
      x0,
      x1,
      y0,
      y1;

  function zoom(g) {
    g   .on(mousedown, mousedowned)
        .on(d3_behavior_zoomWheel + ".zoom", mousewheeled)
        .on(mousemove, mousewheelreset)
        .on("dblclick.zoom", dblclicked)
        .on(touchstart, touchstarted);
  }

  zoom.event = function(g) {
    g.each(function() {
      var event_ = event.of(this, arguments),
          view1 = view,
          view0 = this.__chart__ || {s: 1, t: [0, 0]};
      this.__chart__ = view;
      if (d3_transitionInheritId) {
          d3.select(this).transition()
              .each("start.zoom", function() {
                view = view0; // pre-transition state
                zoomstarted(event_);
              })
              .tween("zoom:zoom", function() {
                var dx = size[0],
                    dy = size[1],
                    cx = dx / 2,
                    cy = dy / 2,
                    i = d3.interpolateZoom(
                      [(cx - view.t[0]) / view.s, (cy - view.t[1]) / view.s, dx / view.s],
                      [(cx - view1.t[0]) / view1.s, (cy - view1.t[1]) / view1.s, dx / view1.s]
                    );
                return function(t) {
                  var l = i(t), k = dx / l[2];
                  this.__chart__ = view = {s: k, t: [cx - l[0] * k, cy - l[1] * k]};
                  zoomed(event_);
                };
              })
              .each("end.zoom", function() {
                zoomended(event_);
              });
      } else {
        zoomstarted(event_);
        zoomed(event_);
        zoomended(event_);
      }
    });
  }

  zoom.translate = function(_) {
    if (!arguments.length) return view.t;
    view = {s: view.s, t: [+_[0], +_[1]]}; // copy-on-write
    rescale();
    return zoom;
  };

  zoom.scale = function(_) {
    if (!arguments.length) return view.s;
    view = {s: +_, t: view.t.slice()}; // copy-on-write
    rescale();
    return zoom;
  };

  zoom.scaleExtent = function(_) {
    if (!arguments.length) return scaleExtent;
    scaleExtent = _ == null ? d3_behavior_zoomInfinity : [+_[0], +_[1]];
    return zoom;
  };

  zoom.center = function(_) {
    if (!arguments.length) return center;
    center = _ && [+_[0], +_[1]];
    return zoom;
  };

  zoom.size = function(_) {
    if (!arguments.length) return size;
    size = _ && [+_[0], +_[1]];
    return zoom;
  };

  zoom.x = function(z) {
    if (!arguments.length) return x1;
    x1 = z;
    x0 = z.copy();
    view = {s: 1, t: [0, 0]}; // copy-on-write
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    view = {s: 1, t: [0, 0]}; // copy-on-write
    return zoom;
  };

  function location(p) {
    return [(p[0] - view.t[0]) / view.s, (p[1] - view.t[1]) / view.s];
  }

  function point(l) {
    return [l[0] * view.s + view.t[0], l[1] * view.s + view.t[1]];
  }

  function scaleTo(s) {
    view.s = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    view.t[0] += p[0] - l[0];
    view.t[1] += p[1] - l[1];
  }

  function rescale() {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - view.t[0]) / view.s; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - view.t[1]) / view.s; }).map(y0.invert));
  }

  function zoomstarted(event) {
    event({type: "zoomstart"});
  }

  function zoomed(event) {
    rescale();
    event({type: "zoom", scale: view.s, translate: view.t});
  }

  function zoomended(event) {
    event({type: "zoomend"});
  }

  function mousedowned() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        dragged = 0,
        w = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended),
        l = location(d3.mouse(target)),
        dragRestore = d3_event_dragSuppress();

    zoomstarted(event_);

    function moved() {
      dragged = 1;
      translateTo(d3.mouse(target), l);
      zoomed(event_);
    }

    function ended() {
      w.on(mousemove, d3_window === target ? mousewheelreset : null).on(mouseup, null);
      dragRestore(dragged && d3.event.target === eventTarget);
      zoomended(event_);
    }
  }

  // These closures persist for as long as at least one touch is active.
  function touchstarted() {
    var target = this,
        event_ = event.of(target, arguments),
        locations0, // touchstart locations
        distance0 = 0, // distance² between initial touches
        scale0, // scale when we started touching
        w = d3.select(d3_window).on(touchmove, moved).on(touchend, ended),
        t = d3.select(target).on(mousedown, null).on(touchstart, started), // prevent duplicate events
        dragRestore = d3_event_dragSuppress();

    started();
    zoomstarted(event_);

    function relocate() {
      var touches = d3.touches(target);
      scale0 = view.s;
      locations0 = {};
      touches.forEach(function(t) { locations0[t.identifier] = location(t); });
      return touches;
    }

    // Temporarily override touchstart while gesture is active.
    function started() {
      var now = Date.now(),
          touches = relocate();

      if (touches.length === 1) {
        if (now - touchtime < 500) { // dbltap
          var p = touches[0], l = locations0[p.identifier];
          scaleTo(view.s * 2);
          translateTo(p, l);
          d3_eventPreventDefault();
          zoomed(event_);
        }
        touchtime = now;
      } else if (touches.length > 1) {
        var p = touches[0], q = touches[1],
            dx = p[0] - q[0], dy = p[1] - q[1];
        distance0 = dx * dx + dy * dy;
      }
    }

    function moved() {
      var touches = d3.touches(target),
          p0 = touches[0],
          l0 = locations0[p0.identifier];

      if (p1 = touches[1]) {
        var p1, l1 = locations0[p1.identifier],
            scale1 = d3.event.scale;
        if (scale1 == null) {
          var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1;
          scale1 = distance0 && Math.sqrt(distance1 / distance0);
        }
        p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
        scaleTo(scale1 * scale0);
      }

      touchtime = null;
      translateTo(p0, l0);
      zoomed(event_);
    }

    function ended() {
      if (d3.event.touches.length) {
        relocate(); // locations may have detached due to rotation
      } else {
        w.on(touchmove, null).on(touchend, null);
        t.on(mousedown, mousedowned).on(touchstart, touchstarted);
        dragRestore();
        zoomended(event_);
      }
    }
  }

  function mousewheeled() {
    var event_ = event.of(this, arguments);
    if (mousewheelTimer) clearTimeout(mousewheelTimer);
    else zoomstarted(event_);
    mousewheelTimer = setTimeout(function() { mousewheelTimer = null; zoomended(event_); }, 50);
    d3_eventPreventDefault();
    var point = center || d3.mouse(this);
    if (!translate0) translate0 = location(point);
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.s);
    translateTo(point, translate0);
    zoomed(event_);
  }

  function mousewheelreset() {
    translate0 = null;
  }

  function dblclicked() {
    var event_ = event.of(this, arguments),
        p = d3.mouse(this),
        l = location(p),
        k = Math.log(view.s) / Math.LN2;
    zoomstarted(event_);
    scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
    translateTo(p, l);
    zoomed(event_);
    zoomended(event_);
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

// https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
var d3_behavior_zoomDelta, d3_behavior_zoomWheel
    = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() { return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1); }, "wheel")
    : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() { return d3.event.wheelDelta; }, "mousewheel")
    : (d3_behavior_zoomDelta = function() { return -d3.event.detail; }, "MozMousePixelScroll");
