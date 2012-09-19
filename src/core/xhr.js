d3.xhr = function(url, mime, callback) {
  var xhr = {},
      dispatch = d3.dispatch("progress", "load", "abort", "error"),
      response = d3_identity,
      request = new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      var s = request.status;
      !s && request.response || s >= 200 && s < 300 || s === 304
          ? dispatch.load.call(xhr, response.call(xhr, request))
          : dispatch.error.call(xhr, request);
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

  // Specify how to convert the response content to a specific type;
  // changes the callback value on "load" events.
  xhr.response = function(value) {
    response = value;
    return xhr;
  };

  // data can be ArrayBuffer, Blob, Document, string, FormData
  xhr.send = function(data) {
    request.send(data == null ? null : data);
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
      if (n > 2) { if (mime != null) xhr.mimeType(mime).header("Accept", mime + ",*/*"); } else callback = mime;
      xhr.on("abort", callback = d3_xhr_fixCallback(callback))
         .on("error", callback)
         .on("load", function(result) { callback(null, result); })
         .send(null);
    }
  }

  return xhr;
};

function d3_xhr_fixCallback(callback) {
  return callback.length === 1
      ? function(error, request) { callback(error == null ? request : null); }
      : callback;
}
