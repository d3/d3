d3.xml = function() {
  return d3.xhr.apply(d3, arguments).content(d3_xml);
};

function d3_xml(request) {
  return request.responseXML;
}
