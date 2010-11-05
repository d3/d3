d3.time.format = function(template) {
  var format = {};

  format.format = function(date) {
    var string = [],
        i = -1,
        j = 0,
        n = template.length,
        c,
        f;
    while (++i < n) {
      if (template.charCodeAt(i) == 37) {
        string.push(
            template.substring(j, i),
            f = d3_time_formats(c = template.charAt(i + 1))
            ? f(date) : c);
        j = i + 1;
      }
    }
    return string.join("");
  };
  
  // TODO format.parse = function(string) {};
  
  return format;
};

var d3_time_zfill2 = d3.format("02d"),
    d3_time_zfill3 = d3.format("03d"),
    d3_time_zfill4 = d3.format("04d"),
    d3_time_sfill2 = d3.format(" 2d");

var d3_time_formats = {
  "a": function(d) { return d3_time_weekdays[d.getDay()].substring(0, 3); },
  "A": function(d) { return d3_time_weekdays[d.getDay()]; },
  "b": function(d) { return d3_time_months[d.getMonth()].substring(0, 3); },
  "B": function(d) { return d3_time_months[d.getMonth()]; },
  "c": d3_time_localeFull,
  "d": function(d) { return d3_time_zfill2(d.getDate()); },
  "e": function(d) { return d3_time_sfill2(d.getDate()); },
  "H": function(d) { return d3_time_zfill2(d.getHours()); },
  "I": function(d) { return d3_time_zfill2(d.getHours() % 12 || 12); },
  "j": d3_time_dayOfYear,
  "m": function(d) { return d3_time_zfill2(d.getMonth() + 1); },
  "M": function(d) { return d3_time_zfill2(d.getMinutes()); },
  "p": function(d) { return d.getHours() >= 12 ? "PM" : "AM"; },
  "S": function(d) { return d3_time_zfill2(d.getSeconds()); },
  "U": d3_time_weekNumberSunday,
  "w": function(d) { return d.getDay(); },
  "W": d3_time_weekNumberMonday,
  "x": d3_time_localeDate,
  "X": d3_time_localeTime,
  "y": function(d) { return d3_time_zfill2(d.getYear() % 100); },
  "Y": function(d) { return d3_time_zfill4(d.getFullYear() % 10000); },
  "Z": d3_time_zone,
  "%": function(d) { return "%"; }
};

var d3_time_localeDate = d3.time.format("%m/%d/%y"),
    d3_time_localeTime = d3.time.format("%H:%M:%S"),
    d3_time_localeFull = d3.time.format("%a %b %e %H:%M:%S %Y");

var d3_time_weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

var d3_time_months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function d3_time_dayOfYear(d) {
  return d3_time_zfill3(1 + ~~((d - new Date(d.getFullYear(), 0, 1)) / 864e5));
}

function d3_time_weekNumberSunday(d) {
  var d0 = new Date(d.getFullYear(), 0, 1);
  return d3_time_zfill2(~~(((d - d0) / 864e5 + d0.getDay()) / 7));
}

function d3_time_weekNumberMonday(d) {
  var d0 = new Date(d.getFullYear(), 0, 1);
  return d3_time_zfill2(~~(((d - d0) / 864e5 + (d0.getDay() + 6) % 7) / 7));
}

// TODO table of time zone offset names?
function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
      zs = z < 0 ? "-" : "+",
      zh = ~~(Math.abs(z) / 60),
      zm = Math.abs(z) % 60;
  return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
}
