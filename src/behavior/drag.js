import "../core/document";
import "../core/rebind";
import "../event/drag";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "behavior";

d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
      origin = null,
      mousedown = dragstart(d3_noop, d3.mouse, "mousemove", "mouseup"),
      touchstart = dragstart(touchid, touchposition, "touchmove", "touchend");

  function drag() {
    this.on("mousedown.drag", mousedown)
        .on("touchstart.drag", touchstart);
  }

  function touchid() {
    return d3.event.changedTouches[0].identifier;
  }

  function touchposition(parent, id) {
    return d3.touches(parent).filter(function(p) { return p.identifier === id; })[0];
  }

  function dragstart(id, position, move, end) {
    return function() {
      var target = this,
          parent = target.parentNode,
          event_ = event.of(target, arguments),
          eventTarget = d3.event.target,
          eventId = id(),
          drag = eventId == null ? "drag" : "drag-" + eventId,
          origin_ = position(parent, eventId),
          dragged = 0,
          offset,
          w = d3.select(d3_window).on(move + "." + drag, moved).on(end + "." + drag, ended),
          dragRestore = d3_event_dragSuppress();

      if (origin) {
        offset = origin.apply(target, arguments);
        offset = [offset.x - origin_[0], offset.y - origin_[1]];
      } else {
        offset = [0, 0];
      }

      event_({type: "dragstart"});

      function moved() {
        var p = position(parent, eventId),
            dx = p[0] - origin_[0],
            dy = p[1] - origin_[1];

        dragged |= dx | dy;
        origin_ = p;

        event_({type: "drag", x: p[0] + offset[0], y: p[1] + offset[1], dx: dx, dy: dy});
      }

      function ended() {
        w.on(move + "." + drag, null).on(end + "." + drag, null);
        dragRestore(dragged && d3.event.target === eventTarget);
        event_({type: "dragend"});
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
