export function testContext() {
  let buffer = [];
  return {
    arc(x, y, r) { buffer.push({type: "arc", x: Math.round(x), y: Math.round(y), r: r}); },
    moveTo(x, y) { buffer.push({type: "moveTo", x: Math.round(x), y: Math.round(y)}); },
    lineTo(x, y) { buffer.push({type: "lineTo", x: Math.round(x), y: Math.round(y)}); },
    closePath() { buffer.push({type: "closePath"}); },
    result() { let result = buffer; buffer = []; return result; }
  };
}
