export default function quadtree_visitQuad(callback) {
  let quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push({node, x0: this._x0, y0: this._y0, x1: this._x1, y1: this._y1});
  while ((q = quads.pop())) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, q.quad) && node.length) {
      let xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if ((child = node[3])) quads.push({node: child, x0: xm, y0: ym, x1: x1, y1: y1, quad: 3});
      if ((child = node[2])) quads.push({node: child, x0: x0, y0: ym, x1: xm, y1: y1, quad: 2});
      if ((child = node[1])) quads.push({node: child, x0: xm, y0: y0, x1: x1, y1: ym, quad: 1});
      if ((child = node[0])) quads.push({node: child, x0: x0, y0: y0, x1: xm, y1: ym, quad: 0});
    }
  }
  return this;
}
