import ascending from "./ascending.js";
import bisector from "./bisector.js";
import number from "./number.js";

const ascendingBisect = bisector(ascending);
export const bisectRight = ascendingBisect.right;
export const bisectLeft = ascendingBisect.left;
export const bisectCenter = bisector(number).center;
export default bisectRight;
