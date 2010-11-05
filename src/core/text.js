d3.text = function(url, mime, callback) {
  var req = new XMLHttpRequest();
  if (arguments.length == 3) req.overrideMimeType(mime);
  else callback = mime;
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      callback(req.status < 300 && req.responseText
          ? req.responseText
          : null);
    }
  };
  req.send(null);
};
