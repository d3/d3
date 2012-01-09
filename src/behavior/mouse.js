d3.behavior.mouse = function(container) {
  return d3_behavior_mousePoint(container, d3.event);
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;

function d3_behavior_mousePoint(container, e) {
  var svg = container.ownerSVGElement || container;
  if (svg instanceof SVGSVGElement) {
    var point = svg.createSVGPoint();
    if ((d3_mouse_bug44083 < 0) && (window.scrollX || window.scrollY)) {
      svg = d3.select(document.body)
        .append("svg")
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
  }
  var rect = container.getBoundingClientRect(),
      b = document.body,
      d = document.documentElement,
      x = 0,
      y = 0;
  // http://www.quirksmode.org/js/events_properties.html#link8
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else if (e.clientX || e.clientY) {
    x = e.clientX + b.scrollLeft + d.scrollLeft;
    y = e.clientX + b.scrollTop + d.scrollTop;
  }
  return [x - rect.left, y - rect.top];
};
