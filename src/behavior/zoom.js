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
  var view = {x: 0, y: 0, k: 1},
      translate0, // translate when we started zooming (to avoid drift)
      center, // desired position of translate0 after zooming
      size = [960, 500], // viewport size; required for zoom interpolation
      scaleExtent = d3_behavior_zoomInfinity,
      mousedown = "mousedown.zoom",
      mousemove = "mousemove.zoom",
      mouseup = "mouseup.zoom",
      mousewheelTimer,
      touchstart = "touchstart.zoom",
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
      var dispatch = event.of(this, arguments),
          view1 = view;
      if (d3_transitionInheritId) {
        d3.select(this).transition()
            .each("start.zoom", function() {
              view = this.__chart__ || {x: 0, y: 0, k: 1}; // pre-transition state
              zoomstarted(dispatch);
            })
            .tween("zoom:zoom", function() {
              var dx = size[0],
                  dy = size[1],
                  cx = dx / 2,
                  cy = dy / 2,
                  i = d3.interpolateZoom(
                    [(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k],
                    [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]
                  );
              return function(t) {
                var l = i(t), k = dx / l[2];
                this.__chart__ = view = {x: cx - l[0] * k, y: cy - l[1] * k, k: k};
                zoomed(dispatch);
              };
            })
            .each("end.zoom", function() {
              zoomended(dispatch);
            });
      } else {
        this.__chart__ = view;
        zoomstarted(dispatch);
        zoomed(dispatch);
        zoomended(dispatch);
      }
    });
  }

  zoom.translate = function(_) {
    if (!arguments.length) return [view.x, view.y];
    view = {x: +_[0], y: +_[1], k: view.k}; // copy-on-write
    rescale();
    return zoom;
  };

  zoom.scale = function(_) {
    if (!arguments.length) return view.k;
    view = {x: view.x, y: view.y, k: +_}; // copy-on-write
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
    view = {x: 0, y: 0, k: 1}; // copy-on-write
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    view = {x: 0, y: 0, k: 1}; // copy-on-write
    return zoom;
  };

  function location(p) {
    return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k];
  }

  function point(l) {
    return [l[0] * view.k + view.x, l[1] * view.k + view.y];
  }

  function scaleTo(s) {
    view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    view.x += p[0] - l[0];
    view.y += p[1] - l[1];
  }

  function rescale() {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - view.x) / view.k; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - view.y) / view.k; }).map(y0.invert));
  }

  function zoomstarted(dispatch) {
    dispatch({type: "zoomstart"});
  }

  function zoomed(dispatch) {
    rescale();
    dispatch({type: "zoom", scale: view.k, translate: [view.x, view.y]});
  }

  function zoomended(dispatch) {
    dispatch({type: "zoomend"});
  }

  function mousedowned() {
    var that = this,
        target = d3.event.target,
        dispatch = event.of(that, arguments),
        dragged = 0,
        subject = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended),
        location0 = location(d3.mouse(that)),
        dragRestore = d3_event_dragSuppress();

    d3_selection_interrupt.call(that);
    zoomstarted(dispatch);

    function moved() {
      dragged = 1;
      translateTo(d3.mouse(that), location0);
      zoomed(dispatch);
    }

    function ended() {
      subject.on(mousemove, d3_window === that ? mousewheelreset : null).on(mouseup, null);
      dragRestore(dragged && d3.event.target === target);
      zoomended(dispatch);
    }
  }

  // These closures persist for as long as at least one touch is active.
  function touchstarted() {
    var that = this,
        dispatch = event.of(that, arguments),
        locations0 = {}, // touchstart locations
        distance0 = 0, // distance² between initial touches
        scale0, // scale when we started touching
        zoomName = ".zoom-" + d3.event.changedTouches[0].identifier,
        touchmove = "touchmove" + zoomName,
        touchend = "touchend" + zoomName,
        target = d3.select(d3.event.target).on(touchmove, moved).on(touchend, ended),
        subject = d3.select(that).on(mousedown, null).on(touchstart, started), // prevent duplicate events
        dragRestore = d3_event_dragSuppress();

    d3_selection_interrupt.call(that);
    started();
    zoomstarted(dispatch);

    // Updates locations of any touches in locations0.
    function relocate() {
      var touches = d3.touches(that);
      scale0 = view.k;
      touches.forEach(function(t) {
        if (t.identifier in locations0) locations0[t.identifier] = location(t);
      });
      return touches;
    }

    // Temporarily override touchstart while gesture is active.
    function started() {
      // Only track touches started on the target element.
      var changed = d3.event.changedTouches;
      for (var i = 0, n = changed.length; i < n; ++i) {
        locations0[changed[i].identifier] = null;
      }

      var touches = relocate(),
          now = Date.now();

      if (touches.length === 1) {
        if (now - touchtime < 500) { // dbltap
          var p = touches[0], l = locations0[p.identifier];
          scaleTo(view.k * 2);
          translateTo(p, l);
          d3_eventPreventDefault();
          zoomed(dispatch);
        }
        touchtime = now;
      } else if (touches.length > 1) {
        var p = touches[0], q = touches[1],
            dx = p[0] - q[0], dy = p[1] - q[1];
        distance0 = dx * dx + dy * dy;
      }
    }

    function moved() {
      var touches = d3.touches(that),
          p0, l0,
          p1, l1;
      for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
        p1 = touches[i];
        if (l1 = locations0[p1.identifier]) {
          if (l0) break;
          p0 = p1, l0 = l1;
        }
      }

      if (l1) {
        var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1,
            scale1 = distance0 && Math.sqrt(distance1 / distance0);
        p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
        scaleTo(scale1 * scale0);
      }

      touchtime = null;
      translateTo(p0, l0);
      zoomed(dispatch);
    }

    function ended() {
      // If there are any globally-active touches remaining, remove the ended
      // touches from locations0.
      if (d3.event.touches.length) {
        var changed = d3.event.changedTouches;
        for (var i = 0, n = changed.length; i < n; ++i) {
          delete locations0[changed[i].identifier];
        }
        // If locations0 is not empty, then relocate and continue listening for
        // touchmove and touchend.
        for (var identifier in locations0) {
          return void relocate(); // locations may have detached due to rotation
        }
      }
      // Otherwise, remove touchmove and touchend listeners.
      target.on(zoomName, null);
      subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
      dragRestore();
      zoomended(dispatch);
    }
  }

  function mousewheeled() {
    var dispatch = event.of(this, arguments);
    if (mousewheelTimer) clearTimeout(mousewheelTimer);
    else d3_selection_interrupt.call(this), zoomstarted(dispatch);
    mousewheelTimer = setTimeout(function() { mousewheelTimer = null; zoomended(dispatch); }, 50);
    d3_eventPreventDefault();
    var point = center || d3.mouse(this);
    if (!translate0) translate0 = location(point);
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.k);
    translateTo(point, translate0);
    zoomed(dispatch);
  }

  function mousewheelreset() {
    translate0 = null;
  }

  function dblclicked() {
    var dispatch = event.of(this, arguments),
        p = d3.mouse(this),
        l = location(p),
        k = Math.log(view.k) / Math.LN2;
    zoomstarted(dispatch);
    scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
    translateTo(p, l);
    zoomed(dispatch);
    zoomended(dispatch);
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

// https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
var d3_behavior_zoomDelta, d3_behavior_zoomWheel
    = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() { return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1); }, "wheel")
    : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() { return d3.event.wheelDelta; }, "mousewheel")
    : (d3_behavior_zoomDelta = function() { return -d3.event.detail; }, "MozMousePixelScroll");
