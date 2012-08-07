d3.xhr = function(url, mime, callback) {
  var xhr = new d3_xhr(url);

  if (callback) xhr.mime_type(mime);
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

  if (opts.mime_type){
    if (req.overrideMimeType)
      req.overrideMimeType(opts.mime_type);

    req.setRequestHeader('Accept', opts.mime_type);
  }

  req.open(opts.method, opts.url, true);

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

  mime_type:function(mime){
    this.options.mime_type = mime;
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
