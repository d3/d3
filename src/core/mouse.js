d3.mouse = function(container) {
  return d3_mousePoint(container, d3_eventSource());
};

var d3_mouse_getScreenCTM;
if (/WebKit/.test(navigator.userAgent)) {
  var d3_mouse_bug44083 = -1; // https://bugs.webkit.org/show_bug.cgi?id=44083
  var d3_mouse_zoom_bug = -1; // ToDo: file bug report?
  d3_mouse_getScreenCTM = function(container, e) {
    var ctm,
        test_bug44083 = (d3_mouse_bug44083 < 0) && (window.pageXOffset || window.pageYOffset),
        // Assuming zoom does the same in X and Y so only testing X
        test_zoom_bug = (d3_mouse_zoom_bug < 0) && e.clientX && (e.screenX - window.screenLeft !== e.clientX);

    if (test_bug44083 || test_zoom_bug) {
      var body = document.body,
          bodyPos = body.style.getPropertyValue('position'),
          html = body.parentNode,
          htmlPos = html.style.getPropertyValue('position'),
          svg = d3.select(body).append("svg").style("position", "absolute");

      body.style.setProperty('position', 'static');
      html.style.setProperty('position', 'static');
      if (test_bug44083) {
        svg.style("top", 0).style("left", 0);
        ctm = svg[0][0].getScreenCTM();
        d3_mouse_bug44083 = !(ctm.f || ctm.e);
      }
      if (test_zoom_bug) {
        svg.style("left", "100px");
        ctm = svg[0][0].getScreenCTM();
        d3_mouse_zoom_bug = (ctm.e !== 100);
      }

      svg.remove();
      bodyPos ? body.style.setProperty('position', bodyPos) : body.style.removeProperty('position');
      htmlPos ? html.style.setProperty('position', htmlPos) : html.style.removeProperty('position');
    }

    ctm = container.getScreenCTM();
    if (d3_mouse_bug44083) {
      ctm = ctm.translate(window.pageXOffset, window.pageYOffset);
    }
    if (d3_mouse_zoom_bug) {
      // zoom factor [z = (e.screenX - window.screenLeft) / e.clientX], ctm should be 1/z of it's position
      // the assumption is that zoomX == zoomY if someone can find a browser where this is not true then...
      var s = e.clientX / (e.screenX - window.screenLeft) - 1;
      ctm = ctm.translate(ctm.e * s, ctm.f * s);
    }
    return ctm;
  }
} else {
  d3_mouse_getScreenCTM = function(container) {
    return container.getScreenCTM();
  }
}

function d3_mousePoint(container, e) {
  var svg = container.ownerSVGElement || container;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    point = point.matrixTransform(d3_mouse_getScreenCTM(container, e).inverse());
    return [point.x, point.y];
  }
  var rect = container.getBoundingClientRect();
  return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
};
