d3.unique = function (array) {
    // TODO is it kosher to refer to d3.scale in the core library?
    return d3.scale.ordinal().domain(array).domain();
};
