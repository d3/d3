// TODO data(null) for clearing data?
d3_selectionPrototype.data = function(data, join) {
  var enter = [],
      update = [],
      exit = [];

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        n1 = Math.max(n, m),
        updateNodes = [],
        enterNodes = [],
        exitNodes = [],
        node,
        nodeData;

    if (join) {
      var nodeByKey = {},
          keys = [],
          key,
          j = groupData.length;

      for (i = -1; ++i < n;) {
        key = join.call(node = group[i], node.__data__, i);
        if (key in nodeByKey) {
          exitNodes[j++] = node; // duplicate key
        } else {
          nodeByKey[key] = node;
        }
        keys.push(key);
      }

      for (i = -1; ++i < m;) {
        node = nodeByKey[key = join.call(groupData, nodeData = groupData[i], i)];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
        delete nodeByKey[key];
      }

      for (i = -1; ++i < n;) {
        if (keys[i] in nodeByKey) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = d3_selection_dataNode(groupData[i]);
        updateNodes[i] = exitNodes[i] = null;
      }
      for (; i < n1; ++i) {
        exitNodes[i] = group[i];
        enterNodes[i] = updateNodes[i] = null;
      }
    }

    enterNodes.update
        = updateNodes;

    enterNodes.parentNode
        = updateNodes.parentNode
        = exitNodes.parentNode
        = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var i = -1,
      n = this.length,
      group;
  if (typeof data === "function") {
    while (++i < n) {
      bind(group = this[i], data.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], data);
    }
  }

  var selection = d3_selection(update);
  selection.enter = function() { return d3_selection_enter(enter); };
  selection.exit = function() { return d3_selection(exit); };
  return selection;
};

function d3_selection_dataNode(data) {
  return {__data__: data};
}
