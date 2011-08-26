var d3_selectionRoot = d3_selection([[document]]);

d3_selectionRoot[0].parentNode = document.documentElement;

// TODO fast singleton implementation!
d3.select = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.select(selector)
      : d3_selection([[selector]]); // assume node
};

d3.selectAll = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.selectAll(selector)
      : d3_selection([selector]); // assume node[]
};
