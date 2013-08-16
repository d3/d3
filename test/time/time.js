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
    var setFullYear = Date.prototype.setFullYear,
        getFullYear = Date.prototype.getFullYear,
        setMonth = Date.prototype.setMonth,
        getMonth = Date.prototype.getMonth,
        setDate = Date.prototype.setDate,
        getDate = Date.prototype.getDate,
        setHours = Date.prototype.setHours,
        getHours = Date.prototype.getHours,
        setMinutes = Date.prototype.setMinutes,
        getMinutes = Date.prototype.getMinutes;
    try {
      Date.prototype.getFullYear = function() {
        var t = this.getTime();
        try {
          if (t0 <= t) this.setTime(t + (t1 - t0));
          return getFullYear.call(this);
        } finally {
          this.setTime(t);
        }
      };
      Date.prototype.getMonth = function() {
        var t = this.getTime();
        try {
          if (t0 <= t) this.setTime(t + (t1 - t0));
          return getMonth.call(this);
        } finally {
          this.setTime(t);
        }
      };
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
      Date.prototype.setFullYear = function() {
        var t = setFullYear.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      Date.prototype.setMonth = function() {
        var t = setMonth.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      Date.prototype.setDate = function() {
        var t = setDate.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      Date.prototype.setHours = function() {
        var t = setHours.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      Date.prototype.setMinutes = function() {
        var t = setMinutes.apply(this, arguments);
        return t0 <= t ? this.setTime(t0 + (t - t1)) : t;
      };
      scope.apply(this, arguments);
    } finally {
      Date.prototype.setFullYear = setFullYear;
      Date.prototype.getFullYear = getFullYear;
      Date.prototype.setMonth = setMonth;
      Date.prototype.getMonth = getMonth;
      Date.prototype.setDate = setDate;
      Date.prototype.getDate = getDate;
      Date.prototype.setHours = setHours;
      Date.prototype.getHours = getHours;
      Date.prototype.setMinutes = setMinutes;
      Date.prototype.getMinutes = getMinutes;
    }
  };
};
