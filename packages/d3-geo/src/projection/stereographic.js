import {atan, cos, sin} from "../math.js";
import {azimuthalInvert} from "./azimuthal.js";
import projection from "./index.js";

export function stereographicRaw(x, y) {
  var cy = cos(y), k = 1 + cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

export default function() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
}
