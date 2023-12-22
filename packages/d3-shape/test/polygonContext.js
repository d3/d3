import {polygonArea} from "d3-polygon";

export function polygonContext() {
  return {
    points: null,
    area() { return Math.abs(polygonArea(this.points)); },
    moveTo(x, y) { this.points = [[x, y]]; },
    lineTo(x, y) { this.points.push([x, y]); },
    rect(x, y, w, h) { this.points = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; },
    closePath() {}
  };
}
