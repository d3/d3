import {acos, sin} from "../math.js";
import {azimuthalRaw, azimuthalInvert} from "./azimuthal.js";
import projection from "./index.js";

export var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

export default function() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}
