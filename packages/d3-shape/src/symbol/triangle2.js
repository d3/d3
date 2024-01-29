import {sqrt} from "../math.js";

const sqrt3 = sqrt(3);

export default {
  draw(context, size) {
    const s = sqrt(size) * 0.6824;
    const t = s  / 2;
    const u = (s * sqrt3) / 2; // cos(Math.PI / 6)
    context.moveTo(0, -s);
    context.lineTo(u, t);
    context.lineTo(-u, t);
    context.closePath();
  }
};
