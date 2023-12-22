export default function permute(source, keys) {
  return Array.from(keys, key => source[key]);
}
