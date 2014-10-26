d3.keys = function(map) {
  return Object.keys(map).concat(Object.keys(map.__proto__));
};
