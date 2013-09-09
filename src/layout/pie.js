import "../arrays/range";
import "../arrays/sum";
import "../math/trigonometry";
import "layout";

d3.layout.pie = function() {
  var value = Number,
      sort = d3_layout_pieSortByValue,
      padding = 0,
      startAngle = 0,
      endAngle = 2 * π;

  function pie(data) {
    var len = data.length;

    // Compute the numeric values for each data element.
    var values = data.map(function(d, i) { return +value.call(pie, d, i); });

    // Compute padding if there is more than one arc.
    var p = len > 1 ? (
          +(typeof padding === "function"
          ? padding.apply(this, arguments)
          : padding)
        )
        : 0;

    //Compute the number of spaces we have to layout.
    //If the startAngle and endAngle represents a circle, we use a space after each arc.
    //If it's not a circle, each arc except for the last one gets a space after it.
    var spaceCount = endAngle - startAngle === 2 * π ? len : len - 1;

    // Compute the start angle.
    var a = +(typeof startAngle === "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular scale factor: from value to radians subtracting padding (if set).
    var k = ((typeof endAngle === "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - a - p * spaceCount)
        / d3.sum(values);

    // Optionally sort the data.
    var index = d3.range(len);
    if (sort != null) index.sort(sort === d3_layout_pieSortByValue
        ? function(i, j) { return values[j] - values[i]; }
        : function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs!
    // They are stored in the original data's order.
    var arcs = [];
    index.forEach(function(i) {
      var d;
      arcs[i] = {
        data: data[i],
        value: d = values[i],
        startAngle: a,
        endAngle: a += d * k
      };
      //Add padding.
      a += p;
    });
    return arcs;
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };


  /**
   * Specifies the padding in degrees between each arc. Defaults to 0. The
   * padding can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   * If the pie is a circle (endAngle - startAngle = 2π) a space is laid out
   * after each segment. If it's not a circle each arc except the last one
   * will have a space after it.
   */
  pie.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2π. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};

var d3_layout_pieSortByValue = {};
