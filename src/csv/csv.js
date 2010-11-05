d3.csv = function(url, callback) {
  d3.text(url, "text/csv", function(text) {
    callback(text && d3.csv.parse(text));
  });
};
