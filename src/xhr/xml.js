import "xhr";

d3.xml = function() {
<<<<<<< HEAD
  return d3.xhr.apply(d3, arguments, d3_xml);
=======
  return d3.xhr.apply(d3, arguments[1], d3_xml, arguments[2]);
>>>>>>> Fix #1260
};

function d3_xml(request) {
  return request.responseXML;
}
