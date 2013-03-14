var smash = require("smash");

module.exports = function() {
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; });
  files.unshift("src/start");
  files.push("src/end");
  return function() {
    smash.load(files, "d3", this.callback);
  };
};
