d3.xhr = function(url, mimeType, callback) {
  var xhr = {},
      dispatch = d3.dispatch("progress", "load", "error"),
      method = "GET",
      headers = {},
      data,
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

  xhr.method = function(value) {
    if (!arguments.length) return method;
    method = value + "";
    return xhr;
  };

  xhr.header = function(name, value) {
    if (arguments.length < 2) return headers[name];
    if (value == null) delete headers[name];
    else headers[name] = value + "";
    return xhr;
  };

  xhr.mimeType = function(value) {
    if (!arguments.length) return mimeType;
    mimeType = value == null ? null : value + "";
    return xhr;
  };

  // data can be ArrayBuffer, Blob, Document, string, FormData
  xhr.data = function(value) {
    if (!arguments.length) return data;
    data = value == null ? null : value;
    return xhr;
  };

  // Specify how to convert the response content to a specific type;
  // changes the callback value on "load" events.
  xhr.response = function(value) {
    response = value;
    return xhr;
  };

  xhr.send = function() {
    request.open(method, url, true);
    for (var name in headers) request.setRequestHeader(name, headers[name]);
    if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
    request.send(data);
    return xhr;
  };

  xhr.abort = function() {
    request.abort();
    return xhr;
  };

  d3.rebind(xhr, dispatch, "on");

  if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, mimeType = null;

  if (mimeType != null) xhr
      .header("Accept", mimeType + ",*/*");

  if (callback != null) xhr
      .on("error", callback = d3_xhr_fixCallback(callback))
      .on("load", function(result) { callback(null, result); })
      .send();

  return xhr;
};

function d3_xhr_fixCallback(callback) {
  return callback.length === 1
      ? function(error, request) { callback(error == null ? request : null); }
      : callback;
}
