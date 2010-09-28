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
          node: nodes.parentNode,
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
        o.node = o.parentNode;
        enterNodes.push(o);
      }
    }

    // compute entering nodes
    for (j = i; j < n; ++j) {
      enterNodes.push({
        node: nodes.parentNode,
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

function d3_transform_data_tween(nodes) {
  var m = nodes.length,
      i, // current index
      o; // current node
  for (i = 0; i < m; ++i) {
    (o = nodes[i]).data = o.tween.data();
  }
}

function d3_transform_data_tween_bind(nodes) {
  var m = nodes.length,
      v = this.value,
      T = this.tween,
      i, // current index
      o; // current node
  if (typeof v === "function") {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween.data = T(d3_transform_stack[0] = o.data, v.apply(o, d3_transform_stack));
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween.data = T(o.data, v);
    }
  }
}
