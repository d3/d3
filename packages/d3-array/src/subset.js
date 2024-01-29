import superset from "./superset.js";

export default function subset(values, other) {
  return superset(other, values);
}
