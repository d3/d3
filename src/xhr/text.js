import "xhr";

d3.text = function() {
<<<<<<< HEAD
  return d3.xhr.apply(d3, arguments, d3_text);
=======
  return d3.xhr.apply(d3, arguments[1], d3_text, arguments[2]);
>>>>>>> Fix #1260
};

function d3_text(request) {
  return request.responseText;
}
