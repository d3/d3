import "../arrays/range";
import "../math/trigonometry";
import "layout";

d3.layout.translocation = function() {
  var translocation = {},
  groups,
  groupsEarly,
  groupCount,
  edges,
  edgesEarly,
  edgeCount,
  padding = 0;

  function relayout() {
    groups = [];
    edges = [];

    //Compute the total of the group sizes:
    var k = 0;
    for(var i = 0; i < groupCount; i++) {
      k += groupsEarly[i];
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (τ - padding * groupCount) / k;

    //Compute the array of group objects:
    for(var groupStartRad = 0, i = 0; i < groupCount; i++){
      var groupEndRad = groupStartRad + groupsEarly[i] * k; //Add radial length of group
      groups[i] = {
        index: i,
        startAngle: groupStartRad,
        endAngle: groupEndRad,
        value: groupsEarly[i]
      }
      groupStartRad = groupEndRad + padding;
    }

    //Compute array of edges:
    for(var i = 0; i < edgeCount; i++) {
      var sourceGrp = groups[edgesEarly[i][0]];
      var targetGrp = groups[edgesEarly[i][2]];
      var attributes = edgesEarly[i].length > 6 ? edgesEarly[i][6] : {};

      edges[i] = {
        source: {
          endAngle: sourceGrp.startAngle + (edgesEarly[i][4] + edgesEarly[i][1]) * k,
          index: edgesEarly[i][0],
          startAngle: sourceGrp.startAngle + edgesEarly[i][1] * k,
          value: edgesEarly[i][1],
          width: edgesEarly[i][4]
        },
        target: {
          endAngle: targetGrp.startAngle + (edgesEarly[i][5] + edgesEarly[i][3]) * k,
          index: edgesEarly[i][2],
          startAngle: targetGrp.startAngle + edgesEarly[i][3] * k,
          value: edgesEarly[i][3],
          width: edgesEarly[i][5]
        },
        attributes : attributes
      }
    }
  }

  //Expects an array of sizes, where the index is group ID
  translocation.groups = function(x) {
    if(!x) {
      if (!groups) {
        relayout();
      }
      return groups;
    }
    groups = null;
    groupsEarly = x;
    groupCount = x.length;
    return translocation;
  }

  //Expects array of edge objects [[StartGrp, Location, EndGrp, Location, startThickness, endThickness, attrsObj]]
  translocation.edges = function(x) {
    if(!x) {
      if (!edges) {
        relayout();
      }
      return edges;
    }
    edges = null;
    edgesEarly = x;
    edgeCount = x.length;
    return translocation;
  }

  //Sets padding between each group
  translocation.padding = function(x) {
    if (!x) {
      return padding;
    }
    padding = x;
    edges = groups = null;
    return translocation;
  };

  return translocation;
};
