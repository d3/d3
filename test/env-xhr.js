var fs = require("fs");

XMLHttpRequest = function() {
  var self = this,
      info = self._info = {},
      headers = {},
      url;

  // TODO handle file system errors?

  self.open = function(m, u, a) {
    info.url = u;
    info.async = a;
    self.send = a ? read : readSync;
  };

  self.setRequestHeader = function(n, v) {
    if (/^Accept$/i.test(n)) info.mimeType = v;
  };

  function read() {
    fs.readFile(info.url, "binary", function(e, d) {
      if (e) {
        self.status = 404; // assumed
      } else {
        self.status = 200;
        self.responseText = d;
        self.responseXML = {_xml: d};
        headers["Content-Length"] = d.length;
      }
      self.readyState = 4;
      XMLHttpRequest._last = self;
      if (self.onreadystatechange) self.onreadystatechange();
    });
  }

  function readSync() {
    try {
      var d = fs.readFileSync(info.url, "binary");
      self.status = 200;
      self.responseText = d;
      self.responseXML = {_xml: d};
      headers["Content-Length"] = d.length;
    } catch (e) {
      self.status = 404; // assumed
    }
    self.readyState = 4;
    XMLHttpRequest._last = self;
    if (self.onreadystatechange) self.onreadystatechange();
  }

  self.getResponseHeader = function(n) {
    return headers[n];
  };
};
