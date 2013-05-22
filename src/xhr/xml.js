import "xhr";

d3.xml = function() {
  return d3.xhr.apply(d3, arguments[1], d3_xml, arguments[2]);
};

function d3_xml(request) {
  return request.responseXML;
}
