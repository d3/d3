import "../core/document";
import "../core/rebind";
import "../event/drag";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "../selection/selection";
import "behavior";

d3.behavior.zoom = function() {
  var translate = [0, 0],
      translate0, // translate when we started zooming (to avoid drift)
      scale = 1,
      scaleExtent = d3_behavior_zoomInfinity,
      mousedown = "mousedown.zoom",
      mousemove = "mousemove.zoom",
      mouseup = "mouseup.zoom",
      touchstart = "touchstart.zoom",
      touchmove = "touchmove.zoom",
      touchend = "touchend.zoom",
      touchtime, // time of last touchstart (to detect double-tap)
      event = d3_eventDispatch(zoom, "zoom"),
      x0,
      x1,
      y0,
      y1;

  function zoom() {
    this.on(mousedown, mousedowned)
        .on(d3_behavior_zoomWheel + ".zoom", mousewheeled)
        .on(mousemove, mousewheelreset)
        .on("dblclick.zoom", dblclicked)
        .on(touchstart, touchstarted);
  }

  zoom.translate = function(x) {
    if (!arguments.length) return translate;
    translate = x.map(Number);
    rescale();
    return zoom;
  };

  zoom.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    rescale();
    return zoom;
  };

  zoom.scaleExtent = function(x) {
    if (!arguments.length) return scaleExtent;
    scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
    return zoom;
  };

  zoom.x = function(z) {
    if (!arguments.length) return x1;
    x1 = z;
    x0 = z.copy();
    translate = [0, 0];
    scale = 1;
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    translate = [0, 0];
    scale = 1;
    return zoom;
  };

  function location(p) {
    return [(p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale];
  }

  function point(l) {
    return [l[0] * scale + translate[0], l[1] * scale + translate[1]];
  }

  function scaleTo(s) {
    scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    translate[0] += p[0] - l[0];
    translate[1] += p[1] - l[1];
  }

  function rescale() {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - translate[0]) / scale; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - translate[1]) / scale; }).map(y0.invert));
  }

  function dispatch(event) {
    rescale();
    event({type: "zoom", scale: scale, translate: translate});
  }

  function mousedowned() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        dragged = 0,
        w = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended),
        l = location(d3.mouse(target)),
        dragRestore = d3_event_dragSuppress();

    function moved() {
      dragged = 1;
      translateTo(d3.mouse(target), l);
      dispatch(event_);
    }

    function ended() {
      w.on(mousemove, d3_window === target ? mousewheelreset : null).on(mouseup, null);
      dragRestore(dragged && d3.event.target === eventTarget);
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

    function relocate() {
      var touches = d3.touches(target);
      scale0 = scale;
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
          scaleTo(scale * 2);
          translateTo(p, l);
          d3_eventPreventDefault();
          dispatch(event_);
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
      dispatch(event_);
    }

    function ended() {
      if (d3.event.touches.length) {
        relocate(); // locations may have detached due to rotation
      } else {
        w.on(touchmove, null).on(touchend, null);
        t.on(mousedown, mousedowned).on(touchstart, touchstarted);
        dragRestore();
      }
    }
  }

  function mousewheeled() {
    d3_eventPreventDefault();
    if (!translate0) translate0 = location(d3.mouse(this));
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
    translateTo(d3.mouse(this), translate0);
    dispatch(event.of(this, arguments));
  }

  function mousewheelreset() {
    translate0 = null;
  }

  function dblclicked() {
    var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
    scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
    translateTo(p, l);
    dispatch(event.of(this, arguments));
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

// https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
var d3_behavior_zoomDelta, d3_behavior_zoomWheel
    = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() { return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1); }, "wheel")
    : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() { return d3.event.wheelDelta; }, "mousewheel")
    : (d3_behavior_zoomDelta = function() { return -d3.event.detail; }, "MozMousePixelScroll");
