d3.geo.projection = d3_geo_projection;
d3.geo.projectionMutator = d3_geo_projectionMutator;

function d3_geo_projection(project) {
  return d3_geo_projectionMutator(function() { return project; })();
}

function d3_geo_projectionMutator(projectAt) {
  var project,
      rotate,
      projectRotate,
      k = 150,
      x = 480,
      y = 250,
      λ = 0,
      φ = 0,
      δλ = 0,
      δφ = 0,
      δγ = 0,
      δx = x,
      δy = y,
      δ2 = .5, // (precision in px)².
      clip = d3_geo_projectionCutAntemeridian(rotatePoint),
      clipAngle = null;

  function projection(coordinates) {
    coordinates = projectRotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
    return [coordinates[0] * k + δx, δy - coordinates[1] * k];
  }

  function invert(coordinates) {
    coordinates = projectRotate.invert((coordinates[0] - δx) / k, (δy - coordinates[1]) / k);
    return [coordinates[0] * d3_degrees, coordinates[1] * d3_degrees];
  }

  // TODO automate wrapping.
  projection.point =   function(coordinates, context) { clip.point(coordinates,   resample(context)); };
  projection.line =    function(coordinates, context) { clip.line(coordinates,    resample(context)); };
  projection.polygon = function(coordinates, context) { clip.polygon(coordinates, resample(context)); };

  projection.clipAngle = function(_) {
    if (!arguments.length) return clipAngle;
    clip = _ == null
        ? (clipAngle = _, d3_geo_projectionCutAntemeridian(rotatePoint))
        : d3_geo_circleClip(clipAngle = +_, rotatePoint);
    return projection;
  };

  // TODO this is not just resampling but also projecting
  // TODO don't create a context wrapper for every line & polygon
  function resample(context) {
    var λ00,
        φ00,
        λ0,
        sinφ0,
        cosφ0,
        x0,
        y0,
        maxDepth = δ2 > 0 && 16;

    function point(λ, φ) {
      var p = projectPoint(λ, φ);
      context.point(p[0], p[1]);
    }

    function moveTo(λ, φ) {
      var p = projectPoint(λ00 = λ0 = λ, φ00 = φ);
      sinφ0 = Math.sin(φ);
      cosφ0 = Math.cos(φ);
      context.moveTo(x0 = p[0], y0 = p[1]);
    }

    function lineTo(λ, φ) {
      var p = projectPoint(λ, φ);
      resampleLineTo(x0, y0, λ0, sinφ0, cosφ0,
                     x0 = p[0], y0 = p[1], λ0 = λ, sinφ0 = Math.sin(φ), cosφ0 = Math.cos(φ),
                     maxDepth);
      context.lineTo(x0, y0);
    }

    function resampleLineTo(x0, y0, λ0, sinφ0, cosφ0, x1, y1, λ1, sinφ1, cosφ1, depth) {
      var dx = x1 - x0,
          dy = y1 - y0,
          distance2 = dx * dx + dy * dy;
      if (distance2 > 4 * δ2 && depth--) {
        var cosΩ = sinφ0 * sinφ1 + cosφ0 * cosφ1 * Math.cos(λ1 - λ0),
            k = 1 / (Math.SQRT2 * Math.sqrt(1 + cosΩ)),
            x = k * (cosφ0 * Math.cos(λ0) + cosφ1 * Math.cos(λ1)),
            y = k * (cosφ0 * Math.sin(λ0) + cosφ1 * Math.sin(λ1)),
            z = Math.max(-1, Math.min(1, k * (sinφ0 + sinφ1))),
            φ2 = Math.asin(z),
            zε = Math.abs(Math.abs(z) - 1),
            λ2 = zε < ε || zε < εε && (Math.abs(cosφ0) < εε || Math.abs(cosφ1) < εε)
               ? (λ0 + λ1) / 2 : Math.atan2(y, x),
            p = projectPoint(λ2, φ2),
            x2 = p[0],
            y2 = p[1],
            dx2 = x0 - x2,
            dy2 = y0 - y2,
            dz = dx * dy2 - dy * dx2;
        if (dz * dz / distance2 > δ2) {
          var cosφ2 = Math.cos(φ2);
          resampleLineTo(x0, y0, λ0, sinφ0, cosφ0, x2, y2, λ2, z, cosφ2, depth);
          context.lineTo(x2, y2);
          resampleLineTo(x2, y2, λ2, z, cosφ2, x1, y1, λ1, sinφ1, cosφ1, depth);
        }
      }
    }

    function closePath() {
      var p = projectPoint(λ00, φ00);
      resampleLineTo(x0, y0, λ0, sinφ0, cosφ0, p[0], p[1], λ00, Math.sin(φ00), Math.cos(φ00), maxDepth);
      context.closePath();
    }

    return {
      point: point,
      moveTo: moveTo,
      lineTo: lineTo,
      closePath: closePath
    };
  }

  // TODO remove redundant code with p(coordinates)
  function rotatePoint(coordinates) {
    return rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
  }

  // TODO remove redundant code with p(coordinates)
  function projectPoint(λ, φ) {
    var point = project(λ, φ);
    return [point[0] * k + δx, δy - point[1] * k];
  }

  projection.scale = function(_) {
    if (!arguments.length) return k;
    k = +_;
    return reset();
  };

  projection.translate = function(_) {
    if (!arguments.length) return [x, y];
    x = +_[0];
    y = +_[1];
    return reset();
  };

  projection.center = function(_) {
    if (!arguments.length) return [λ * d3_degrees, φ * d3_degrees];
    λ = _[0] % 360 * d3_radians;
    φ = _[1] % 360 * d3_radians;
    return reset();
  };

  projection.rotate = function(_) {
    if (!arguments.length) return [δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees];
    δλ = _[0] % 360 * d3_radians;
    δφ = _[1] % 360 * d3_radians;
    δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
    return reset();
  };

  projection.precision = function(_) {
    if (!arguments.length) return Math.sqrt(δ2);
    δ2 = _ * _;
    return projection;
  };

  function reset() {
    projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
    var center = project(λ, φ);
    δx = x - center[0] * k;
    δy = y + center[1] * k;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return reset();
  };
}

function d3_geo_projectionIntersectAntemeridian(λ0, φ0, λ1, φ1) {
  var cosφ0,
      cosφ1,
      sinλ0_λ1 = Math.sin(λ0 - λ1);
  return Math.abs(sinλ0_λ1) > ε
      ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1)
                 - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0))
                 / (cosφ0 * cosφ1 * sinλ0_λ1))
      : (φ0 + φ1) / 2;
}

function d3_geo_projectionCutAntemeridian(rotatePoint) {
  var clip = {
    point: function(coordinates, context) {
      var point = rotatePoint(coordinates);
      context.point(point[0], point[1]);
    },
    line: function(coordinates, context, winding) {
      if (!(n = coordinates.length)) return;
      var point = rotatePoint(coordinates[0]),
          keepWinding = true,
          λ0 = point[0],
          φ0 = point[1],
          λ1,
          φ1,
          sλ0 = λ0 > 0 ? π : -π,
          sλ1,
          dλ,
          i = 0,
          n;
      context.moveTo(λ0, φ0);
      while (++i < n) {
        point = rotatePoint(coordinates[i]);
        λ1 = point[0];
        φ1 = point[1];
        sλ1 = λ1 > 0 ? π : -π;
        dλ = Math.abs(λ1 - λ0);
        if (Math.abs(dλ - π) < ε) { // line crosses a pole
          context.lineTo(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
          context.lineTo(sλ0, φ0);
          context.moveTo(sλ1, φ0);
          context.lineTo(λ1, φ0);
          context.lineTo(λ0 = λ1, φ0 = φ1);
          keepWinding = false;
        } else if (sλ0 !== sλ1 && dλ >= π) { // line crosses antemeridian
          φ0 = d3_geo_projectionIntersectAntemeridian(λ0, φ0, λ1, φ1);
          if (Math.abs(λ0 - sλ0) > ε) context.lineTo(sλ0, φ0);
          if (Math.abs(λ1 - sλ1) > ε) context.moveTo(sλ1, φ0), context.lineTo(λ0 = λ1, φ0 = φ1);
          else context.moveTo(λ0 = λ1, φ0 = φ1);
          keepWinding = false;
        } else {
          context.lineTo(λ0 = λ1, φ0 = φ1);
        }
        sλ0 = sλ1;
      }
      if (winding != null) context.closePath();
      return keepWinding && winding;
    },
    polygon: function(polygon, context) {
      d3_geo_circleClipPolygon(polygon, context, clip.line, d3_geo_antemeridianInterpolate, d3_geo_antemeridianAngle);
    }
  };
  return clip;
}

function d3_geo_antemeridianAngle(point) {
  return -(point[0] < 0 ? point[1] - π / 2 : π / 2 - point[1]);
}

function d3_geo_antemeridianInterpolate(from, to, direction, context) {
  from = from.point;
  to = to.point;
  if (Math.abs(from[0] - to[0]) > ε) {
    var s = (from[0] < to[0] ? 1 : -1) * direction * π,
        φ = s / 2;
    context.lineTo(-s, φ);
    context.lineTo( 0, φ);
    context.lineTo( s, φ);
  } else {
    context.lineTo(to[0], to[1]);
  }
}
