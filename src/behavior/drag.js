// TODO Track touch points by identifier.

d3.behavior.drag = function() {
  var event = d3.dispatch("drag", "dragstart", "dragend"),
      origin = null;

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
    d3_behavior_dragEventTarget = d3.event.target;
    d3_behavior_dragTarget = this;
    d3_behavior_dragArguments = arguments;
    d3_behavior_dragOrigin = d3_behavior_dragPoint();
    if (origin) {
      d3_behavior_dragOffset = origin.apply(d3_behavior_dragTarget, d3_behavior_dragArguments);
      d3_behavior_dragOffset = [d3_behavior_dragOffset.x - d3_behavior_dragOrigin[0], d3_behavior_dragOffset.y - d3_behavior_dragOrigin[1]];
    } else {
      d3_behavior_dragOffset = [0, 0];
    }
    d3_behavior_dragMoved = 0;
  }

  function mousedown() {
    start.apply(this, arguments);
    d3_behavior_dragDispatch("dragstart");
  }

  drag.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return drag;
  };

  return d3.rebind(drag, event, "on");
};

var d3_behavior_dragEvent,
    d3_behavior_dragEventTarget,
    d3_behavior_dragTarget,
    d3_behavior_dragArguments,
    d3_behavior_dragOffset,
    d3_behavior_dragOrigin,
    d3_behavior_dragMoved;

function d3_behavior_dragDispatch(type) {
  var p = d3_behavior_dragPoint(),
      o = d3.event,
      e = d3.event = {type: type};

  if (p) {
    e.x = p[0] + d3_behavior_dragOffset[0];
    e.y = p[1] + d3_behavior_dragOffset[1];
    e.dx = p[0] - d3_behavior_dragOrigin[0];
    e.dy = p[1] - d3_behavior_dragOrigin[1];
    d3_behavior_dragMoved |= e.dx | e.dy;
    d3_behavior_dragOrigin = p;
  }

  try {
    d3_behavior_dragEvent[type].apply(d3_behavior_dragTarget, d3_behavior_dragArguments);
  } finally {
    d3.event = o;
  }

  o.stopPropagation();
  o.preventDefault();
}

function d3_behavior_dragPoint() {
  var p = d3_behavior_dragTarget.parentNode,
      t = d3.event.changedTouches;
  return p && (t
      ? d3.svg.touches(p, t)[0]
      : d3.svg.mouse(p));
}

function d3_behavior_dragMove() {
  if (!d3_behavior_dragTarget) return;
  var parent = d3_behavior_dragTarget.parentNode;

  // O NOES! The drag element was removed from the DOM.
  if (!parent) return d3_behavior_dragUp();

  d3_behavior_dragDispatch("drag");
  d3_eventCancel();
}

function d3_behavior_dragUp() {
  if (!d3_behavior_dragTarget) return;
  d3_behavior_dragDispatch("dragend");

  // If the node was moved, prevent the mouseup from propagating.
  // Also prevent the subsequent click from propagating (e.g., for anchors).
  if (d3_behavior_dragMoved) {
    d3_eventCancel();
    d3_behavior_dragMoved = d3.event.target === d3_behavior_dragEventTarget;
  }

  d3_behavior_dragEvent =
  d3_behavior_dragEventTarget =
  d3_behavior_dragTarget =
  d3_behavior_dragArguments =
  d3_behavior_dragOffset =
  d3_behavior_dragOrigin = null;
}

function d3_behavior_dragClick() {
  if (d3_behavior_dragMoved) {
    d3_eventCancel();
    d3_behavior_dragMoved = 0;
  }
}
