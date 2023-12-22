import constant from "./constant.js";
import {withPath} from "./path.js";
import asterisk from "./symbol/asterisk.js";
import circle from "./symbol/circle.js";
import cross from "./symbol/cross.js";
import diamond from "./symbol/diamond.js";
import diamond2 from "./symbol/diamond2.js";
import plus from "./symbol/plus.js";
import square from "./symbol/square.js";
import square2 from "./symbol/square2.js";
import star from "./symbol/star.js";
import triangle from "./symbol/triangle.js";
import triangle2 from "./symbol/triangle2.js";
import wye from "./symbol/wye.js";
import times from "./symbol/times.js";

// These symbols are designed to be filled.
export const symbolsFill = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

// These symbols are designed to be stroked (with a width of 1.5px and round caps).
export const symbolsStroke = [
  circle,
  plus,
  times,
  triangle2,
  asterisk,
  square2,
  diamond2
];

export default function Symbol(type, size) {
  let context = null,
      path = withPath(symbol);

  type = typeof type === "function" ? type : constant(type || circle);
  size = typeof size === "function" ? size : constant(size === undefined ? 64 : +size);

  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}
