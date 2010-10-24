d3.selectAll = function(query) {
  return typeof query == "string"
      ? d3_root.selectAll(query)
      : d3_selection([d3_array(query)]); // assume node[]
};
