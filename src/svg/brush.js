d3.svg.brush = function() {
  var event = d3.dispatch("brush"),
      x, // x-scale, optional
      y, // y-scale, optional
      selection = [[0, 0], [0, 0]]; // [x0, y0], [x1, y1]

  function brush(selection) {
    var resizes = x && y ? d3_svg_brushResizeXY
        : x ? d3_svg_brushResizeX
        : y ? d3_svg_brushResizeY
        : [];

    selection.each(function(d, i, j) {
      var g = d3.select(this).on("mousedown.brush", down),
          bg = g.selectAll(".background").data([,]),
          fg = g.selectAll(".selection").data([,]),
          tz = g.selectAll(".resize").data(resizes, String),
          e;

      // An invisible, mouseable area for starting a new brush.
      bg.enter().append("svg:rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("pointer-events", "all")
          .style("cursor", "crosshair");

      // The current brush selection, made visible.
      fg.enter().append("svg:rect")
          .attr("class", "selection")
          .style("cursor", "move");

      // More visible rects for resizing the selection.
      tz.enter().append("svg:rect")
          .attr("class", function(d) { return "resize " + d; })
          .attr("width", 6)
          .attr("height", 6)
          .style("visibility", "hidden")
          .style("pointer-events", "all")
          .style("cursor", function(d) { return d3_svg_brushCursor[d]; });

      // Remove any superfluous resizers.
      tz.exit().remove();

      // Initialize the background to fill the defined range.
      // If the range isn't defined, we let the caller post-process.
      if (x) {
        e = d3_scaleExtent(x.range());
        bg.attr("x", e[0]).attr("width", e[1] - e[0]);
      }
      if (y) {
        e = d3_scaleExtent(y.range());
        bg.attr("y", e[0]).attr("height", e[1] - e[0]);
      }
    });
  }

  function down() {
    var target = d3.select(d3.event.target);

    d3_svg_brush = brush;
    d3_svg_brushEvent = event.brush;
    d3_svg_brushTarget = this;
    d3_svg_brushArguments = arguments;
    d3_svg_brushSelection = selection;
    d3_svg_brushOffset = d3.svg.mouse(d3_svg_brushTarget);
    d3_eventCancel();

    // If the selection was clicked on, use dragging rather than brushing;
    // store the offset between the mouse and selection origin instead.
    if (d3_svg_brushMode = target.classed("selection")) {
      d3_svg_brushOffset[0] = selection[0][0] - d3_svg_brushOffset[0];
      d3_svg_brushOffset[1] = selection[0][1] - d3_svg_brushOffset[1];
    }

    // If a resizer was clicked on, record which side is resized.
    // Also, set the offset appropriately to the opposite side.
    else if (target.classed("resize")) {
      d3_svg_brushMode = d3.event.target.__data__;
      d3_svg_brushOffset[0] = selection[+/w$/.test(d3_svg_brushMode)][0];
      d3_svg_brushOffset[1] = selection[+/^n/.test(d3_svg_brushMode)][1];
    }

    // Restrict which dimensions are resized.
    d3_svg_brushX = !/^(n|s)$/.test(d3_svg_brushMode) && x;
    d3_svg_brushY = !/^(e|w)$/.test(d3_svg_brushMode) && y;
  }

  brush.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return brush;
  };

  brush.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return brush;
  };

  brush.selection = function() {
    var sx = d3_svg_brushInvert(x, selection, 0),
        sy = d3_svg_brushInvert(y, selection, 1);
    return x && y ? d3.zip(sx, sy) : sx || sy;
  };

  brush.empty = function() {
    return (x && selection[0][0] === selection[1][0])
        || (y && selection[0][1] === selection[1][1]);
  };

  brush.on = function(type, listener) {
    event.on(type, listener);
    return brush;
  };

  d3.select(window)
      .on("mousemove.brush", d3_svg_brushMove)
      .on("mouseup.brush", d3_svg_brushUp);

  return brush;
};

var d3_svg_brushResizeXY = ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
    d3_svg_brushResizeX = ["e", "w"],
    d3_svg_brushResizeY = ["n", "s"],
    d3_svg_brush,
    d3_svg_brushEvent,
    d3_svg_brushTarget,
    d3_svg_brushArguments,
    d3_svg_brushX,
    d3_svg_brushY,
    d3_svg_brushSelection,
    d3_svg_brushMode,
    d3_svg_brushOffset;

function d3_svg_brushInvert(scale, selection, i) {
  if (scale) {
    selection = [scale.invert(selection[0][i]), scale.invert(selection[1][i])];
    return selection[1] < selection[0] ? selection.reverse() : selection;
  }
}

function d3_svg_brushMove() {
  if (d3_svg_brushOffset) {
    var mouse = d3.svg.mouse(d3_svg_brushTarget),
        g = d3.select(d3_svg_brushTarget),
        e = d3.event;

    if (d3_svg_brushX) {
      d3_svg_brushMove1(mouse, d3_svg_brushX, 0);
      g.select(".selection").attr("x", d3_svg_brushSelection[0][0]);
      g.selectAll(".n,.s,.w,.nw,.sw").attr("x", d3_svg_brushSelection[0][0] - 2);
      g.selectAll(".e,.ne,.se").attr("x", d3_svg_brushSelection[1][0] - 3);
      g.selectAll(".selection,.n,.s").attr("width", d3_svg_brushSelection[1][0] - d3_svg_brushSelection[0][0]);
    }

    if (d3_svg_brushY) {
      d3_svg_brushMove1(mouse, d3_svg_brushY, 1);
      g.select(".selection").attr("y", d3_svg_brushSelection[0][1]);
      g.selectAll(".n,.e,.w,.nw,.ne").attr("y", d3_svg_brushSelection[0][1] - 3);
      g.selectAll(".s,.se,.sw").attr("y", d3_svg_brushSelection[1][1] - 4);
      g.selectAll(".selection,.e,.w").attr("height", d3_svg_brushSelection[1][1] - d3_svg_brushSelection[0][1]);
    }

    try {
      d3.event = {target: d3_svg_brush};
      d3_svg_brushEvent.apply(d3_svg_brushTarget, d3_svg_brushArguments);
    } finally {
      d3.event = e;
    }
  }
}

function d3_svg_brushMove1(mouse, scale, i) {
  var range = d3_scaleExtent(scale.range()),
      offset = d3_svg_brushOffset[i],
      size = d3_svg_brushSelection[1][i] - d3_svg_brushSelection[0][i],
      min,
      max;

  // When dragging, reduce the range by the selection size and offset.
  if (+d3_svg_brushMode) {
    range[0] -= offset;
    range[1] -= size + offset;
  }

  // Clamp the mouse so that the selection fits within the range extent.
  min = Math.max(range[0], Math.min(range[1], mouse[i]));

  // Compute the new selection bounds.
  if (+d3_svg_brushMode) {
    max = (min += offset) + size;
  } else if (offset < min) {
    max = min;
    min = offset;
  } else {
    max = offset;
  }

  // Update the stored bounds.
  d3_svg_brushSelection[0][i] = min;
  d3_svg_brushSelection[1][i] = max;
}

function d3_svg_brushUp() {
  if (d3_svg_brushOffset) {
    d3_svg_brushMove();
    d3_svg_brush =
    d3_svg_brushEvent =
    d3_svg_brushTarget =
    d3_svg_brushArguments =
    d3_svg_brushX =
    d3_svg_brushY =
    d3_svg_brushSelection =
    d3_svg_brushMode =
    d3_svg_brushOffset = null;
    d3_eventCancel();
  }
}

var d3_svg_brushCursor = {
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};
