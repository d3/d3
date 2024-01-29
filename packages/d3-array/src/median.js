import quantile, {quantileIndex} from "./quantile.js";

export default function median(values, valueof) {
  return quantile(values, 0.5, valueof);
}

export function medianIndex(values, valueof) {
  return quantileIndex(values, 0.5, valueof);
}
