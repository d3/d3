d3.pluck = function(items, key, byDefault) {
  return items.map(function(item){ return (key in item) ? item[key] : byDefault; });
};
