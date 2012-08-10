d3.xhr = function(url, mime, callback) {
  var xhr = new d3_xhr(url);

  if (callback) xhr.mimeType(mime);
  else callback = mime, mime = null;

  if (callback) xhr.on('success', callback);

  return xhr;
};

d3.xhr.get = function(url, mime, callback){
  return d3.xhr(url, mime, callback);
};

d3.xhr.post = function(url, mime, callback){
  return d3.xhr(url, mime, callback).method('POST');
};

var d3_xhr_events = {
  start: 'loadstart', stop: 'load', cancel: 'abort',
  progress: 'progress', timeout: 'timeout', error: 'error'
};

function make_request(xhr){
  if (xhr.sent) return;

  var dispatcher = xhr.dispatcher;
  var opts = xhr.options;
  var req = xhr.request;

  req.open(opts.method, opts.url, true);

  if (opts.mimeType){
    if (req.overrideMimeType)
      req.overrideMimeType(opts.mimeType);

    req.setRequestHeader('Accept', opts.mimeType);
  }

  if (opts.contentType)
    req.setRequestHeader('Content-Type', opts.contentType);

  // done / fail off readyState
  req.onreadystatechange = function(){
    if (req.readyState === 4){
      var s = req.status;

      if (!s && req.response || s >= 200 && s < 300 || s === 304)
        dispatcher.success(req, xhr);
      else
        dispatcher.error(req, xhr);
    }
  }

  // generate handlers for dispatcher
  var events = d3.map(d3_xhr_events).forEach(function(ev, event){
    var handler = 'on' + event;

    if (req[handler])
      req[handler] = function(e){ dispatcher[ev](req, xhr, e); };
  });

  // finally, send the request
  xhr.sent = true;
  req.send(opts.data);
}

function d3_xhr(url){
  var events = d3.keys(d3_xhr_events).concat('success');
  this.options = { url: url, method: 'GET' };

  this.request = new XMLHttpRequest;
  this.dispatcher = d3.dispatch.apply(null, events);
}

d3_xhr.prototype = {
  on: function(type, listener){
    this.dispatcher.on(type, listener);
    return this;
  },

  url:function(url){
    this.options.url = url;
    return this;
  },

  method:function(method){
    this.options.method = method;
    return this;
  },

  mimeType:function(mime){
    this.options.mimeType = mime;
    return this;
  },

  contentType:function(type){
    this.options.contentType = type;
    return this;
  },

  data:function(data){
    this.options.data = data;
    return this;
  },

  cancel:function(){
    if (this.request)
      this.request.abort();

    return this;
  },

  send:function(data){
    if (data) this.data(data);

    make_request(this);
    return this;
  }
};
