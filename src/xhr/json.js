import "xhr";

d3.json = function(url, callback) {
  return d3.xhr(url, "application/json", d3_json, callback);
};

function d3_json(request) {
  return JSON.parse(request.responseText);
}
