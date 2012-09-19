// TODO allow mime type to be overridden?
d3.json = function() {
  return d3.xhr.apply(d3, arguments)
      .mimeType("application/json")
      .header("Accept", "application/json,*/*")
      .response(d3_json);
};

function d3_json(request) {
  return JSON.parse(request.responseText);
}
