export default function quadtree_nodes() {
  const nodes = [];
  this.visit((node, x1, y1, x2, y2) => void nodes.push({x1, y1, x2, y2}));
  return nodes;
}
