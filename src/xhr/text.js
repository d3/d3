import "xhr";

d3.text = function() {
  return d3.xhr.apply(d3, arguments[1], d3_text, arguments[2]);
};

function d3_text(request) {
  return request.responseText;
}
