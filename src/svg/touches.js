d3.svg.touches = function(container) {
  var touches = d3.event.touches;
  return touches && touches.length
    ? d3_svg_mousePoints(container, touches) : [];
};
