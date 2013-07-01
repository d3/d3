import "../core/document";
import "../core/rebind";
import "../event/drag";
import "../event/event";
import "../event/mouse";
import "../event/touches";
import "behavior";

d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "mouseup", "dragend"),
      origin = null,
      inertia = false,
      damping = -0.005,

      newDrag = false,
      samples = 8,
      xs = [],
      ys = [],
      ts = [],
      x, y, vx, vy, t;

  function drag() {
    this.on("mousedown.drag", mousedown)
        .on("touchstart.drag", mousedown);
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        touchId = d3.event.touches ? d3.event.changedTouches[0].identifier : null,
        offset,
        origin_ = point(),
        moved = 0,
        dragRestore = d3_event_dragSuppress(touchId != null ? "drag-" + touchId : "drag");

    var w = d3.select(d3_window)
        .on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove)
        .on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", mouseup, true);

    if (origin) {
      offset = origin.apply(target, arguments);
      offset = [offset.x - origin_[0], offset.y - origin_[1]];
    } else {
      offset = [0, 0];
    }

    event_({type: "dragstart"});

    if (inertia) {
      newDrag = true;
      xs.length = 0;
      ys.length = 0;
      ts.length = 0;
    }

    function point() {
      var p = target.parentNode;
      return touchId != null
          ? d3.touches(p).filter(function(p) { return p.identifier === touchId; })[0]
          : d3.mouse(p);
    }

    function dragmove() {
      if (!target.parentNode) return mouseup(); // target removed from DOM

      var p = point(),
          x = p[0] + offset[0],
          y = p[1] + offset[1],
          dx = p[0] - origin_[0],
          dy = p[1] - origin_[1];

      moved |= dx | dy;
      origin_ = p;

      if (inertia) {
        addSamples(x, y);
      }

      event_({type: "drag", x: x, y: y, dx: dx, dy: dy});
    }

    function mouseup() {
      w .on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", null)
        .on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", null);

      dragRestore(moved && d3.event.target === eventTarget);

      var dragEnd = true;
      if (inertia) {
        var p = point();
        addSamples(p[0] + offset[0], p[1] + offset[1]);

        var last = xs.length - 1,
            dt = ts[last] - ts[0];

        if (dt > 1e-5 && ts[last] - ts[last - 1] < 100) {
          // time between the last mousemove and mouseup is < 100ms
          vx = (xs[last] - xs[0]) / dt;
          vy = (ys[last] - ys[0]) / dt;
          t  = ts[last];
          newDrag = false;
          dragEnd = false;
          d3.timer(step);
        }
      }
      event_({type: "mouseup"});
      if (dragEnd) event_({type: "dragend"});
    }

    function step() {
      if (newDrag) return true;

      var now = Date.now(),
          dt = now - t,
          ax = damping * vx,
          ay = damping * vy,
          dx = vx * dt + 0.5 * ax * dt * dt,
          dy = vy * dt + 0.5 * ay * dt * dt;
      x += dx;
      y += dy;
      vx += ax * dt;
      vy += ay * dt;
      t = now;

      event_({type: "drag", x: x, y: y, dx: dx, dy: dy});

      if (Math.abs(vx) < 1e-2 && Math.abs(vy) < 1e-2) {
        event_({type: "dragend"});
        return true;
      }
      return false;
    }

    function addSamples(nx, ny) {
      x = nx;
      y = ny;
      xs.push(x);
      ys.push(y);
      ts.push(Date.now());
      if(xs.length > samples) {
        xs.shift();
        ys.shift();
        ts.shift();
      }
    }
  }

  drag.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return drag;
  };

  drag.inertia = function (x) {
    if (!arguments.length) return inertia;
    inertia = x;
    return drag;
  };

  drag.damping = function (x) {
    if (!arguments.length) return damping;
    damping = x;
    return drag;
  };

  return d3.rebind(drag, event, "on");
};
