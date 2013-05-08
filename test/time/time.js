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

exports.dst = function(date0, date1, scope) {
  var t0 = +date0,
      t1 = +date1;
  return function() {
    var getHours = Date.prototype.getHours,
        setHours = Date.prototype.setHours,
        getMinutes = Date.prototype.getMinutes,
        getDate = Date.prototype.getDate,
        setDate = Date.prototype.setDate;
    try {
      Date.prototype.getDate = function() {
        var t = this.getTime();
        try {
          if (t0 <= t) this.setTime(t + (t1 - t0));
          return getDate.call(this);
        } finally {
          this.setTime(t);
        }
      };
      Date.prototype.getHours = function() {
        var t = this.getTime();
        try {
          if (t0 <= t) this.setTime(t + (t1 - t0));
          return getHours.call(this);
        } finally {
          this.setTime(t);
        }
      };
      Date.prototype.getMinutes = function() {
        var t = this.getTime();
        try {
          if (t0 <= t) this.setTime(t + (t1 - t0));
          return getMinutes.call(this);
        } finally {
          this.setTime(t);
        }
      };
      Date.prototype.setHours = function() {
        var t = setHours.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      Date.prototype.setDate = function() {
        var t = setDate.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      scope.apply(this, arguments);
    } finally {
      Date.prototype.getDate = getDate;
      Date.prototype.setDate = setDate;
      Date.prototype.getHours = getHours;
      Date.prototype.setHours = setHours;
      Date.prototype.getMinutes = getMinutes;
    }
  };
};
