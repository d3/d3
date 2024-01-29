import {asin, cos, epsilon, sin} from "../math.js";
import {azimuthalInvert} from "./azimuthal.js";
import projection from "./index.js";

export function orthographicRaw(x, y) {
  return [cos(y) * sin(x), sin(y)];
}

orthographicRaw.invert = azimuthalInvert(asin);

export default function() {
  return projection(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + epsilon);
}
