d3.time.format.utc = function(template) {
  var local = d3.time.format(template);

  function format(date) {
    try {
      d3_time = d3_time_format_utc;
      var utc = new d3_time();
      utc._ = date;
      return local(utc);
    } finally {
      d3_time = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_time = d3_time_format_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_time = Date;
    }
  };

  format.toString = local.toString;

  return format;
};

function d3_time_format_utc() {
  this._ = new Date(Date.UTC.apply(this, arguments));
}

d3_time_format_utc.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.getTime(); },
  setDate: function(x) { this._.setUTCDate(x); },
  setDay: function(x) { this._.setUTCDay(x); },
  setFullYear: function(x) { this._.setUTCFullYear(x); },
  setHours: function(x) { this._.setUTCHours(x); },
  setMilliseconds: function(x) { this._.setUTCMilliseconds(x); },
  setMinutes: function(x) { this._.setUTCMinutes(x); },
  setMonth: function(x) { this._.setUTCMonth(x); },
  setSeconds: function(x) { this._.setUTCSeconds(x); }
};
