function d3_geom_voronoiRedBlackTree() {
  this.root = null;
}

d3_geom_voronoiRedBlackTree.prototype = {
  rbInsert: function(node, successor) {
    var parent, grandpa, uncle;

    if (node) {
      successor.rbPrevious = node;
      successor.rbNext = node.rbNext;
      if (node.rbNext) node.rbNext.rbPrevious = successor;
      node.rbNext = successor;
      if (node.rbRight) {
        node = node.rbRight;
        while (node.rbLeft) node = node.rbLeft;
        node.rbLeft = successor;
      } else {
        node.rbRight = successor;
      }
      parent = node;
    } else if (this.root) {
      node = this.rbFirst(this.root);
      successor.rbPrevious = null;
      successor.rbNext = node;
      node.rbPrevious = node.rbLeft = successor;
      parent = node;
    } else {
      successor.rbPrevious = successor.rbNext = null;
      this.root = successor;
      parent = null;
    }
    successor.rbLeft = successor.rbRight = null;
    successor.rbParent = parent;
    successor.rbRed = true;

    node = successor;
    while (parent && parent.rbRed) {
      grandpa = parent.rbParent;
      if (parent === grandpa.rbLeft) {
        uncle = grandpa.rbRight;
        if (uncle && uncle.rbRed) {
          parent.rbRed = uncle.rbRed = false;
          grandpa.rbRed = true;
          node = grandpa;
        } else {
          if (node === parent.rbRight) {
            this.rbRotateLeft(parent);
            node = parent;
            parent = node.rbParent;
          }
          parent.rbRed = false;
          grandpa.rbRed = true;
          this.rbRotateRight(grandpa);
        }
      } else {
        uncle = grandpa.rbLeft;
        if (uncle && uncle.rbRed) {
          parent.rbRed = uncle.rbRed = false;
          grandpa.rbRed = true;
          node = grandpa;
        } else {
          if (node === parent.rbLeft) {
            this.rbRotateRight(parent);
            node = parent;
            parent = node.rbParent;
          }
          parent.rbRed = false;
          grandpa.rbRed = true;
          this.rbRotateLeft(grandpa);
        }
      }
      parent = node.rbParent;
    }
    this.root.rbRed = false;
  },

  rbRemove: function(node) {
    if (node.rbNext) node.rbNext.rbPrevious = node.rbPrevious;
    if (node.rbPrevious) node.rbPrevious.rbNext = node.rbNext;
    node.rbNext = node.rbPrevious = null;

    var parent = node.rbParent,
        sibling,
        left = node.rbLeft,
        right = node.rbRight,
        next,
        isRed;

    if (!left) next = right;
    else if (!right) next = left;
    else next = this.rbFirst(right);

    if (parent) {
      if (parent.rbLeft === node) parent.rbLeft = next;
      else parent.rbRight = next;
    } else {
      this.root = next;
    }

    if (left && right) {
      isRed = next.rbRed;
      next.rbRed = node.rbRed;
      next.rbLeft = left;
      left.rbParent = next;
      if (next !== right) {
        parent = next.rbParent;
        next.rbParent = node.rbParent;
        node = next.rbRight;
        parent.rbLeft = node;
        next.rbRight = right;
        right.rbParent = next;
      } else {
        next.rbParent = parent;
        parent = next;
        node = next.rbRight;
      }
    } else {
      isRed = node.rbRed;
      node = next;
    }

    if (node) node.rbParent = parent;
    if (isRed) return;
    if (node && node.rbRed) { node.rbRed = false; return; }

    do {
      if (node === this.root) break;
      if (node === parent.rbLeft) {
        sibling = parent.rbRight;
        if (sibling.rbRed) {
          sibling.rbRed = false;
          parent.rbRed = true;
          this.rbRotateLeft(parent);
          sibling = parent.rbRight;
        }
        if ((sibling.rbLeft && sibling.rbLeft.rbRed)
            || (sibling.rbRight && sibling.rbRight.rbRed)) {
          if (!sibling.rbRight || !sibling.rbRight.rbRed) {
            sibling.rbLeft.rbRed = false;
            sibling.rbRed = true;
            this.rbRotateRight(sibling);
            sibling = parent.rbRight;
          }
          sibling.rbRed = parent.rbRed;
          parent.rbRed = sibling.rbRight.rbRed = false;
          this.rbRotateLeft(parent);
          node = this.root;
          break;
        }
      } else {
        sibling = parent.rbLeft;
        if (sibling.rbRed) {
          sibling.rbRed = false;
          parent.rbRed = true;
          this.rbRotateRight(parent);
          sibling = parent.rbLeft;
        }
        if ((sibling.rbLeft && sibling.rbLeft.rbRed)
          || (sibling.rbRight && sibling.rbRight.rbRed)) {
          if (!sibling.rbLeft || !sibling.rbLeft.rbRed) {
            sibling.rbRight.rbRed = false;
            sibling.rbRed = true;
            this.rbRotateLeft(sibling);
            sibling = parent.rbLeft;
          }
          sibling.rbRed = parent.rbRed;
          parent.rbRed = sibling.rbLeft.rbRed = false;
          this.rbRotateRight(parent);
          node = this.root;
          break;
        }
      }
      sibling.rbRed = true;
      node = parent;
      parent = parent.rbParent;
    } while (!node.rbRed);
    if (node) node.rbRed = false;
  },

  rbRotateLeft: function(node) {
    var p = node,
        q = node.rbRight,
        parent = p.rbParent;

    if (parent) {
      if (parent.rbLeft === p) parent.rbLeft = q;
      else parent.rbRight = q;
    } else {
      this.root = q;
    }

    q.rbParent = parent;
    p.rbParent = q;
    p.rbRight = q.rbLeft;
    if (p.rbRight) p.rbRight.rbParent = p;
    q.rbLeft = p;
  },

  rbRotateRight: function(node) {
    var p = node,
        q = node.rbLeft,
        parent = p.rbParent;

    if (parent) {
      if (parent.rbLeft === p) parent.rbLeft = q;
      else parent.rbRight = q;
    } else {
      this.root = q;
    }

    q.rbParent = parent;
    p.rbParent = q;
    p.rbLeft = q.rbRight;
    if (p.rbLeft) p.rbLeft.rbParent = p;
    q.rbRight = p;
  },

  rbFirst: function(node) {
    while (node.rbLeft) node = node.rbLeft;
    return node;
  }
};
