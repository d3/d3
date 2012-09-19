d3.html = function(url, callback) {
  return d3.xhr(url, "text/html", callback).response(d3_html);
};

function d3_html(request) {
  var range = document.createRange();
  range.selectNode(document.body);
  return range.createContextualFragment(request.responseText);
}
