d3.html = function(url, callback) {
  callback = d3_xhr_fixCallback(callback);
  return d3.text(url, "text/html", function(error, data) {
    if (error == null) {
      var range = document.createRange();
      range.selectNode(document.body);
      data = range.createContextualFragment(data);
    }
    callback(error, data);
  });
};
