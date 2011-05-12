d3.svg.mouse = function(container) {
  return d3_svg_mousePoint(container, d3.event);
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;

function d3_svg_mousePoint(container, e) {
  var point = (container.ownerSVGElement || container).createSVGPoint();
  if ((d3_mouse_bug44083 < 0) && (window.scrollX || window.scrollY)) {
    var svg = d3.select(document.body)
      .append("svg:svg")
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0);
    var ctm = svg[0][0].getScreenCTM();
    d3_mouse_bug44083 = !(ctm.f || ctm.e);
    svg.remove();
  }
  if (d3_mouse_bug44083) {
    point.x = e.pageX;
    point.y = e.pageY;
  } else {
    point.x = e.clientX;
    point.y = e.clientY;
  }
  point = point.matrixTransform(container.getScreenCTM().inverse());
  return [point.x, point.y];
};
