import count from "../count.js";
import deviation from "../deviation.js";

export default function thresholdScott(values, min, max) {
  const c = count(values), d = deviation(values);
  return c && d ? Math.ceil((max - min) * Math.cbrt(c) / (3.49 * d)) : 1;
}
