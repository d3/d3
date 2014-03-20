import "../core/document";
import "../core/rebind";
import "../event/drag";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "../event/touch";
import "behavior";

d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
      origin = null,
      mousedown = dragstart(d3_noop, d3.mouse, d3_behavior_dragMouseSubject, "mousemove", "mouseup"),
      touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_behavior_dragTouchSubject, "touchmove", "touchend"),
      pointerdown = dragstart(d3_behavior_dragPointerId, d3.mouse, d3_behavior_dragMouseSubject, "pointermove", "pointerup");

  function drag() {
    if (navigator.pointerEnabled) {
      this.style("touch-action", "none").on("pointerdown.drag", pointerdown);
    } else {
      this.on("mousedown.drag", mousedown)
          .on("touchstart.drag", touchstart);
    }
  }

  function dragstart(id, position, subject, move, end) {
    return function() {
      var element = this,
          parent = element.parentNode,
          dispatch = event.of(element, arguments),
          dragged = 0,
          dragId = id(),
          dragName = ".drag" + (dragId == null ? "" : "-" + dragId),
          dragOffset,
          dragTarget = d3.event.target,
          dragSubject = d3.select(subject()).on(move + dragName, moved).on(end + dragName, ended),
          dragRestore = d3_event_dragSuppress(),
          position0 = position(parent, dragId);

      if (origin) {
        dragOffset = origin.apply(element, arguments);
        dragOffset = [dragOffset.x - position0[0], dragOffset.y - position0[1]];
      } else {
        dragOffset = [0, 0];
      }

      dispatch({type: "dragstart"});

      function moved() {
        if (id(dragId) !== dragId) return;    // this touch didn’t move
        var position1 = position(parent, dragId),
            dx = position1[0] - position0[0],
            dy = position1[1] - position0[1];
        dragged |= dx | dy;
        position0 = position1;

        dispatch({
          type: "drag",
          x: position1[0] + dragOffset[0],
          y: position1[1] + dragOffset[1],
          dx: dx,
          dy: dy
        });
      }

      function ended() {
        if (id(dragId) !== dragId) return;    // this touch didn’t end
        dragSubject.on(move + dragName, null).on(end + dragName, null);
        dragRestore(dragged && d3.event.target === dragTarget);
        dispatch({type: "dragend"});
      }
    };
  }

  drag.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return drag;
  };

  return d3.rebind(drag, event, "on");
};

// While it is possible to receive a touchstart event with more than one changed
// touch, the event is only shared by touches on the same target; for new
// touches targetting different elements, multiple touchstart events are
// received even when the touches start simultaneously. Since multiple touches
// cannot move the same target to different locations concurrently without
// tearing the fabric of spacetime, we allow the first touch to win.
// We also optionally will "look for" a particular touch to check on move/end.
function d3_behavior_dragTouchId(desiredId) {
  var touches = d3.event.changedTouches;
  if (arguments.length) for (var i = 0, n = touches.length; i < n; ++i) {
    if (touches[i].identifier === desiredId) return desiredId;
  } else return touches[0].identifier;
}

function d3_behavior_dragPointerId() {
  return d3.event.pointerId;
}

function d3_behavior_dragTouchSubject() {
  return d3.event.target;
}

function d3_behavior_dragMouseSubject() {
  return d3_window;
}
