export default class Context {
  constructor() {
    this._string = "";
  }
  moveTo(x, y) {
    this._string += `M${x},${y}`;
  }
  lineTo(x, y) {
    this._string += `L${x},${y}`;
  }
  closePath() {
    this._string += "Z";
  }
  toString() {
    const string = this._string;
    this._string = "";
    return string;
  }
}
