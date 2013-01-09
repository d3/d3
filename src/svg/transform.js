d3.svg.transform = function() {
  var translate = {"x": 0, "y": 0}
      rotate = null,
      skewX = null,
      skewY = null,
      scale = null;

  transform = {}

  transform.toString = function() {
    var transformations = [];

    if (translate.x !== 0 || translate.y !== 0) {
      var translateStr = "translate(" + translate.x + "," + translate.y + ")";
      transformations.push(translateStr);
    }

    if (rotate !== null) {
      transformations.push("rotate(" + rotate + ")");
    }

    if (scale !== null) {
      transformations.push("scale(" + scale + ")");
    }

    if (skewX !== null) {
      transformations.push("skewX(" + skewX + ")");
    }

    if (skewY !== null) {
      transformations.push("skewY(" + skewY + ")");
    }
     
    return transformations.join(" ");
  }

  /**
   */
  transform.translate = function(x) {
    if (!arguments.length) return translate;
    translate.x = x[0];
    translate.y = x[1];
    return transform;
  };

  transform.translateX = function(x) {
    if (!arguments.length) return translate[0];
    translate.x = x;
    return transform;
  };

  transform.translateY = function(x) {
    if (!arguments.length) return translate[1];
    translate.y = x;
    return transform;
  };

  /**
   */
  transform.rotate = function(x) {
    if (!arguments.length) return rotate;
    rotate = x;
    return transform;
  };

  /**
   */
  transform.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return transform;
  };

  /**
   */
  transform.skewX = function(x) {
    if (!arguments.length) return skewX;
    skewX = x;
    return transform;
  };

  /**
   */
  transform.skewY = function(x) {
    if (!arguments.length) return skewY;
    skewY = x;
    return transform;
  };

  return transform;
};

