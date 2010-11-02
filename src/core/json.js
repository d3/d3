d3.json = function(url, callback) {
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      callback(req.status < 300 && req.responseText
          ? JSON.parse(req.responseText)
          : null);
    }
  };
  req.send(null);
};
