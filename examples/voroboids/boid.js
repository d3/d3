// Boid flocking based on http://harry.me/2011/02/17/neat-algorithms---flocking
var boid = (function() {
  function boid() {
    var position = [0, 0],
        velocity = [0, 0],
        gravityCenter = null,
        neighborRadius = 50,
        maxForce = .1,
        maxSpeed = 1,
        separationWeight = 2,
        alignmentWeight = 1,
        cohesionWeight = 1,
        desiredSeparation = 10;

    function boid(neighbors) {
      var accel = flock(neighbors);
      d3_ai_boidWrap(position);
      velocity[0] += accel[0];
      velocity[1] += accel[1];
      if (gravityCenter) {
        var g = d3_ai_boidGravity(gravityCenter, position, neighborRadius);
        velocity[0] += g[0];
        velocity[1] += g[1];
      }
      d3_ai_boidLimit(velocity, maxSpeed);
      position[0] += velocity[0];
      position[1] += velocity[1];
      return position;
    }

    function flock(neighbors) {
      var separation = [0, 0],
          alignment = [0, 0],
          cohesion = [0, 0],
          separationCount = 0,
          alignmentCount = 0,
          cohesionCount = 0,
          i = -1,
          l = neighbors.length;
      while (++i < l) {
        var n = neighbors[i];
        if (n === this) continue;
        var npos = n.position(),
            d = d3_ai_boidDistance(position, npos);
        if (d > 0) {
          if (d < desiredSeparation) {
            var tmp = d3_ai_boidNormalize(d3_ai_boidSubtract(position.slice(), npos));
            separation[0] += tmp[0] / d;
            separation[1] += tmp[1] / d;
            separationCount++;
          }
          if (d < neighborRadius) {
            var nvel = n.velocity();
            alignment[0] += nvel[0];
            alignment[1] += nvel[1];
            alignmentCount++;
            cohesion[0] += npos[0];
            cohesion[1] += npos[1];
            cohesionCount++;
          }
        }
      }

      if (separationCount > 0) {
        separation[0] /= separationCount;
        separation[1] /= separationCount;
      }

      if (alignmentCount > 0) {
        alignment[0] /= alignmentCount;
        alignment[1] /= alignmentCount;
      }
      d3_ai_boidLimit(alignment, maxForce);

      if (cohesionCount > 0) {
        cohesion[0] /= cohesionCount;
        cohesion[1] /= cohesionCount;
      } else {
        cohesion = position.slice();
      }
      cohesion = steerTo(cohesion);

      return [
        separation[0] * separationWeight +
         alignment[0] * alignmentWeight +
          cohesion[0] * cohesionWeight,
        separation[1] * separationWeight +
         alignment[1] * alignmentWeight +
          cohesion[1] * cohesionWeight
      ];
    }

    function steerTo(target) {
      var desired = d3_ai_boidSubtract(target, position),
          d = d3_ai_boidMagnitude(desired);

      if (d > 0) {
        d3_ai_boidNormalize(desired);

        // Two options for desired vector magnitude (1 -- based on distance, 2 -- maxspeed)
        var mul = maxSpeed * (d < 100 ? d / 100 : 1);
        desired[0] *= mul;
        desired[1] *= mul;

        // Steering = Desired minus Velocity
        var steer = d3_ai_boidSubtract(desired, velocity);
        d3_ai_boidLimit(steer, maxForce)  // Limit to maximum steering force
      } else {
        steer = [0, 0];
      }
      return steer;
    }

    boid.position = function(x) {
      if (!arguments.length) return position;
      position = x;
      return boid;
    }

    boid.velocity = function(x) {
      if (!arguments.length) return velocity;
      velocity = x;
      return boid;
    }

    boid.gravityCenter = function(x) {
      if (!arguments.length) return gravityCenter;
      gravityCenter = x;
      return boid;
    }

    boid.neighborRadius = function(x) {
      if (!arguments.length) return neighborRadius;
      neighborRadius = x;
      return boid;
    }

    boid.maxForce = function(x) {
      if (!arguments.length) return maxForce;
      maxForce = x;
      return boid;
    }

    boid.maxSpeed = function(x) {
      if (!arguments.length) return maxSpeed;
      maxSpeed = x;
      return boid;
    }

    boid.separationWeight = function(x) {
      if (!arguments.length) return separationWeight;
      separationWeight = x;
      return boid;
    }

    boid.alignmentWeight = function(x) {
      if (!arguments.length) return alignmentWeight;
      alignmentWeight = x;
      return boid;
    }

    boid.cohesionWeight = function(x) {
      if (!arguments.length) return cohesionWeight;
      cohesionWeight = x;
      return boid;
    }

    boid.desiredSeparation = function(x) {
      if (!arguments.length) return desiredSeparation;
      desiredSeparation = x;
      return boid;
    }

    return boid;
  }

  function d3_ai_boidNormalize(a) {
    var m = d3_ai_boidMagnitude(a);
    if (m > 0) {
      a[0] /= m;
      a[1] /= m;
    }
    return a;
  }

  function d3_ai_boidWrap(position) {
    if (position[0] > w) position[0] = 0;
    else if (position[0] < 0) position[0] = w;
    if (position[1] > h) position[1] = 0;
    else if (position[1] < 0) position[1] = h;
  }

  function d3_ai_boidGravity(center, position, neighborRadius) {
    if (center[0] != null) {
      var m = d3_ai_boidSubtract(center.slice(), position),
          d = d3_ai_boidMagnitude(m) - 10;
      if (d > 0 && d < neighborRadius * 5) {
        d3_ai_boidNormalize(m);
        m[0] /= d;
        m[1] /= d;
        return m;
      }
    }
    return [0, 0];
  }

  function d3_ai_boidDistance(a, b) {
    var dx = a[0] - b[0],
        dy = a[1] - b[1];
    if (dx > w / 2) dx = w - dx;
    if (dy > h / 2) dy = h - dy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function d3_ai_boidSubtract(a, b) {
    a[0] -= b[0];
    a[1] -= b[1];
    return a;
  }

  function d3_ai_boidMagnitude(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  }

  function d3_ai_boidLimit(a, max) {
    if (d3_ai_boidMagnitude(a) > max) {
      d3_ai_boidNormalize(a);
      a[0] *= max;
      a[1] *= max;
    }
    return a;
  }

  return boid;
})();
