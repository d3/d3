d3.csv = function(url, callback) {
  return d3.text(url, "text/csv", function(text) {
    callback(text && d3.csv.parse(text));
  });
};
