d3.json = function(url, callback) {
  return d3.text(url, "application/json", function(text) {
    callback(text && JSON.parse(text));
  });
};
