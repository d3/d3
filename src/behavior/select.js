d3.behavior.select = function() {
  var event = d3.dispatch("select", "selectstart", "selectend"),
      size = d3_behavior_selectSize;

  function select(g) {
    g.each(function(d, i) {
      var target = this,
          s = size.call(this, d, i);

      d3.select(this.parentNode)
          .on("mousedown", function() {
            var m = d3.svg.mouse(this);
            s.x = m[0];
            s.y = m[1];
            s.dx = s.dy = 0;
          })
          .call(d3.behavior.drag()
            .on("dragstart", function() {
              dispatch.call(target, "selectstart", arguments);
            })
            .on("drag", function() {
              var e = d3.event;
              s.dx += e.dx;
              s.dy += e.dy;
              dispatch.call(target, "select", s, arguments);
            })
            .on("dragend", function() {
              dispatch.call(target, "selectend", arguments);
            }));
      d3.select(this)
          .on("mousedown", d3_behavior_selectCancel)
          .call(d3.behavior.drag()
            .on("dragstart", function() {
              dispatch.call(this, "selectstart", arguments);
            })
            .on("drag", function() {
              var e = d3.event;
              s.x += e.dx;
              s.y += e.dy;
              dispatch.call(this, "select", s, arguments);
            })
            .on("dragend", function() {
              dispatch.call(this, "selectend", arguments);
            }));
    });
    return select;
  }

  function dispatch(type, s, args) {
    var o = d3.event;
    try {
      d3.event = s;
      event[type].dispatch.apply(this, args);
    } finally {
      d3.event = o;
    }
  }

  select.size = function(x) {
    if (!arguments.length) return size;
    size = d3.functor(x);
    return select;
  };

  select.on = function(type, listener) {
    event[type].add(listener);
    return select;
  };

  return select;
};

function d3_behavior_selectCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_behavior_selectSize() {
  return {};
}
