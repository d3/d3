import count from "../count.js";
import quantile from "../quantile.js";

export default function thresholdFreedmanDiaconis(values, min, max) {
  const c = count(values), d = quantile(values, 0.75) - quantile(values, 0.25);
  return c && d ? Math.ceil((max - min) / (2 * d * Math.pow(c, -1 / 3))) : 1;
}
