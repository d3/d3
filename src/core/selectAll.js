d3.selectAll = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.selectAll(selector)
      : d3_selection([selector]); // assume node[]
};
