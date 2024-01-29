function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

export default function merge(arrays) {
  return Array.from(flatten(arrays));
}
