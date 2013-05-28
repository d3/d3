import "xhr";

d3.xml = function() {
  if (arguments.length === 1) {
    return d3_xhr(arguments[0], null, d3_xml);
  }
  else if (arguments.length === 2) {
    if (typeof arguments[1] === "function") {
      return d3_xhr(arguments[0], null, d3_xml, arguments[1]);
    }
    else {
      return d3_xhr(arguments[0], arguments[1], d3_xml);
    }
  }
  else {
    return d3_xhr(arguments[0], arguments[1], d3_xml, arguments[2]);
  }
};

function d3_xml(request) {
  return request.responseXML;
}
