d3.json = function(url, callback) {
  return d3.xhr(url, "application/json", callback).response(d3_json);
};

function d3_json(request) {
  return JSON.parse(request.responseText);
}
