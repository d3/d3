function d3_geom_voronoiRedBlackTree() {
  this._ = null; // root node
}

function d3_geom_voronoiRedBlackNode() {
  this.U = // parent node
  this.C = // color - true for red, false for black
  this.L = // left node
  this.R = // right node
  this.P = // previous node
  this.N = null; // next node
}

d3_geom_voronoiRedBlackTree.prototype = {

  insert: function(node, successor) {
    var parent, grandpa, uncle;

    if (node) {
      successor.P = node;
      successor.N = node.N;
      if (node.N) node.N.P = successor;
      node.N = successor;
      if (node.R) {
        node = node.R;
        while (node.L) node = node.L;
        node.L = successor;
      } else {
        node.R = successor;
      }
      parent = node;
    } else if (this._) {
      node = d3_geom_voronoiRedBlackFirst(this._);
      successor.P = null;
      successor.N = node;
      node.P = node.L = successor;
      parent = node;
    } else {
      successor.P = successor.N = null;
      this._ = successor;
      parent = null;
    }
    successor.L = successor.R = null;
    successor.U = parent;
    successor.C = true;

    node = successor;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          node = grandpa;
        } else {
          if (node === parent.R) {
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            node = parent;
            parent = node.U;
          }
          parent.C = false;
          grandpa.C = true;
          d3_geom_voronoiRedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          node = grandpa;
        } else {
          if (node === parent.L) {
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            node = parent;
            parent = node.U;
          }
          parent.C = false;
          grandpa.C = true;
          d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
        }
      }
      parent = node.U;
    }
    this._.C = false;
  },

  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;

    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        isRed;

    if (!left) next = right;
    else if (!right) next = left;
    else next = d3_geom_voronoiRedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      isRed = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      isRed = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (isRed) return;
    if (node && node.C) { node.C = false; return; }

    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          d3_geom_voronoiRedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          d3_geom_voronoiRedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          d3_geom_voronoiRedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if ((sibling.L && sibling.L.C)
          || (sibling.R && sibling.R.C)) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          d3_geom_voronoiRedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);
    if (node) node.C = false;
  }

};

function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function d3_geom_voronoiRedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function d3_geom_voronoiRedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}
