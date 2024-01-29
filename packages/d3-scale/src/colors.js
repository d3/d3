export default function colors(s) {
  return s.match(/.{6}/g).map(function(x) {
    return "#" + x;
  });
}
