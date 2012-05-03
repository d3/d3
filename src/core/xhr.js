d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime, mime = null;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  if (mime) req.setRequestHeader("Accept", mime);
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      var s = req.status;
      if (!s && d3_xhrLocal && !d3_xhrCrossDomain(url)) {
        s = req.responseText ? 200 : 404;
      }
      callback(s >= 200 && s < 300 || s === 304 ? req : null);
    }
  };
  req.send(null);
};

var d3_xhrUrl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
    d3_xhrLocation,
    d3_xhrLocal = false;
try {
  d3_xhrLocation = d3_xhrUrl.exec(document.location.href);
  d3_xhrLocal = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/i.test(d3_xhrLocation[1]);
} catch(e) {}

function d3_xhrCrossDomain(url) {
  var parts = d3_xhrUrl.exec(url);
  return !!(parts && (parts[1] != d3_xhrLocation[1] || parts[2] != d3_xhrLocation[2] ||
      (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (d3_xhrLocation[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
}
