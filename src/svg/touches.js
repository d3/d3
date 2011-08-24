d3.svg.touches = function(container) {
  var touches = d3.event.touches;
  return touches ? Array.prototype.map.call(touches, function(touch) {
    var point = d3_svg_mousePoint(container, touch);
    point.identifier = touch.identifier;
    return point;
  }) : [];
};
