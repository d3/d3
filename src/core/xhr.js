d3.xhr = function(url, mime, callback) {
  var xhr = {},
      dispatch = d3.dispatch("progress", "load", "abort", "error"),
      request = new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      var s = request.status;
      dispatch[!s && request.response || s >= 200 && s < 300 || s === 304 ? "load" : "error"].call(xhr, request);
    }
  };

  request.onprogress = function(event) {
    var o = d3.event;
    d3.event = event;
    try { dispatch.progress.call(xhr, request); }
    finally { d3.event = o; }
  };

  xhr.open = function(method, url) {
    request.open(method, url, true);
    return xhr;
  };

  xhr.header = function(name, value) {
    request.setRequestHeader(name, value);
    return xhr;
  };

  xhr.mimeType = function(value) {
    if (request.overrideMimeType) request.overrideMimeType(value);
    return xhr;
  };

  // data can be ArrayBuffer, Blob, Document, string, FormData
  xhr.send = function(data) {
    request.send(arguments.length ? data : null);
    return xhr;
  };

  xhr.abort = function() {
    request.abort();
    dispatch.abort.call(xhr, request);
    return xhr;
  };

  d3.rebind(xhr, dispatch, "on");

  var n = arguments.length;
  if (n) {
    xhr.open("GET", url);
    if (n > 1) {
      if (n > 2) { if (mime != null) xhr.mimeType(mime).header("Accept", mime); } else callback = mime;
      callback = d3_xhr_fixCallback(callback);
      xhr.on("load", function() { callback(null, request); });
      xhr.on("abort", function() { callback(request, null); });
      xhr.on("error", function() { callback(request, null); });
      xhr.send(null);
    }
  }

  return xhr;
};

function d3_xhr(adapter) {
  return function(url, mime, callback) {
    if (arguments.length < 3) callback = mime, mime = null;
    callback = d3_xhr_fixCallback(callback);
    return d3.xhr(url, mime, function(error, request) {
      callback(error, error === null ? adapter(request) : null);
    });
  };
}

function d3_xhr_fixCallback(callback) {
  return callback.length === 1
      ? function(error, request) { callback(error == null ? request : null); }
      : callback;
}
