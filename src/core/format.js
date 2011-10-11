// TODO align
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9],
      percentage = false,
      integer = false,
      trim_decimal_zero = false,
      si = false;

  if (precision) precision = precision.substring(1);

  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }

  switch (type) {
    case "n": comma = true; type = "g"; break;
    case "%": percentage = true; type = "f"; break;
    case "p": percentage = true; type = "r"; break;
    case "d": integer = true; precision = "0"; break;
    case "s": si = true; trim_decimal_zero = true; 
              type = "r"; precision = "3"; break;
  }

  type = d3_format_types[type] || d3_format_typeDefault;

  return function(value) {
    var number = percentage ? value * 100 : +value,
        negative = (number < 0) && (number = -number) ? "\u2212" : sign;
        exponent = si ? d3_format_getExponent(number) : 0,
        scale = si ? Math.pow(10, -exponent) : 1,
        si_prefixes = ['y','z','a','f','p','n','μ','m','','k','M','G','T','P','E','Z','Y'],
        suffix = percentage ? '%' : si ? (Math.abs(exponent) < 27) ? si_prefixes[(exponent + 24) / 3] : "e" + exponent : '';

    // Return the empty string for floats formatted as ints.
    if (integer && (number % 1)) return "";

    // Convert the input value to the desired precision.
    value = type(number * scale, precision);

    // if using SI prefix notation, scale and trim insignificant zeros
    if (trim_decimal_zero) {
      value = (new Number(value)).toPrecision();
    }

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }
    value += suffix;


    return value;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_types = {
  g: function(x, p) { return x.toPrecision(p); },
  e: function(x, p) { return x.toExponential(p); },
  f: function(x, p) { return x.toFixed(p); },
  r: function(x, p) {
    var n = x ? 1 + Math.floor(1e-15 + Math.log(x) / Math.LN10) : 1;
    return d3.round(x, p - n).toFixed(Math.max(0, Math.min(20, p - n)));
  // },
  // s: function(x, p) {
  //   // copied from gnuplot and modified
  //   // find exponent and significand
  //   var l10 = Math.log(x) / Math.LN10,
  //       exponent = Math.floor(l10),
  //       mantissa = l10 - exponent,
  //       significand = Math.pow(10, mantissa);
  //   // round exponent to integer multiple of 3
  //   var pr = exponent % 3;
  //   if (pr < 0) exponent -= 3;
  //   significand *= Math.pow(10, (3 + pr) % 3); // if 1 or -2, 10. if -1 or 2, 100.
  //   exponent -= pr;
  //   // decimal significand fixup
  //   var tolerance = 1e-2;
  //   if (significand + tolerance >= 1e3) {
  //     significand /= 1e3;
  //     exponent += 3;
  //   }
  //   var metric_suffix = (Math.abs(exponent) <= 24) ? si_prefixes[(exponent + 24) / 3] : "e" + exponent;
  //   // floating point joy
  //   var sig_round = new Number(d3.format(".3r")(significand));
  //   return sig_round.toPrecision() + metric_suffix;
  }
};

function d3_format_getExponent(value) {
  if (value == 0) return 0;
  var l10 = Math.log(value) / Math.LN10,
      exponent = Math.floor(l10),
      mantissa = l10 - exponent;
      significand = Math.pow(10, mantissa),
      em = exponent % 3;
    if (em < 0) exponent -= 3;
    exponent -= em;
    // equivalent to mantissa += (mod + em) % mod;
    significand *= Math.pow(10, (3 + em) % 3);
    // if rounding the sig up would bring it above 1e3, adjust the exponent
    var tolerance = .5 + 1e-15;
    if (significand + tolerance >= 1e3) exponent += 3;
    // equivalent to if (Math.pow(10, mantissa) + tolerance >= 1e3) exponent += mod;
    return exponent;
}

function d3_format_typeDefault(x) {
  return x + "";
}

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
