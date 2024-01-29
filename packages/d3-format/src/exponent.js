import {formatDecimalParts} from "./formatDecimal.js";

export default function(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}
