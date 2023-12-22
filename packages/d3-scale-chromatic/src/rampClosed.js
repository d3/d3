import {scaleSequential} from "d3-scale";
import {interpolateRgbBasisClosed} from "d3-interpolate";
import colors from "./colors.js";

export default function(range) {
  var s = scaleSequential(interpolateRgbBasisClosed(colors(range))).clamp(true);
  delete s.clamp;
  return s;
}
