import "format";
import "time";

d3_time_format.utc = d3_time_formatUtc;

function d3_time_formatUtc(template) {
  var local = d3_time_format(template);

  function format(date) {
    try {
      d3_date = d3_date_utc;
      var utc = new d3_date();
      utc._ = date;
      return local(utc);
    } finally {
      d3_date = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_date = d3_date_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_date = Date;
    }
  };

  format.toString = local.toString;

  return format;
}
