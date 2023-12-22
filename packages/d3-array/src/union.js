import {InternSet} from "internmap";

export default function union(...others) {
  const set = new InternSet();
  for (const other of others) {
    for (const o of other) {
      set.add(o);
    }
  }
  return set;
}
