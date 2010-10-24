d3.select = function(query) {
  return typeof query == "string"
      ? d3_root.select(query)
      : d3_selection([[query]]); // assume node
};
