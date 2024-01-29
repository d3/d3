import {scaleLinear} from "d3-scale";
import {create} from "d3-selection";
import {axisLeft} from "../src/index.js";

export function axisLeftScaleLinear() {
  const svg = create("svg");
  svg.append("g").call(axisLeft(scaleLinear()));
  return svg.node();
}

export function axisLeftScaleLinearNonNumericRange() {
  const svg = create("svg");
  svg.append("g").call(axisLeft(scaleLinear().range([0, "500"])));
  return svg.node();
}
