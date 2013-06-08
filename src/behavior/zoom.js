import "../core/document";
import "../core/rebind";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "../selection/selection";
import "behavior";

d3.behavior.zoom = function() {
  var translate = [0, 0],
      translate0, // translate when we started zooming (to avoid drift)
      scale = 1,
      scale0, // scale when we started touching
      scaleExtent = d3_behavior_zoomInfinity,
      event = d3_eventDispatch(zoom, "zoom"),
      x0,
      x1,
      xExtent = d3_behavior_scaleInfinity,
      y0,
      y1,
      yExtent = d3_behavior_scaleInfinity,
      touchtime; // time of last touchstart (to detect double-tap)

  function zoom() {
    this.on("mousedown.zoom", mousedown)
        .on("mousemove.zoom", mousemove)
        .on(d3_behavior_zoomWheel + ".zoom", mousewheel)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart)
        .on("touchmove.zoom", touchmove)
        .on("touchend.zoom", touchstart);
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

  zoom.xExtent = function(x) {
    if (!arguments.length) return xExtent;
    xExtent = (x == null) ? d3_behavior_scaleInfinity : x.map(Number);
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

  zoom.yExtent = function(x) {
    if (!arguments.length) return yExtent;
    yExtent = (x == null) ? d3_behavior_scaleInfinity : x.map(Number);
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
    rescale();    
  }

  function translateTo(p, l) {
    l = point(l);
    translate[0] += p[0] - l[0];
    translate[1] += p[1] - l[1];
    rescale();
  }

  function rescale(dim) {
    if (dim == undefined) {
      rescale(0);
      rescale(1);
      return;
    }

    var s0 = dim ? y0 : x0;
    if (!s0) return;
    var range0 = s0.range(),
        s1 = dim ? y1 : x1,
        extent = dim ? yExtent : xExtent;
    
    // If we can't satisfy both ends of the extent simultaneously, zoom in to the
    // point where we can.
    scale = Math.max (scale, Math.abs((range0[0] - range0[range0.length-1]) /
                                      (s0(extent[0]) - s0(extent[1]))));
    
    function calcDomain() {
      return range0.map(function(r) { return (r - translate[dim]) / scale; }).map(s0.invert);
    }
    var domain = calcDomain();
    if (domain[0] < extent[0]) {
      translate[dim] = range0[0] - (s0(extent[0]) * scale);
    } else if (domain[domain.length-1] > extent[1]) {
      translate[dim] = range0[range0.length-1] - (s0(extent[1]) * scale);
    }
    s1.domain(calcDomain());
  }

  function dispatch(event) {
    d3.event.preventDefault();
    event({type: "zoom", scale: scale, translate: translate});
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        moved = 0,
        w = d3.select(d3_window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup),
        l = location(d3.mouse(target));

    d3_window.focus();
    d3_eventCancel();

    function mousemove() {
      moved = 1;
      translateTo(d3.mouse(target), l);
      dispatch(event_);
    }

    function mouseup() {
      if (moved) d3_eventCancel();
      w.on("mousemove.zoom", null).on("mouseup.zoom", null);
      if (moved && d3.event.target === eventTarget) d3_eventSuppress(w, "click.zoom");
    }
  }

  function mousewheel() {
    if (!translate0) translate0 = location(d3.mouse(this));
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
    translateTo(d3.mouse(this), translate0);
    dispatch(event.of(this, arguments));
  }

  function mousemove() {
    translate0 = null;
  }

  function dblclick() {
    var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
    scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
    translateTo(p, l);
    dispatch(event.of(this, arguments));
  }

  function touchstart() {
    var touches = d3.touches(this),
        now = Date.now();

    scale0 = scale;
    translate0 = {};
    touches.forEach(function(t) { translate0[t.identifier] = location(t); });
    d3_eventCancel();

    if (touches.length === 1) {
      if (now - touchtime < 500) { // dbltap
        var p = touches[0], l = location(touches[0]);
        scaleTo(scale * 2);
        translateTo(p, l);
        dispatch(event.of(this, arguments));
      }
      touchtime = now;
    }
  }

  function touchmove() {
    var touches = d3.touches(this),
        p0 = touches[0],
        l0 = translate0[p0.identifier];
    if (p1 = touches[1]) {
      var p1, l1 = translate0[p1.identifier];
      p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      scaleTo(d3.event.scale * scale0);
    }
    translateTo(p0, l0);
    touchtime = null;
    dispatch(event.of(this, arguments));
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomInfinity = [0, Infinity], // default zoom scale extent
    d3_behavior_scaleInfinity = [-Infinity, Infinity]; // default X and Y scale extent

// https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/wheel
var d3_behavior_zoomDelta, d3_behavior_zoomWheel
    = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() { return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1); }, "wheel")
    : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() { return d3.event.wheelDelta; }, "mousewheel")
    : (d3_behavior_zoomDelta = function() { return -d3.event.detail; }, "MozMousePixelScroll");
