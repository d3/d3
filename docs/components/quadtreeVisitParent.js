export default function quadtree_visitParent(callback) {
  let quads = [], q, node = this._root, parent, child, x0, y0, x1, y1, xm, ym;
  if (node) quads.push({node, x0: this._x0, y0: this._y0, x1: this._x1, y1: this._y1});
  while ((q = quads.pop())) {
    node = q.node, parent = q.parent;
    if (parent) callback(parent.x0, parent.y0, parent.x1, parent.y1);
    if (!node.length) continue;
    x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
    if ((child = node[3])) quads.push({parent: q, node: child, x0: xm, y0: ym, x1: x1, y1: y1});
    if ((child = node[2])) quads.push({parent: q, node: child, x0: x0, y0: ym, x1: xm, y1: y1});
    if ((child = node[1])) quads.push({parent: q, node: child, x0: xm, y0: y0, x1: x1, y1: ym});
    if ((child = node[0])) quads.push({parent: q, node: child, x0: x0, y0: y0, x1: xm, y1: ym});
  }
  return this;
}
