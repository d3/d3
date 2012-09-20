d3.urlencode = function(name, value) {
  var array = [];
  d3_arraySubclass(array, d3_urlencodePrototype);
  return arguments.length ? array.and(name, value) : array;
};

var d3_urlencodePrototype = d3.urlencode.prototype = [];

d3_urlencodePrototype.type = "application/x-www-form-urlencoded;charset=utf-8";

d3_urlencodePrototype.and = function(name, value) {
  name = d3_urlencode(name);
  this.push(value == null ? name : name + "=" + d3_urlencode(value));
  return this;
};

d3_urlencodePrototype.toString = function() {
  return this.join("&");
};

function d3_urlencode(value) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}
