import "xhr";

d3.xml = d3_xhrType(function(request) {
  return request.responseXML;
});
