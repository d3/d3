import "xhr";

d3.json = function(url, callback) {
<<<<<<< HEAD
  return d3.xhr(url, "application/json", callback, d3_json);
=======
  return d3.xhr(url, "application/json", d3_json, callback);
>>>>>>> Fix #1260
};

function d3_json(request) {
  return JSON.parse(request.responseText);
}
