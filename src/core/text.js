d3.text = function() {
  return d3.xhr.apply(d3, arguments).content(d3_text);
};

function d3_text(request) {
  return request.responseText;
}
