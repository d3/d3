d3.xhr = function(url, mime, callback) {
  var xhr = {},
      headers = {}
      method = "GET",
      data = null,
      req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime, mime = null;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  if (mime) headers["Accept"] = mime;

  // Push the XMLHttpRequest back one tick to allow changed parameters
  setTimeout(function() {
    req.open(method, url, true);
    d3.entries(headers).forEach(function(d) {
      req.setRequestHeader(d.key,d.value)
    })
    
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        var s = req.status;
        callback(!s && req.response || s >= 200 && s < 300 || s === 304 ? req : null);
      }
    };
    console.log([headers,data])
    req.send(data);
  },0)
  
  xhr.setRequestHeader = function(key,value)  {
    if (!value) {
      delete headers[key];
    } else {
      headers[key] = value;  
    }
    return xhr;
  }

  xhr.data = function(d) {
    data = d;
    return xhr;
  }

  xhr.method = function(d) {
    method = d;
    return xhr;
  }

  return xhr;

};
