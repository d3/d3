require("./d3");
module.exports = d3;

// unset global variable
(function () { delete this.d3; })();
