d3.svg.brush = function() {
  var event = d3.dispatch("brush"),
      x, // x-scale, optional
      y, // y-scale, optional
      selection = [[0, 0], [0, 0]]; // [x0, y0], [x1, y1]

  function brush(selection) {
    selection.each(function(d, i, j) {
      var g = d3.select(this).on("mousedown.brush", down),
          bg = g.selectAll("rect.background").data([d]),
          fg = g.selectAll("rect.selection").data([d]),
          e;

      // An invisible, mouseable area for starting a new brush.
      bg.enter().append("svg:rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("pointer-events", "all");

      // The current brush selection, made visible.
      fg.enter().append("svg:rect")
          .attr("class", "selection");

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
        selection = d3.select(d3_svg_brushTarget).select(".selection");
    if (d3_svg_brushX) selection.call(d3_svg_brushMove1, mouse, d3_svg_brushX, 0, "x", "width");
    if (d3_svg_brushY) selection.call(d3_svg_brushMove1, mouse, d3_svg_brushY, 1, "y", "height");
    d3_svg_brushEvent.apply(d3_svg_brushTarget, d3_svg_brushArguments);
  }
}

function d3_svg_brushMove1(selection, mouse, scale, i, position, length) {
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

  // Update the selection rect and stored bounds.
  selection
      .attr(position, d3_svg_brushSelection[0][i] = min)
      .attr(length, (d3_svg_brushSelection[1][i] = max) - min);
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
