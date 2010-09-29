function d3_transform_data(nodes, pass) {
  var data = this.value,
      m = nodes.length,
      n, // data length
      key = this.key,
      kn, // key name
      kv, // key value
      k, // current key
      i, // current index
      j, // current index
      d, // current datum
      o, // current node
      enterNodes = [],
      updateNodes = [],
      exitNodes = [],
      nodesByKey, // map key -> node
      dataByKey, // map key -> data
      indexesByKey; // map key -> index

  if (typeof data == "function") {
    d = d3_transform_stack.shift();
    data = data.apply(null, d3_transform_stack);
    d3_transform_stack.unshift(d);
  }

  n = data.length;

  if (key) {
    kn = key.name;
    kv = key.value;
    nodesByKey = {};
    dataByKey = {};
    indexesByKey = {};

    // compute map from key -> node
    if (kn.local) {
      for (i = 0; i < m; ++i) {
        o = nodes[i].node;
        if (o) {
          k = o.getAttributeNS(kn.space, kn.local);
          if (k != null) nodesByKey[k] = o;
        }
      }
    } else {
      for (i = 0; i < m; ++i) {
        o = nodes[i].node;
        if (o) {
          k = o.getAttribute(kn);
          if (k != null) nodesByKey[k] = o;
        }
      }
    }

    // compute map from key -> data
    for (i = 0; i < n; ++i) {
      d3_transform_stack[0] = d = data[i];
      k = kv.apply(null, d3_transform_stack);
      if (k != null) {
        dataByKey[k] = d;
        indexesByKey[k] = i;
      }
    }

    // compute entering and updating nodes
    for (k in dataByKey) {
      d = dataByKey[k];
      i = indexesByKey[k];
      if (o = nodesByKey[k]) {
        updateNodes.push({
          node: o,
          data: d,
          key: k,
          index: i
        });
      } else {
        enterNodes.push({
          node: nodes.parent.node,
          data: d,
          key: k,
          index: i
        });
      }
    }

    // compute exiting nodes
    for (k in nodesByKey) {
      if (!(k in dataByKey)) {
        exitNodes.push({node: nodesByKey[k]});
      }
    }
  } else {
    k = n < m ? n : m;

    // compute updating nodes
    for (i = 0; i < k; ++i) {
      (o = nodes[i]).data = data[i];
      if (o.node) {
        updateNodes.push(o);
      } else {
        o.node = o.parent.node;
        enterNodes.push(o);
      }
    }

    // compute entering nodes
    for (j = i; j < n; ++j) {
      enterNodes.push({
        node: nodes.parent.node,
        data: data[j],
        index: j
      });
    }

    // compute exiting nodes
    for (j = i; j < m; ++j) {
      exitNodes.push(nodes[j]);
    }
  }

  pass(this.enterActions, enterNodes);
  pass(this.actions, updateNodes);
  pass(this.exitActions, exitNodes);
}

function d3_transform_data_bind(nodes, pass) {
  var m = nodes.length,
      n = this.name,
      v = this.bound || (this.bound = this.value),
      d, // bound data
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (v && v.bind) {
    d = [];
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      o.value = o.data;
      o.data_ = v.bind.apply(o, d3_transform_stack);
      delete o.value;
    }
    this.value = function() {
      d3_transform_stack.unshift(null);
      for (i = 0; i < m; ++i) {
        d3_transform_stack[0] = (o = nodes[i]).data;
        d[i] = o.data_.apply(o, d3_transform_stack);
      }
      d3_transform_stack.shift();
      return d;
    };
  } else {
    d3_transform_data.call(this, nodes, pass);
  }
}
