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
    d3_behavior_dragEventTarget = d3.event.target;
    d3_behavior_dragOffset = d3_behavior_dragPoint((d3_behavior_dragTarget = this).parentNode);
    d3_behavior_dragMoved = 0;
    d3_behavior_dragArguments = arguments;
  }

  function mousedown() {
    start.apply(this, arguments);
    d3_behavior_dragDispatch("dragstart");
  }

  drag.on = function(type, listener) {
    event[type].add(listener);
    return drag;
  };

  return drag;
};

var d3_behavior_dragEvent,
    d3_behavior_dragEventTarget,
    d3_behavior_dragTarget,
    d3_behavior_dragArguments,
    d3_behavior_dragOffset,
    d3_behavior_dragMoved,
    d3_behavior_dragStopClick;

function d3_behavior_dragDispatch(type) {
  var o = d3.event, p = d3_behavior_dragTarget.parentNode, dx = 0, dy = 0;

  if (p) {
    p = d3_behavior_dragPoint(p);
    dx = p[0] - d3_behavior_dragOffset[0];
    dy = p[1] - d3_behavior_dragOffset[1];
    d3_behavior_dragOffset = p;
    d3_behavior_dragMoved |= dx | dy;
  }

  try {
    d3.event = {dx: dx, dy: dy};
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
  var parent = d3_behavior_dragTarget.parentNode;

  // O NOES! The drag element was removed from the DOM.
  if (!parent) return d3_behavior_dragUp();

  d3_behavior_dragDispatch("drag");
  d3_behavior_dragCancel();
}

function d3_behavior_dragUp() {
  if (!d3_behavior_dragTarget) return;
  d3_behavior_dragDispatch("dragend");
  d3_behavior_dragTarget = null;

  // If the node was moved, prevent the mouseup from propagating.
  // Also prevent the subsequent click from propagating (e.g., for anchors).
  if (d3_behavior_dragMoved && d3_behavior_dragEventTarget === d3.event.target) {
    d3_behavior_dragStopClick = true;
    d3_behavior_dragCancel();
  }
}

function d3_behavior_dragClick() {
  if (d3_behavior_dragStopClick && d3_behavior_dragEventTarget === d3.event.target) {
    d3_behavior_dragCancel();
    d3_behavior_dragStopClick = false;
    d3_behavior_dragEventTarget = null;
  }
}

function d3_behavior_dragCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}
