var smash = require("smash");

module.exports = function() {
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; }),
      expression = "d3",
      sandbox = null;

  files.unshift("src/start");
  files.push("src/end");

  function topic() {
    smash.load(files, expression, sandbox, this.callback);
  }

  topic.expression = function(_) {
    expression = _;
    return topic;
  };

  topic.sandbox = function(_) {
    sandbox = _;
    return topic;
  };

  return topic;
};
