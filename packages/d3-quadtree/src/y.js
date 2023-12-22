export function defaultY(d) {
  return d[1];
}

export default function(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}
