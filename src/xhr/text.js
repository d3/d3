import "xhr";

d3.text = function() {
  if (arguments.length === 1) {
    return d3_xhr(arguments[0], null, d3_text);
  }
  else if (arguments.length === 2) {
    if (typeof arguments[1] === "function") {
      return d3_xhr(arguments[0], null, d3_text, arguments[1]);
    }
    else {
      return d3_xhr(arguments[0], arguments[1], d3_text);
    }
  }
  else {
    return d3_xhr(arguments[0], arguments[1], d3_text, arguments[2]);
  }
};

function d3_text(request) {
  return request.responseText;
}
