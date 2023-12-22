import {sqrt} from "../math.js";

const tan30 = sqrt(1 / 3);
const tan30_2 = tan30 * 2;

export default {
  draw(context, size) {
    const y = sqrt(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};
