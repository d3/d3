exports.local = function(year, month, day, hours, minutes, seconds, milliseconds) {
  var date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
  return date;
};

exports.utc = function(year, month, day, hours, minutes, seconds, milliseconds) {
  var date = new Date();
  date.setUTCFullYear(year, month, day);
  date.setUTCHours(hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
  return date;
};

exports.zone = function(tz, scope) {
  return function() {
    var o = process.env.TZ;
    try {
      process.env.TZ = tz;
      new Date(0).toString(); // invalidate node's dst cache
      new Date().toString();
      scope.apply(this, arguments);
    } finally {
      process.env.TZ = o;
      new Date(0).toString(); // invalidate node's dst cache
      new Date().toString();
    }
  };
};
