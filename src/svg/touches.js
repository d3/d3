d3.svg.touches = function(container) {
  var touches = d3.event.touches;
  return touches ? d3_svg_mousePoints(container, d3_array(touches)) : [];
};
