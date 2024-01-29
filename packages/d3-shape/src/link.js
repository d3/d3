import {slice} from "./array.js";
import constant from "./constant.js";
import {bumpX, bumpY, bumpRadial} from "./curve/bump.js";
import {withPath} from "./path.js";
import {x as pointX, y as pointY} from "./point.js";

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

export function link(curve) {
  let source = linkSource,
      target = linkTarget,
      x = pointX,
      y = pointY,
      context = null,
      output = null,
      path = withPath(link);

  function link() {
    let buffer;
    const argv = slice.call(arguments);
    const s = source.apply(this, argv);
    const t = target.apply(this, argv);
    if (context == null) output = curve(buffer = path());
    output.lineStart();
    argv[0] = s, output.point(+x.apply(this, argv), +y.apply(this, argv));
    argv[0] = t, output.point(+x.apply(this, argv), +y.apply(this, argv));
    output.lineEnd();
    if (buffer) return output = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link) : context;
  };

  return link;
}

export function linkHorizontal() {
  return link(bumpX);
}

export function linkVertical() {
  return link(bumpY);
}

export function linkRadial() {
  const l = link(bumpRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}
