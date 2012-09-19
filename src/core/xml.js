d3.xml = function() {
  return d3.xhr.apply(d3, arguments).response(d3_xml);
};

function d3_xml(request) {
  return request.responseXML;
}
