var offset = 0;

exports.local = function(year, month, day, hours, minutes, seconds, milliseconds) {
  var date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(hours || 0, offset + (minutes || 0), seconds || 0, milliseconds || 0);
  return date;
};

exports.utc = function(year, month, day, hours, minutes, seconds, milliseconds) {
  var date = new Date();
  date.setUTCFullYear(year, month, day);
  date.setUTCHours(hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
  return date;
};

exports.zone = function(tzOffset, scope) {
  return function() {
    var o = Date.prototype.getTimezoneOffset;
    try {
      // Note: assumes the dates are not in DST.
      offset = -tzOffset - new Date(0).getTimezoneOffset();
      Date.prototype.getTimezoneOffset = function() { return offset; };
      scope.apply(this, arguments);
    } finally {
      offset = 0;
      Date.prototype.getTimezoneOffset = o;
    }
  };
};
