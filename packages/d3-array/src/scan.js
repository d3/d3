import leastIndex from "./leastIndex.js";

export default function scan(values, compare) {
  const index = leastIndex(values, compare);
  return index < 0 ? undefined : index;
}
