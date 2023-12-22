import {InternSet} from "internmap";

export default function disjoint(values, other) {
  const iterator = other[Symbol.iterator](), set = new InternSet();
  for (const v of values) {
    if (set.has(v)) return false;
    let value, done;
    while (({value, done} = iterator.next())) {
      if (done) break;
      if (Object.is(v, value)) return false;
      set.add(value);
    }
  }
  return true;
}
