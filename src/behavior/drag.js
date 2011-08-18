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
