// TODO allow mime type to be overridden?
d3.html = function() {
  return d3.xhr.apply(d3, arguments)
      .mimeType("text/html")
      .header("Accept", "text/html,*/*")
      .response(d3_html);
};

function d3_html(request) {
  var range = document.createRange();
  range.selectNode(document.body);
  return range.createContextualFragment(request.responseText);
}
