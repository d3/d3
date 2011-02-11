// TODO align, type
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = d3_format_signs[match[3]] || d3_format_signs["-"],
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9];
  if (precision) precision = precision.substring(1);
  if (zfill) fill = "0"; // TODO align = "=";
  if (type == "d") precision = "0";
  return function(value) {
    var number = +value,
        negative = (number < 0) && (number = -number);
    if ((type == "d") && (number % 1)) return "";
    if (precision) value = number.toFixed(precision);
    else value = "" + number;
    if (comma) {
      var i = value.lastIndexOf("."),
          f = i >= 0 ? value.substring(i) : (i = value.length, ""),
          t = [];
      while (i > 0) t.push(value.substring(i -= 3, i + 3));
      value = t.reverse().join(",") + f;
    }
    var length = (value = sign(negative, value)).length;
    if (length < width) value = new Array(width - length + 1).join(fill) + value;
    return value;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_signs = {
  "+": function(negative, value) { return (negative ? "\u2212" : "+") + value; },
  " ": function(negative, value) { return (negative ? "\u2212" : " ") + value; },
  "-": function(negative, value) { return negative ? "\u2212" + value : value; }
};
