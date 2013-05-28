import "xhr";

d3.text = d3_xhrType(function(request) {
  return request.responseText;
});
