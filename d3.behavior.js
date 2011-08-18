(function(){d3.behavior = {};
d3.behavior.drag = function() {
  var event = d3.dispatch("drag", "dragstart", "dragend");

  function drag() {
    this
      .on("mousedown.drag", mousedown)
      .on("touchstart.drag", mousedown);

    d3.select(window)
      .on("mousemove.drag", d3_behavior_dragMove)
      .on("touchmove.drag", d3_behavior_dragMove)
      .on("mouseup.drag", d3_behavior_dragUp, true)
      .on("touchend.drag", d3_behavior_dragUp, true)
      .on("click.drag", d3_behavior_dragClick, true);
  }

  // snapshot the local context for subsequent dispatch
  function start() {
    d3_behavior_dragEvent = event;
    d3_behavior_dragTarget = this;
    d3_behavior_dragMoved = false;
    d3_behavior_dragArguments = arguments;
  }

  function mousedown() {
    start.apply(this, arguments);
    var parent = d3_behavior_dragParent();
    if (!parent) return;
    d3_behavior_dragTo(d3_behavior_dragPoint(parent), "dragstart");
  }

  drag.on = function(type, listener) {
    event[type].add(listener);
    return drag;
  };

  return drag;
};

var d3_behavior_dragEvent,
    d3_behavior_dragTarget,
    d3_behavior_dragMoved,
    d3_behavior_dragStopClick;

function d3_behavior_dragParent() {
  var parent = d3_behavior_dragTarget.parentNode;

  // O NOES! The drag element was removed from the DOM.
  if (!parent) d3_behavior_dragUp();

  return parent;
}

function d3_behavior_dragTo(point, type) {
  var o = d3.event;
  d3.event = {position: point};

  try {
    d3_behavior_dragEvent[type].dispatch.apply(d3_behavior_dragTarget, d3_behavior_dragArguments);
  } finally {
    d3.event = o;
  }

  o.preventDefault();
}

function d3_behavior_dragPoint(container) {
  return d3.event.touches
    ? d3.svg.touches(container)[0]
    : d3.svg.mouse(container);
}

function d3_behavior_dragMove() {
  if (!d3_behavior_dragTarget) return;
  var parent = d3_behavior_dragParent();
  if (!parent) return;

  d3_behavior_dragTo(d3_behavior_dragPoint(parent), "drag");
  d3_behavior_dragMoved = true;
  d3_behavior_dragCancel();
}

function d3_behavior_dragUp() {
  if (!d3_behavior_dragTarget) return;
  var parent = d3_behavior_dragParent();
  if (!parent) return;

  // If the node was moved, prevent the mouseup from propagating.
  // Also prevent the subsequent click from propagating (e.g., for anchors).
  if (d3_behavior_dragMoved) {
    d3_behavior_dragStopClick = true;
    d3_behavior_dragCancel();

    // Don't trigger this for touchend.
    if (d3.event.type === "mouseup") {
      d3_behavior_dragMove();
    }
  }
  d3_behavior_dragTo(d3_behavior_dragPoint(parent), "dragend");

  d3_behavior_dragForce =
  d3_behavior_dragTarget = null;
}

function d3_behavior_dragClick() {
  if (d3_behavior_dragStopClick) {
    d3_behavior_dragCancel();
    d3_behavior_dragStopClick = false;
  }
}

function d3_behavior_dragCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}
// TODO unbind zoom behavior?
// TODO unbind listener?
d3.behavior.zoom = function() {
  var xyz = [0, 0, 0],
      event = d3.dispatch("zoom");

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("DOMMouseScroll.zoom", dblclick)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart);

    d3.select(window)
        .on("mousemove.zoom", d3_behavior_zoomMousemove)
        .on("mouseup.zoom", d3_behavior_zoomMouseup)
        .on("touchmove.zoom", d3_behavior_zoomTouchmove)
        .on("touchend.zoom", d3_behavior_zoomTouchup);
  }

  // snapshot the local context for subsequent dispatch
  function start() {
    d3_behavior_zoomXyz = xyz;
    d3_behavior_zoomDispatch = event.zoom.dispatch;
    d3_behavior_zoomTarget = this;
    d3_behavior_zoomArguments = arguments;
  }

  function mousedown() {
    start.apply(this, arguments);
    d3_behavior_zoomPanning = d3_behavior_zoomLocation(d3.svg.mouse(d3_behavior_zoomTarget));
    d3.event.preventDefault();
    window.focus();
  }

  // store starting mouse location
  function mousewheel() {
    start.apply(this, arguments);
    if (!d3_behavior_zoomZooming) d3_behavior_zoomZooming = d3_behavior_zoomLocation(d3.svg.mouse(d3_behavior_zoomTarget));
    d3_behavior_zoomTo(d3_behavior_zoomDelta() + xyz[2], d3.svg.mouse(d3_behavior_zoomTarget), d3_behavior_zoomZooming);
  }

  function dblclick() {
    start.apply(this, arguments);
    var mouse = d3.svg.mouse(d3_behavior_zoomTarget);
    d3_behavior_zoomTo(d3.event.shiftKey ? Math.ceil(xyz[2] - 1) : Math.floor(xyz[2] + 1), mouse, d3_behavior_zoomLocation(mouse));
  }

  // doubletap detection
  function touchstart() {
    start.apply(this, arguments);
    var touches = d3_behavior_zoomTouchup(),
        touch,
        now = Date.now();
    if ((touches.length === 1) && (now - d3_behavior_zoomLast < 300)) {
      d3_behavior_zoomTo(1 + Math.floor(xyz[2]), touch = touches[0], d3_behavior_zoomLocations[touch.identifier]);
    }
    d3_behavior_zoomLast = now;
  }

  zoom.on = function(type, listener) {
    event[type].add(listener);
    return zoom;
  };

  return zoom;
};

var d3_behavior_zoomDiv,
    d3_behavior_zoomPanning,
    d3_behavior_zoomZooming,
    d3_behavior_zoomLocations = {}, // identifier -> location
    d3_behavior_zoomLast = 0,
    d3_behavior_zoomXyz,
    d3_behavior_zoomDispatch,
    d3_behavior_zoomTarget,
    d3_behavior_zoomArguments;

function d3_behavior_zoomLocation(point) {
  return [
    point[0] - d3_behavior_zoomXyz[0],
    point[1] - d3_behavior_zoomXyz[1],
    d3_behavior_zoomXyz[2]
  ];
}

// detect the pixels that would be scrolled by this wheel event
function d3_behavior_zoomDelta() {

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  if (!d3_behavior_zoomDiv) {
    d3_behavior_zoomDiv = d3.select("body").append("div")
        .style("visibility", "hidden")
        .style("top", 0)
        .style("height", 0)
        .style("width", 0)
        .style("overflow-y", "scroll")
      .append("div")
        .style("height", "2000px")
      .node().parentNode;
  }

  var e = d3.event, delta;
  try {
    d3_behavior_zoomDiv.scrollTop = 1000;
    d3_behavior_zoomDiv.dispatchEvent(e);
    delta = 1000 - d3_behavior_zoomDiv.scrollTop;
  } catch (error) {
    delta = e.wheelDelta || -e.detail;
  }

  return delta * .005;
}

// Note: Since we don't rotate, it's possible for the touches to become
// slightly detached from their original positions. Thus, we recompute the
// touch points on touchend as well as touchstart!
function d3_behavior_zoomTouchup() {
  var touches = d3.svg.touches(d3_behavior_zoomTarget),
      i = -1,
      n = touches.length,
      touch;
  while (++i < n) d3_behavior_zoomLocations[(touch = touches[i]).identifier] = d3_behavior_zoomLocation(touch);
  return touches;
}

function d3_behavior_zoomTouchmove() {
  var touches = d3.svg.touches(d3_behavior_zoomTarget);
  switch (touches.length) {

    // single-touch pan
    case 1: {
      var touch = touches[0];
      d3_behavior_zoomTo(d3_behavior_zoomXyz[2], touch, d3_behavior_zoomLocations[touch.identifier]);
      break;
    }

    // double-touch pan + zoom
    case 2: {
      var p0 = touches[0],
          p1 = touches[1],
          p2 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2],
          l0 = d3_behavior_zoomLocations[p0.identifier],
          l1 = d3_behavior_zoomLocations[p1.identifier],
          l2 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2, l0[2]];
      d3_behavior_zoomTo(Math.log(d3.event.scale) / Math.LN2 + l0[2], p2, l2);
      break;
    }
  }
}

function d3_behavior_zoomMousemove() {
  d3_behavior_zoomZooming = null;
  if (d3_behavior_zoomPanning) d3_behavior_zoomTo(d3_behavior_zoomXyz[2], d3.svg.mouse(d3_behavior_zoomTarget), d3_behavior_zoomPanning);
}

function d3_behavior_zoomMouseup() {
  if (d3_behavior_zoomPanning) {
    d3_behavior_zoomMousemove();
    d3_behavior_zoomPanning = null;
  }
}

function d3_behavior_zoomTo(z, x0, x1) {
  var K = Math.pow(2, (d3_behavior_zoomXyz[2] = z) - x1[2]),
      x = d3_behavior_zoomXyz[0] = x0[0] - K * x1[0],
      y = d3_behavior_zoomXyz[1] = x0[1] - K * x1[1],
      o = d3.event, // Events can be reentrant (e.g., focus).
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
    d3_behavior_zoomDispatch.apply(d3_behavior_zoomTarget, d3_behavior_zoomArguments);
  } finally {
    d3.event = o;
  }

  o.preventDefault();
}
})();
