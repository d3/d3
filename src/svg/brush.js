d3.svg.brush = function() {
  var event = d3.dispatch("brush"),
      x, // x-scale, optional
      y, // y-scale, optional
      selection = [[0, 0], [0, 0]]; // [x0, y0], [x1, y1]

  function brush(selection) {
    selection.each(function(d, i, j) {
      var g = d3.select(this).on("mousedown.brush", down),
          bg = g.selectAll("rect.background").data([,]),
          fg = g.selectAll("rect.selection").data([,]),
          tz = g.selectAll("rect.resize").data(["n", "e", "s", "w", "nw", "ne", "se", "sw"]),
          e;

      // An invisible, mouseable area for starting a new brush.
      bg.enter().append("svg:rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("pointer-events", "all");

      // The current brush selection, made visible.
      fg.enter().append("svg:rect")
          .attr("class", "selection");

      // More visible rects for resizing the selection.
      // TODO We only want some of these thumbs, depending on what scales are defined.
      tz.enter().append("svg:rect")
          .attr("class", function(d) { return "resize " + d; })
          .attr("width", 6)
          .attr("height", 6)
          .style("visibility", "hidden")
          .style("pointer-events", "all")
          .style("cursor", d3_svg_brushCursor);

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
    d3_svg_brushEvent = event.brush;
    d3_svg_brushTarget = this;
    d3_svg_brushArguments = arguments;
    d3_svg_brushX = x;
    d3_svg_brushY = y;
    d3_svg_brushSelection = selection;
    d3_svg_brushOffset = d3.svg.mouse(d3_svg_brushTarget);
    d3_eventCancel();

    // If the selection was clicked on, use dragging rather than brushing;
    // store the offset between the mouse and selection origin instead.
    if (d3_svg_brushDrag = d3.select(d3.event.target).classed("selection")) {
      d3_svg_brushOffset[0] = selection[0][0] - d3_svg_brushOffset[0];
      d3_svg_brushOffset[1] = selection[0][1] - d3_svg_brushOffset[1];
    }
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

  brush.on = function(type, listener) {
    event.on(type, listener);
    return brush;
  };

  d3.select(window)
      .on("mousemove.brush", d3_svg_brushMove)
      .on("mouseup.brush", d3_svg_brushUp);

  return brush;
};

var d3_svg_brushEvent,
    d3_svg_brushTarget,
    d3_svg_brushArguments,
    d3_svg_brushX,
    d3_svg_brushY,
    d3_svg_brushDrag,
    d3_svg_brushOffset;

function d3_svg_brushMove() {
  if (d3_svg_brushOffset) {
    var mouse = d3.svg.mouse(d3_svg_brushTarget),
        g = d3.select(d3_svg_brushTarget);

    if (d3_svg_brushX) {
      d3_svg_brushMove1(mouse, d3_svg_brushX, 0);

      g.select(".selection")
          .attr("x", d3_svg_brushSelection[0][0]);

      g.selectAll(".n,.s,.w,.nw,.sw")
          .attr("x", d3_svg_brushSelection[0][0] - 2);

      g.selectAll(".e,.ne,.se")
          .attr("x", d3_svg_brushSelection[1][0] - 3);

      g.selectAll(".selection,.n,.s")
          .attr("width", d3_svg_brushSelection[1][0] - d3_svg_brushSelection[0][0]);
    }

    if (d3_svg_brushY) {
      d3_svg_brushMove1(mouse, d3_svg_brushY, 1);

      g.select(".selection")
          .attr("y", d3_svg_brushSelection[0][1]);

      g.selectAll(".n,.e,.w,.nw,.ne")
          .attr("y", d3_svg_brushSelection[0][1] - 3);

      g.selectAll(".s,.se,.sw")
          .attr("y", d3_svg_brushSelection[1][1] - 4);

      g.selectAll(".selection,.e,.w")
          .attr("height", d3_svg_brushSelection[1][1] - d3_svg_brushSelection[0][1]);
    }

    d3_svg_brushEvent.apply(d3_svg_brushTarget, d3_svg_brushArguments);
  }
}

function d3_svg_brushMove1(mouse, scale, i) {
  var range = d3_scaleExtent(scale.range()),
      offset = d3_svg_brushOffset[i],
      size = d3_svg_brushSelection[1][i] - d3_svg_brushSelection[0][i],
      min,
      max;

  // When dragging, reduce the range by the selection size and offset.
  if (d3_svg_brushDrag) {
    range[0] -= offset;
    range[1] -= size + offset;
  }

  // Clamp the mouse so that the selection fits within the range extent.
  min = Math.max(range[0], Math.min(range[1], mouse[i]));

  // Compute the new selection bounds.
  if (d3_svg_brushDrag) {
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
    d3_svg_brushEvent =
    d3_svg_brushTarget =
    d3_svg_brushArguments =
    d3_svg_brushX =
    d3_svg_brushY =
    d3_svg_brushDrag =
    d3_svg_brushOffset = null;
    d3_eventCancel();
  }
}

function d3_svg_brushCursor(d, i) {
  return (i < 4
      ? (i & 1 ? "ew" : "ns")
      : (i & 1 ? "nesw" : "nwse"))
      + "-resize";
}
