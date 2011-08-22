d3_transitionPrototype.duration = function(value) {
  var groups = this;
  return groups.each(typeof value === "function"
      ? function(d, i, j) { groups[j][i].duration = +value.apply(this, arguments); }
      : (value = +value, function(d, i, j) { groups[j][i].duration = value; }));
};
