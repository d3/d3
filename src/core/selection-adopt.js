d3_selectionPrototype.adopt = function(selection) {
  return this.select(function(d, i, j) {
    return (d = selection[i]) && (d = d[j]) && this.appendChild(d);
  });
};
