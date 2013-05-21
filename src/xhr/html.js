import "../core/document";
import "xhr";

d3.html = function(url, callback) {
<<<<<<< HEAD
  return d3.xhr(url, "text/html", callback, d3_html);
=======
  return d3.xhr(url, "text/html", d3_html, callback);
>>>>>>> Fix #1260
};

function d3_html(request) {
  var range = d3_document.createRange();
  range.selectNode(d3_document.body);
  return range.createContextualFragment(request.responseText);
}
