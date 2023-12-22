import exponent from "./exponent.js";

export default function(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}
