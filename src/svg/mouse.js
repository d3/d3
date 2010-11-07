d3.svg.mouse = function(container) {
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
    point.x = d3.event.pageX;
    point.y = d3.event.pageY;
  } else {
    point.x = d3.event.clientX;
    point.y = d3.event.clientY;
  }
  point = point.matrixTransform(container.getScreenCTM().inverse());
  return [point.x, point.y];
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;
