import "../arrays/range";
import "../core/rebind";
import "../interpolate/interpolate";
import "../interpolate/round";
import "../interpolate/uninterpolate";
import "../format/format";
import "bilinear";
import "nice";
import "polylinear";
import "scale";

d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3_interpolate, false);
};

function d3_scale_linear(domain, range, interpolate, clamp) {
  var output,
      input;

  function rescale() {
    var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
    output = linear(domain, range, uninterpolate, interpolate);
    input = linear(range, domain, uninterpolate, d3_interpolate);
    return scale;
  }

  function scale(x) {
    return output(x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(Number);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3_interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    return rescale();
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  scale.tickFormat = function(m, format) {
    return d3_scale_linearTickFormat(domain, m, format);
  };

  scale.nice = function(m) {
    d3_scale_linearNice(domain, m);
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_linear(domain, range, interpolate, clamp);
  };

  return rescale();
}

function d3_scale_linearRebind(scale, linear) {
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

function d3_scale_linearNice(domain, m) {
  return d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
}

function d3_scale_linearTickRange(domain, m) {
  if (m == null) m = 10;

  var extent = d3_scaleExtent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5; // inclusive
  extent[2] = step;
  return extent;
}

function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}

function d3_scale_linearTickFormat(domain, m, format) {
  function decimalPrecision(value) { return -Math.floor(Math.log(value)/Math.LN10 + .01); };
  var range = d3_scale_linearTickRange(domain, m);
  var formatString = format ? 
    format.replace(d3_format_re,
      function(a, b, c, d, e, f, g, h, i, j) {
	// Compute "decimal precision" of the tick step size, i.e., the position of its last 
	// significant digit with respect to the decimal point.
	var decimalPrecisionStep = decimalPrecision(range[2]);
	var precision;
	if (j==="s" || j==="g" || j==="e") {
	  // For these formats, "precision" specifies the number of significant digits, which equals
	  // one plus the difference between the decimal precision of the range's maximum absolute
	  // value (which will equal one of its bounds) and the tick step's decimal precision.
	  var precisionMaxAbsValue = decimalPrecision(Math.max(Math.abs(range[0]), Math.abs(range[1])));
	  precision = Math.abs(decimalPrecisionStep - precisionMaxAbsValue)+1;
	  if (j==="e") {
	    // The digit before the decimal point counts as one.
	    precision -= 1;
          }
        } else {
          // Formats such as "f" use decimal precision.
          precision = decimalPrecisionStep;
        }
        return [ b, c, d, e, f, g, h, i || "." + (precision - (j === "%") * 2), j ].join(""); 
      }) 
    : ",." + decimalPrecision(range[2]) + "f";
  return d3.format(formatString);
}
